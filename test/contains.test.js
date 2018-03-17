const
    { contains } = require('portable-fp'),
    {
        testCurrying,
        sparseList,
        varietyList,
        varietyListCopy,
        varietyObj,
        varietyObjCopy
    } = require('./util'),
    { expect } = require('chai');

describe('contains :: a → [a] → Boolean', function() {
    
    it('identifies whether element is in list', function() {
        expect(contains(1, [1, 2])).true;
        expect(contains(3, [1, 2])).false;
        for(const v of varietyList) {
            expect(contains(v, varietyListCopy)).true;
        }
        expect(contains('something else', varietyList)).false;
    });
    
    it('handles sparse arrays (does not false positive matching undefined', function() {
        const arr = [1, 2, 3]; arr[7] = 10;
        expect(contains(undefined, arr)).false;
    });
    
    it('identifies whether element is in object', function() {
        expect(contains(1, {a: 1, b: 2})).true;
        expect(contains(3, {a: 1, b: 2})).false;
        for(const k in varietyObj) {
            expect(contains(varietyObj[k], varietyObjCopy)).true;
        }
        expect(contains('something else', varietyObj)).false;
    });
    
    it('identifies whether string is in string', function() {
        expect(contains('', '')).true;
        expect(contains('', 'blah')).true;
        expect(contains('blah', 'blah')).true;
        expect(contains('blah', 'oblahvious')).true;
        expect(contains('blah', 'oblivious')).false;
    });
    
    it('handles invalid input', function() {
        const inputs = [null, undefined, false, true, 5, String, /x/, x => x];
        for(const v1 of inputs) for(const v2 of inputs) expect(contains(v1, v2)).false;
    });
    
    it('has arity of 2', () => expect(contains).lengthOf(2));
    
    it('is curried', testCurrying(contains, [1, [1, 2]], true));
    
});
