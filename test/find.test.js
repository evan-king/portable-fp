const
    { find, equals } = require('portable-fp'),
    { testCurrying, varietyList, varietyObj } = require('./util'),
    { expect } = require('chai');

describe('find :: (a → Boolean) → [a] → a | undefined', function() {
    
    it('finds first value in array satisftying match function', function() {
        const arr = [1, 0.5, 6, -3, 4];
        expect(find(x => x > 1, arr)).eql(6);
        for(const k of varietyList.keys()) {
            expect(find(equals(varietyList[k]), varietyList)).eql(varietyList[k]);
        }
    });
    
    describe('diverging from Ramda behavior', function() {
        
        it('finds first value in object satisftying match function', function() {
            const obj = {a: 1, b: 0.5, c: 6, d: -3, e: 4};
            expect(find(x => x > 1, obj)).eql(6);
            for(const k of Object.keys(varietyObj)) {
                expect(find(equals(varietyObj[k]), varietyObj)).eql(varietyObj[k]);
            }
        });
        
        it('returns undefined if no matching value found', function() {
            expect(find(x => x > 10, [1, 2, 3])).eql(undefined);
        });
        
    });
    
    it('returns undefined if no matching value found', function() {
        expect(find(x => x > 10, [1, 2, 3])).eql(undefined);
    });
    
    it('handles invalid input', function() {
        const inputs = [null, undefined, false, true, 5, String, /x/, x => x];
        for(const v of inputs) expect(find(x => true, v)).eql(undefined);
    });
    
    it('has arity of 2', () => expect(find).lengthOf(2));
    
    it('is curried', testCurrying(find, [x => x > 3,[2, 4, 6]], 4));
    
});
