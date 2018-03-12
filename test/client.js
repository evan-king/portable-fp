
const
    orig = "require('portable-fp')",
    dest = "portableFP",
    through = require('through2');

module.exports = function (file) {
    return through(function (buf, enc, next) {
        this.push(buf.toString('utf8').replace(orig, dest));
        next();
    });
};
