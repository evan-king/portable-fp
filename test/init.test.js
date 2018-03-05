const
    { init } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('init :: [a] → [a]', function() {
    
    it('returns all but the last element of a list', function() {
        const arg = [432, undefined, null, 2.5, 'blah', 0, -5];
        expect(init([])).eql([]);
        expect(init(['a'])).eql([]);
        expect(init(['a', 'b'])).eql(['a']);
        expect(init(arg)).eql(arg.slice(0, -1));
    });
    
    it('returns all but the last character of a string', function() {
        const arg = 'blah blah';
        expect(init('')).eql('');
        expect(init('a')).eql('');
        expect(init('ab')).eql('a');
        expect(init(arg)).eql(arg.slice(0, -1));
    });
    
    it('returns all but the last value of an arguments object', function() {
        function fn() {return arguments};
        expect(init(fn([]))).eql([]);
        expect(init(fn([1, 2, 3]))).eql([1, 2]);
    });
    
    // Ramda returns an empty array for all invalid input other than null and undefined
    it.skip('normalizes input');
    
    it('has arity of 1', () => expect(init).lengthOf(1));
    
    it('is curried', testCurrying(init, ['blah'], 'bla'));
    
});
