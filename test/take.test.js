const
    { take } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('take :: Number → [a] → [a]', function() {
    
    it('returns the first n elements of a list', function() {
        const arg = [432, undefined, null, 2.5, 'blah', 0, -5];
        expect(take(5, [])).eql([]);
        expect(take(0, arg)).eql([]);
        expect(take(3, arg)).eql(arg.slice(0, 3));
        expect(take(arg.length, arg)).eql(arg);
        expect(take(arg.length+1, arg)).eql(arg);
    });
    
    it('returns the first n characters of a string', function() {
        const arg = 'blah blah';
        expect(take(5, '')).eql('');
        expect(take(0, arg)).eql('');
        expect(take(3, arg)).eql(arg.slice(0, 3));
        expect(take(arg.length, arg)).eql(arg);
        expect(take(arg.length+1, arg)).eql(arg);
    });
    
    it('returns the first n values in an arguments object', function() {
        function fn() {return arguments};
        const arg = [1, 2, 3], out = fn.apply(null, arg);
        expect(take(0, out)).eql([]);
        expect(take(2, out)).eql([1, 2]);
        expect(take(-1, out)).eql([1, 2]);
        expect(take(Infinity, out)).eql(arg);
    });
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => take(3, arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    // Known divergence from Ramda behavior (these tests would fail):
    //  - expect(slice(0, Infinity, String)).eql('');
    //  - expect(slice(0, Infinity, slice)).eql([]);
    //  - expect(slice(0, Infinity, x => x)).eql([]);
    
    it('returns empty array on (some) invalid defined input', function() {
        const
            run = take(2),
            args = [true, false, {}, /x/];
        
        args.map(arg => expect(run(arg)).an('array').eql([]));
    });
    
    it('has arity of 2', () => expect(take).lengthOf(2));
    
    it('is curried', testCurrying(take, [1, 'ab'], 'a'));
    
});
