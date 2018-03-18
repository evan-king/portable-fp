const
    { pick, values } = require('portable-fp'),
    { testCurrying, sparseList, varietyList } = require('./util'),
    { expect } = require('chai');

describe('pick :: [k] → {k: v} → {k: v}', function() {
    const
        obj = {b: 1, a: 2, c: 3, d: 4}, arr = values(obj);
    
    it('creates object copies pruned to specified keys', function() {
        expect(pick([], obj)).eql({});
        expect(pick(['a', 'c'], obj)).eql({a: 2, c: 3});
        expect(pick(['a', 'c', 'e', 'f'], obj)).eql({a: 2, c: 3});
    });
    
    it('uses order specified by keys', function() {
        expect(pick(['c', 'b', 'a'], obj)).eql({c: 3, b: 1, a: 2});
    });
    
    it('accepts arrays as object (picking numeric or string indices)', function() {
        expect(pick([], arr)).eql({});
        expect(pick([1, 2], arr)).eql({'1': 2, '2': 3});
        expect(pick(['1', '2', '4', '5'], arr)).eql({'1': 2, '2': 3});
    });
    
    it('excludes unassigned sparse array indices', function() {
        const idxs = Array.from([...Array(Math.max(0, sparseList.length))].keys());
        const result = {};
        for(const i in sparseList) result[i] = sparseList[i];
        expect(pick(idxs, sparseList)).eql(result);
    });

    it('copies prototype properties', function() {
        function MyObject() { this.ownprop = 1; }
        MyObject.prototype.protoprop = 2;
        const obj = new MyObject();
        
        expect(pick(['ownprop', 'protoprop'], obj))
            .eql({ownprop: 1, protoprop: 2});
    });
    
    describe('diverging from Ramda behavior', function() {
        const obj = {blah: 0};
        obj.a = 1;
        obj[''] = 2;
        obj['[object Object]'] = 3;
        obj[1] = 4;
        obj[NaN] = 6;
        const d = new Date();
        obj[d] = 7;
        obj[false] = 8;
        obj[Infinity] = 9;
        
        it.skip('throws error if given null or undefined for keys', function() {
            expect(() => pick(null, obj)).throw(TypeError);
            expect(() => pick(undefined, obj)).throw(TypeError);
        });
        
        it.skip('treats strings as arrays of one-character keys');
        
        it('accepts a single key without list', function() {
            expect(pick('blah', obj)).eql({blah: 0});
            expect(pick('', obj)).eql({'': 2});
            expect(pick('1', obj)).eql({'1': 4});
            expect(pick('NaN', obj)).eql({'NaN': 6});
        });
        
        it('coerces all keys to strings', function() {
            expect(pick({}, obj)).eql({'[object Object]': 3});
            [1, NaN, d, false, Infinity]
                .map(v => {
                    const res = {};
                    res[v] = obj[v];
                    expect(pick(v, obj)).eql(res);
                    expect(pick([v], obj)).eql(res);
                });
        });
        
        it.skip('throws error if given invalid source object', function() {
            [true, false, 'blah', NaN, Infinity, 0, 1]
                .map(v => expect(() => pick('a', v)).throw(TypeError));
        });
        
        // intentional change for behavioral parity with omit
        it('treats all invalid objects as empty objects', function() {
           [true, false, 'blah', NaN, Infinity, 0, 1]
               .map(v => expect(pick('a', v)).eql({}));
        });
        
    });
    
    it('has arity of 2', () => expect(pick).lengthOf(2));
    
    it('is curried', testCurrying(pick, [['a'], obj], {a: 2}));
    
});
