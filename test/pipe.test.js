const
    { pipe, slice } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('pipe :: (((a, b, …, n) → o), (o → p), …, (x → y), (y → z)) → ((a, b, …, n) → z)', function() {
    
    const fn = pipe(
        (a, b=0, c=0) => a+b+c,
        x => x*2,
        x => x+1
    );
    
    it('composes functions', function() {
        expect(fn).a('function');
        expect(fn(2)).eql(5);
    });
    
    it('passes all arguments to first function', function() {
        expect(fn(1, 2, 3)).eql(13);
    });
    
    it('does not curry the composition', function() {
        const mfn = pipe(function(a, b, c=3) {
            return slice(0, Infinity, arguments);
        });
        expect(mfn(1)).eql([1]);
        expect(mfn(1, 2)).eql([1, 2]);
    });
    
});
