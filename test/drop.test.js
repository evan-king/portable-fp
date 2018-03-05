const
    { drop } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('drop :: [a] → [a]', function() {
    
    it('returns all but the first n elements of a list', function() {
        const arg = [432, undefined, null, 2.5, 'blah', 0, -5];
        expect(drop(5, [])).eql([]);
        expect(drop(0, arg)).eql(arg);
        expect(drop(4, arg)).eql(arg.slice(4));
    });
    
    it('returns all but the first n characters of a string', function() {
        const arg = 'blah blah';
        expect(drop(5, '')).eql('');
        expect(drop(0, arg)).eql(arg);
        expect(drop(5, arg)).eql('blah');
    });
    
    it('returns all but the first n values in an arguments object', function() {
        function fn() {return arguments};
        const arg = [1, 2, 3], out = fn.apply(null, arg);
        expect(drop(3, out)).eql([]);
        expect(drop(2, out)).eql([3]);
        expect(drop(-1, out)).eql([3]);
        expect(drop(0, out)).eql(arg);
        expect(drop(Infinity, out)).eql([]);
    });
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => drop(3, arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    // Known divergence from Ramda behavior (these tests would fail):
    //  - expect(slice(0, Infinity, String)).eql('');
    
    it('returns empty array on (some) invalid defined input', function() {
        const
            run = drop(2),
            args = [true, false, {}, drop, x => x, /x/];
        
        args.map(arg => expect(run(arg)).an('array').eql([]));
    });
    
    it('has arity of 2', () => expect(drop).lengthOf(2));
    
    it('is curried', testCurrying(drop, [1, 'blah'], 'lah'));
    
});
