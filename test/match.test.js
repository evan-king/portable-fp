const
    { match } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('match :: RegExp → String → [String | undefined]', function() {
    
    it('returns the list of regular expression matches in a string', function() {
        expect(match('', 'aa3a')).eql(['']);
        expect(match('a', 'aa3a')).eql(['a']);
        expect(match(/a/g, 'aa3a')).eql(['a', 'a', 'a']);
        expect(match('ab', 'aa3a')).eql([]);
    });
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => match('', arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    it('returns empty array on invalid input string', function() {
        [true, false, {}, [], Infinity, NaN, 4]
            .map(a => expect(match(/x/, a)).eql([]));
    });
    
    it('has arity of 2', () => expect(match).lengthOf(2));
    
    it('is curried', testCurrying(match, [/x/, 4], [])); 
    
});
