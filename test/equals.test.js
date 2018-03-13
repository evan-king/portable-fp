const
    { equals } = require('portable-fp'),
    { testCurrying, varietyList, varietyListCopy } = require('./util'),
    { expect } = require('chai');

describe('equals', function() {
    
    it('matches primitives and simple types by exact value', function() {
        for(const k1 in varietyList.keys()) {
            for(const k2 in varietyListCopy.keys()) {
                expect(equals(varietyList[k1], varietyListCopy[k2])).eql(k1 === k2);
            }
        }
    });
    
    describe('diverging from Ramda behavior', function() {
        
        // Way beyond the scope of this package - use Ramda
        it.skip('matches arrays and objects by matching type and contents');
        
        it('matches non-primitives only by reference', function() {
            const arr = [], obj = {}, fn = x => x;
            expect(equals(fn, fn)).true;
            expect(equals(arr, arr)).true;
            expect(equals(obj, obj)).true;
            expect(equals(arr, obj)).false;
            expect(equals(arr, fn)).false;
            expect(equals(obj, fn)).false;
        });
        
    });
    
    it('has arity of 2', () => expect(equals).lengthOf(2));
    
    it('is curried', testCurrying(equals, [5, 5], true));
    
});
