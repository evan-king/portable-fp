const
    { sum } = require('portable-fp'),
    { sparseList, packedList } = require('./util'),
    { expect } = require('chai');

describe('sum :: [Number] → Number', function() {
    
    it('adds numbers in an array', function() {
        expect(sum([1, 2, 3])).eql(6);
    });
    
    it('handles inputs castable to number', function() {
        expect(sum([2, true])).eql(3);
        expect(sum([2, false])).eql(2);
        expect(sum([2, null])).eql(2);
        expect(sum([2, ''])).eql(2);
        expect(sum([2, []])).eql(2);
    });
    
    it('returns NaN for any other input', function() {
        const args = [{}, sum, x => x, /x/, String, undefined];
        args.map(arg => expect(sum([2, arg])).eql(NaN));
    });
    
    describe('diverging from Ramda behavior', function() {
        
        it('adds numbers in an object', function() {
            expect(sum({a: 1, b: 2, c: 3})).eql(6);
        });
        
        it('handles sparse arrays', function() {
            expect(sum(sparseList)).eql(sum(packedList));
        });
        
    });
    
    it('has arity of 1', () => expect(sum).lengthOf(1));
    
});
