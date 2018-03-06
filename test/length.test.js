const
    { length } = require('../lib/portable-fp'),
    { testCurrying, sparseList, packedList } = require('./util'),
    { expect } = require('chai');

describe('length :: [a] → Number', function() {
    
    it('returns the length of a list', function() {
        expect(length([])).eql(0);
        expect(length([1, 0, 5])).eql(3);
    });
    
    it('returns the length of a string', function() {
        expect(length('')).eql(0);
        expect(length('blah')).eql(4);
    });
    
    it('returns the length of an arguments object', function() {
        function args() { return arguments; }
        expect(length(args())).eql(0);
        expect(length(args(1, 0, 5))).eql(3);
    });
    
    it('returns the length of a function', function() {
        expect(length(() => null)).eql(0);
        expect(length((a, b, c) => null)).eql(3);
    });
    
    it('returns NaN on invalid input', function() {
        const args = [true, false, {}, /x/, null, undefined, 4, {length: '1'}];
        args.map(arg => expect(length(arg)).eql(NaN));
    });
    
    it('has arity of 1', () => expect(length).lengthOf(1));
    
});
