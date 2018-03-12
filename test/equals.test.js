const
    { equals } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('equals', function() {
    
    it('matches primitives and simple types by exact value', function() {
        expect(equals(1, 1)).true;
        expect(equals(new Date(2018), new Date(2018))).true;
        expect(equals('blah', 'blah')).true;
        expect(equals(0, 0)).true;
        expect(equals(null, null)).true;
        expect(equals(undefined, undefined)).true;
        expect(equals(String, String)).true;
        expect(equals(NaN, NaN)).true;
        
        expect(equals(undefined, null)).false;
        expect(equals(NaN, null)).false;
        expect(equals(1, '1')).false;
        expect(equals(0, null)).false;
        expect(equals(new Date(2017), new Date(2018))).false;
    });
    
    it('matches non-primitives by reference', function() {
        const arr = [], obj = {}, fn = x => x;
        expect(equals(fn, fn)).true;
        expect(equals(arr, arr)).true;
        expect(equals(obj, obj)).true;
        expect(equals(arr, obj)).false;
        expect(equals(arr, fn)).false;
        expect(equals(obj, fn)).false;
    });
    
    // Way beyond the scope of this package - use Ramda
    it.skip('matches arrays and objects by matching type and contents');
    
    it('has arity of 2', () => expect(equals).lengthOf(2));
    
    it('is curried', testCurrying(equals, [5, 5], true));
    
});
