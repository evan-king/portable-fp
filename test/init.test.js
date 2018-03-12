const
    { init } = require('portable-fp'),
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
        expect(init(fn())).eql([]);
        expect(init(fn(1))).eql([]);
        expect(init(fn(1, 2))).eql([1]);
        expect(init(fn(1, 2, 3))).eql([1, 2]);
    });
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => init(arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    // Known divergence from Ramda behavior (these tests would fail):
    //  - expect(init(String)).eql('');
    
    it('returns empty array on (some) invalid defined input', function() {
        const args = [true, false, {}, init, x => x, /x/];
        args.map(arg => expect(init(arg)).an('array').eql([]));
    });
    
    it('has arity of 1', () => expect(init).lengthOf(1));
    
    it('is curried', testCurrying(init, ['blah'], 'bla'));
    
});
