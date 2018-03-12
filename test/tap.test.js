const
    { tap } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('tap :: (a → *) → a → a', function() {
    
    const inspect = arg => (inspect.arg = arg, 'hello');
    
    it('is curried', function() {
        expect(tap(inspect)).a('function');
        expect(tap(inspect)(1)).eql(1);
    });
    
    it('passes argument to supplied function', function() {
        expect(inspect.arg).not.eql(5);
        tap(inspect, 5);
        expect(inspect.arg).eql(5);
    });
    
    it('returns original argument, ignoring function return', function() {
        expect(tap(inspect, 7)).eql(7);
    });
    
    it('has arity of 2', () => expect(tap).lengthOf(2));
    
    it('is curried', testCurrying(tap, [inspect, 1], 1));
    
});