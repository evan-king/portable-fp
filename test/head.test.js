const
    { head } = require('portable-fp'),
    { sparseList } = require('./util'),
    { expect } = require('chai');

describe('head :: [a] → a', function() {
    
    it('returns the first element in a list', function() {
        expect(head([])).eql(undefined);
        expect(head(['a'])).eql('a');
        expect(head(sparseList)).eql(sparseList[0]);
    });
    
    it('returns the first character of a string', function() {
        expect(head('')).eql('');
        expect(head('a')).eql('a');
        expect(head('ab')).eql('a');
    });
    
    it('returns the first value of an arguments object', function() {
        function fn() {return arguments};
        expect(head(fn())).eql(undefined);
        expect(head(fn(1))).eql(1);
        expect(head(fn(1, 2))).eql(1);
    });
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => head(arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    it('returns empty array on invalid defined input', function() {
        const args = [true, false, {}, head, x => x, /x/, String];
        args.map(arg => expect(head(arg)).eql(undefined));
    });
    
    it('has arity of 1', () => expect(head).lengthOf(1));
    
});
