const
    R = require('portable-fp'),
    { testCurrying, sparseList, packedList, varietyList, varietyListCopy, varietyObj, varietyObjCopy } = require('./util'),
    { expect } = require('chai');



describe('API', function() {
    
    it('names all functions to match their API names', function() {
        Object.keys(R).map(key => expect(R[key].name).eql(key));
    });
    
    it('is immutable', function() {
        const mutate = (obj, name) => {
            // strict mode throws TypeError, else silently ignored
            expect(obj._blah, name).eql(undefined);
            try {
                obj._blah = 5;
            } catch(ex) {
                expect(ex, name).instanceOf(TypeError);
            }
            expect(obj._blah, name).eql(undefined);
        }
        
        mutate(R, 'API');
        R.mapObjIndexed(mutate, R);
    });
    
});

describe('dist', function() {
    
});

const args = [null, undefined, false, true, '', 'a', '0xFF', 5, String, /x/, x => x, [], {}];

with(R) {

// defaultTo
// head
// is
// last
// match
// pick
// prop
// range
// reverse
// tail




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

describe('findIndex :: (a → Boolean) → [a] → Number', function() {
    
    it('finds index of first value in array satisftying match function', function() {
        const arr = [1, 0.5, 6, -3, 4];
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


    
}
