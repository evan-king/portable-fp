const
    { last } = require('portable-fp'),
    { sparseList } = require('./util'),
    { expect } = require('chai');

describe('last :: [a] → a', function() {
    
    it('returns the last element in a list', function() {
        expect(last([])).eql(undefined);
        expect(last(['a'])).eql('a');
        expect(last(sparseList)).eql(sparseList[sparseList.length-1]);
    });
    
    it('returns the last character of a string', function() {
        expect(last('')).eql('');
        expect(last('a')).eql('a');
        expect(last('ab')).eql('b');
    });
    
    it('returns the last value of an arguments object', function() {
        function fn() {return arguments};
        expect(last(fn())).eql(undefined);
        expect(last(fn(1))).eql(1);
        expect(last(fn(1, 2))).eql(2);
        expect(last(fn(1, 2, undefined))).eql(undefined);
    });
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => last(arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    it('returns empty array on invalid defined input', function() {
        const args = [true, false, {}, last, x => x, /x/, String];
        args.map(arg => expect(last(arg)).eql(undefined));
    });
    
    it('has arity of 1', () => expect(last).lengthOf(1));
    
});
