const
    { add } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('add :: Number → Number → Number', function() {
    
    it('adds two numbers', function() {
        expect(add(1, 2)).eql(3);
        expect(add(1.5, '-2')).eql(-0.5);
        expect(add(2, '0xFF')).eql(257);
    });
    
    it('treats true as 1', function() {
        expect(add(2, true)).eql(3);
    });
    
    it('treats null, false, and empty string as 0', function() {
        expect(add(null, 2)).eql(2); 
        expect(add(2, null)).eql(2); 
        expect(add(2, false)).eql(2);
        expect(add(2, '')).eql(2);
    });
    
    it('retuns NaN for all other inputs', function() {
        expect(add(2, NaN)).eql(NaN); 
        expect(add(NaN, 2)).eql(NaN); 
        expect(add(2, 'a')).eql(NaN); 
        expect(add(2, {})).eql(NaN); 
        expect(add(2, String)).eql(NaN); 
        expect(add(2, x => x)).eql(NaN); 
        expect(add(2, undefined)).eql(NaN); 
    });
    
    it('has arity of 2', () => expect(add).lengthOf(2));
    
    it('is curried', testCurrying(add, [5, 5], 10));
    
});
