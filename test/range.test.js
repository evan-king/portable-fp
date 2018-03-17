const
    { range } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('range :: Number → Number → [Number]', function() {
    
    it('returns the list of all integers arg1 <= i < arg2', function() {
        expect(range(0, 0)).eql([]);
        expect(range(5, 5)).eql([]);
        expect(range(-2, 3)).eql([-2, -1, 0, 1, 2]);
        expect(range(100, 105)).eql([100, 101, 102, 103, 104]);
        expect(range(9, 3)).eql([]);
    });
    
    it('has arity of 2', () => expect(range).lengthOf(2));
    
    it('is curried', testCurrying(range, [1, 4], [1, 2, 3])); 
    
});
