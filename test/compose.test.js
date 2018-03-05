const
    { compose, slice } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('compose :: ((y → z), (x → y), …, (o → p), ((a, b, …, n) → o)) → ((a, b, …, n) → z)', function() {
    
    const fn = compose(
        x => x+1,
        x => x*2,
        (a, b=0, c=0) => a+b+c
    );
    
    it('composes functions', function() {
        expect(fn).a('function');
        expect(fn(2)).eql(5);
    });
    
    it('passes all arguments to first function', function() {
        expect(fn(1, 2, 3)).eql(13);
    });
    
    it('does not curry the composition', function() {
        const mfn = compose(function(a, b, c=3) {
            return slice(0, Infinity, arguments);
        });
        expect(mfn(1)).eql([1]);
        expect(mfn(1, 2)).eql([1, 2]);
    });
    
});
