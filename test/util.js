
const
    { sum, length, values } = require('portable-fp'),
    expect = require('chai').expect;

// curryPermutations :: [1, 2, 3] -> [[1, 2, 3]], [[1, 2], [3]], [[1], [2], [3]], ... ]
function curryPermutations(args) {
    if(args.length === 1) return [[[args[0]]]];
    
    const
        last = args[args.length-1],
        bases = curryPermutations(args.slice(0, -1)),
        appendNewSet = arr => arr.concat([[last]]),
        extendLastSet = arr => (arr[arr.length-1] = arr[arr.length-1].concat([last]), arr);
    
    return []
        .concat(bases.map(appendNewSet))
        .concat(bases.map(extendLastSet));
    
}

// remainder :: [[a]] -> n
function remainder(argSet) {
    return argSet.map(args => args.length).reduce((a,b) => a+b);
}

// testCurrying :: fn -> [arg] -> * -> testImplementation
function testCurrying(fn, args, result) {
    
    const
        argSets = curryPermutations(args); //.filter(arr => arr.length > 1);
    
    return function() {
        const partials = [];
        
        argSets.map(function(copy) {
            const set = copy.slice();
            let step = fn;
            while(set.length > 1) {
                partials.push(step = step.apply(null, set.shift()));
                expect(step, 'arity matching remaining args').lengthOf(remainder(set));
                // const nextArgs = set.shift();
                // console.log('adding args', nextArgs);
                // step = step.apply(null, nextArgs)
                // console.log('step', step.toString());
                // partials.push(step);
            }
            const lastArgs = set.shift();
            const end = step.apply(null, lastArgs);
            if(typeof result == 'function') return result(end);
            if(result !== undefined) expect(end, 'end result').eql(result);
            else expect(end, 'end result').not.a('function');
            //console.log('executed');
        });
        
        // We should have accumulated a partial every time we stepped through currying without completing
        expect(partials).lengthOf(sum(argSets.map(length)) - argSets.length);
        partials.map(fn => expect(fn).a('function'));
        //console.log('done');
    }
}

describe.skip('[curry test generator]', function() {
    it('generates sets of args to pass', function() {
        expect(curryPermutations([1, 2, 3])).eql([
            [[1], [2], [3]],
            [[1, 2], [3]],
            [[1], [2, 3]],
            [[1, 2, 3]]
        ]);
    });
    
    it('runs every arg set', function() {
        const
            argNames = ['a', 'b', 'c'],
            partialRuns = [],
            finishRuns = [];
        const curryMock = (prior = {idx: 0, a: 0, b: 0, c: 0}) => function(a, b, c) {
            prior.idx++;
            
            if(a && !prior.a) prior.a = prior.idx;
            if(b && !prior.b) prior.b = prior.idx;
            if(c && !prior.c) prior.c = prior.idx;
            
            const set = [];
            for(i = 1; i <= prior.idx; i++) {
                set.push(argNames.filter(key => prior[key] == i).join(''));
            }
            const target = c ? finishRuns : partialRuns;
            target.push(set);
            
            if(!b) return curryMock(prior).bind(null, a);
            if(!c) return curryMock(prior).bind(null, a, b);
            
            return a + b + c;
        }
        
        testCurrying(curryMock(), [1, 2, 3], 6)();
    });
    
});

function sparse() {
    const arr = [1, undefined, 3];
    arr[5] = 5;
    arr[9] = 9;
    return arr;
}

function pack(list) {
    return [1, undefined, 3, 5, 9];
}

// The set of inputs both distinct amongst themselves and matcheable by equals,
// for use by tests of equals and other functions expected to follow its spec.
const variety = {
    a: null,
    b: 0,
    c: 1,
    d: '1',
    e: undefined,
    f: String,
    g: NaN,
    h: new Date(2017, 1, 1),
    i: new Date(2018, 1, 1),
    j: new String(),
    k: new Boolean(true),
    l: new Boolean(false),
    m: new Number(Infinity),
};

// Duplication of variety, replacing objects with primitive equivalents
// where possible (which should still be considered equal)
const dup = {
    a: null,
    b: 0,
    c: 1,
    d: '1',
    e: undefined,
    f: String,
    g: NaN,
    h: (new Date(2017, 1, 1)).valueOf(),
    i: (new Date(2018, 1, 1)).valueOf(),
    j: '',
    k: true,
    l: false,
    m: Infinity,
};


exports.testCurrying = testCurrying;
exports.sparseList = Object.freeze(sparse());
exports.packedList = Object.freeze(pack(exports.sparseList));
exports.varietyObj = Object.freeze(variety);
exports.varietyObjCopy = Object.freeze(dup);
exports.varietyList = Object.freeze(values(variety));
exports.varietyListCopy = Object.freeze(values(dup));
