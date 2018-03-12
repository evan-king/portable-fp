
const
    orig = "require('portable-fp')",
    dest = "portableFP",
    through = require('through2');

// browserify transform that redirects portable-fp lookups to the global variable
module.exports = function (file) {
    return through(function (buf, enc, next) {
        this.push(buf.toString('utf8').replace(orig, dest));
        next();
    });
};
