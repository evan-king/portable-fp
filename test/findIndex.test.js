const
    { findIndex, equals } = require('portable-fp'),
    { testCurrying, varietyList, varietyObj } = require('./util'),
    { expect } = require('chai');

describe('findIndex :: (a → Boolean) → [a] → Number', function() {
    
    it('finds index of first value in array satisftying match function', function() {
        const arr = [1, 0.5, 6, -3, 4];
        expect(findIndex(x => x == 1, arr)).eql(0);
        expect(findIndex(x => x > 1, arr)).eql(2);
        for(const k of varietyList.keys()) {
            expect(findIndex(equals(varietyList[k]), varietyList)).eql(k);
        }
    });
    
    it('returns -1 if no matching value found in array', function() {
        expect(findIndex(x => x > 10, [1, 2, 3])).eql(-1);
    });
    
    describe('diverging from Ramda behavior', function() {
        const obj = {a: 1, b: 0.5, c: 6, d: -3, e: 4};
        
        it('finds key of first value in object satisftying match function', function() {
            expect(findIndex(x => x > 1, obj)).eql('c');
            for(const k of Object.keys(varietyObj)) {
                expect(findIndex(equals(varietyObj[k]), varietyObj)).eql(k);
            }
        });
        
        it('returns null if no matching value found in object', function() {
            expect(findIndex(x => x > 10, obj)).eql(null);
        });
        
        it('handles invalid input (returning null)', function() {
            const inputs = [null, undefined, false, true, 5, String, /x/, x => x];
            for(const v of inputs) expect(findIndex(x => true, v)).eql(null);
        });
        
    });
    
    it('has arity of 2', () => expect(findIndex).lengthOf(2));
    
    it('is curried', testCurrying(findIndex, [x => x > 3,[2, 4, 6]], 1));
    
});
