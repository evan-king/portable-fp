#!/usr/bin/env node

"use strict";

/**
 * Unit test runner
 * Bootstraps unit test environment and
 * runs or watches tests (with live filtering).
 * 
 * @author Evan King
 */

const
    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    cluster = require('cluster'),
    Mocha = require('mocha'),
    Module = require('module'),
    basepath = path.join(__dirname, '../');

const
    hasFlag = flag => process.argv.slice(2).filter(arg => arg == flag).length > 0,
    inject = src => (key, child) => resolvePath(key == 'portable-fp' ? src : key, child),
    resolvePath = Module._resolveFilename,
    applyTests = cb => glob('test/*.test.js', (err, tests) => cb(tests));


// watch all js files, dispatching operation on a forked process
function watchTests() {
    if(cluster.isWorker) {
        return process.once('message', dispatch.bind(null));
    }
    
    let runner = null;
    function readyRunner() {
        runner = cluster.fork();
        runner.on('exit', readyRunner);
    }
    readyRunner();
    
    function run(suites) {
        if(!runner) return; // tests in progress
        runner.send(suites);
        runner = null;
    }
    
    require('chokidar')    
        .watch(['lib', 'test'].map(d => `${basepath+d}/**/*.js`), {ignoreInitial: true})
        .on('all', (evt, file) => applyTests(run));
}

// build and inject the code path being tested
function build() {
    const
        orig = `${basepath}lib/portable-fp.js`,
        dist = `${basepath}dist/portable-fp.min.js`;
    
    if(hasFlag('--build')) {
        const { minify } = require('uglify-es');
        const opts = {
            compress: true,
            mangle: true,
            sourceMap: {filename: dist+'.map'}
        };
        const { code, map } = minify(fs.readFileSync(orig, 'utf8'), opts);
        try { fs.mkdirSync(basepath+'/dist'); } catch(ex) {}
        fs.writeFileSync(dist, code);
        fs.writeFileSync(dist+'.map', map);
        Module._resolveFilename = inject(dist);
    } else {
        Module._resolveFilename = inject(orig);
    }
}

// execute build/test
function dispatch(suites) {
    build();
    
    const mocha = new Mocha();
    mocha.files = suites;
    
    if(hasFlag('--coverage')) {
        const Reporter = require('mocha/lib/reporters/min');
        mocha.reporter(Reporter);
        mocha.useColors(false);
    }
    
    const runner = mocha.run(process.exit);
    process.on('SIGINT', () => (runner.abort(), process.exit(1)));
}

// run
hasFlag('--watch')
    ? watchTests()
    : applyTests(dispatch);
