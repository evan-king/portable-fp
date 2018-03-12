const
    { slice } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('slice :: [a] → [a]', function() {
    
    it('returns a slice of the elements of a list', function() {
        const arg = [432, undefined, null, 2.5, 'blah', 0, -5];
        expect(slice(0, 0, arg)).eql([]);
        expect(slice(5, 5, arg)).eql([]);
        expect(slice(20, 25, arg)).eql([]);
        expect(slice(1, 4, arg)).eql(arg.slice(1, 4));
        expect(slice(1, -1, arg)).eql(arg.slice(1, -1));
        expect(slice(0, Infinity, arg)).eql(arg);
        expect(slice(2, Infinity, arg)).eql(arg.slice(2));
        expect(slice(-2, Infinity, arg)).eql(arg.slice(-2));
    });
    
    it('returns a slice of the characters of a string', function() {
        const arg = 'blah blah';
        expect(slice(0, 0, arg)).eql('');
        expect(slice(5, 5, arg)).eql('');
        expect(slice(20, 25, arg)).eql('');
        expect(slice(0, 4, arg)).eql('blah');
        expect(slice(0, Infinity, arg)).eql(arg);
        expect(slice(2, Infinity, arg)).eql(arg.slice(2));
        expect(slice(-2, Infinity, arg)).eql(arg.slice(-2));
    });
    
    it('returns a slice of an arguments object', function() {
        function fn() {return arguments};
        const arg = [1, 2, 3], out = fn.apply(null, arg);
        expect(slice(0, 0, out)).eql([]);
        expect(slice(0, 2, out)).eql([1, 2]);
        expect(slice(0, -1, out)).eql([1, 2]);
        expect(slice(0, Infinity, out)).eql(arg);
    });
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => slice(0, Infinity, arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    // Known divergence from Ramda behavior (these tests would fail):
    //  - expect(slice(0, Infinity, String)).eql('');
    //  - expect(slice(0, Infinity, slice)).eql([]);
    //  - expect(slice(0, Infinity, x => x)).eql([]);
    
    it('returns empty array on (some) invalid defined input', function() {
        const
            run = slice(0, Infinity),
            args = [true, false, {}, /x/];
        
        args.map(arg => expect(run(arg)).an('array').eql([]));
    });
    
    it('has arity of 3', () => expect(slice).lengthOf(3));
    
    it('is curried', testCurrying(slice, [0, 2, 'blah'], 'bl'));
    
});
