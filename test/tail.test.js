const
    { tail } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('tail :: [a] → [a]', function() {
    
    it('returns all but the first element of a list', function() {
        const arg = [432, undefined, null, 2.5, 'blah', 0, -5];
        expect(tail([])).eql([]);
        expect(tail(['a'])).eql([]);
        expect(tail(['a', 'b'])).eql(['b']);
        expect(tail(arg)).eql(arg.slice(1));
    });
    
    it('returns all but the first character of a string', function() {
        const arg = 'blah blah';
        expect(tail('')).eql('');
        expect(tail('a')).eql('');
        expect(tail('ab')).eql('b');
        expect(tail(arg)).eql(arg.slice(1));
    });
    
    it('returns all but the first value of an arguments object', function() {
        function fn() {return arguments};
        expect(tail(fn())).eql([]);
        expect(tail(fn(1))).eql([]);
        expect(tail(fn(1, 2))).eql([2]);
        expect(tail(fn(1, 2, 3))).eql([2, 3]);
    });
    
    // Known divergence from Ramda behavior (test would fail):
    //  - expect(tail(String)).eql(''); // []
    // Instead, portable-fp is consistent with head and last
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => tail(arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    it('returns empty array on (some) invalid defined input', function() {
        const args = [NaN, true, false, {}, tail, x => x, /x/];
        args.map(arg => expect(tail(arg)).an('array').eql([]));
    });
    
    it('has arity of 1', () => expect(tail).lengthOf(1));
    
});
