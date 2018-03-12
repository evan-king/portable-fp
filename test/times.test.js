const
    { times } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('times :: (Number → a) → Number → [a]', function() {
    const dbl = x => 2 * x, seq = [0, 1, 2, 3, 4];
    
    it('returns result of iterating function over sequence', function() {
        expect(times(x => x, seq.length)).eql(seq);
        expect(times(dbl, seq.length)).eql(seq.map(dbl));
    });
    
    it('has arity of 2', () => expect(times).lengthOf(2));
    
    it('is curried', testCurrying(times, [x => x, seq.length], seq)); 
    
});