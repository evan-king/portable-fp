const
    { mapObjIndexed, map, keys, values } = require('../lib/portable-fp'),
    { testCurrying, sparseList, packedList } = require('./util'),
    { expect } = require('chai');

describe('mapObjIndexed :: ((*, String, Object) → *) → Object → Object', function() {
    const
        fn = n => n*2,
        obj = {b: 1, a: 2, c: 3},
        mapped = {b: 2, a: 4, c: 6};
    
    it('maps arrays (into objects with numeric string keys)', function() {
        const
            arr = [1, 2, 3, 4],
            out = mapObjIndexed(fn, arr);
        
        expect(values(out)).eql(arr.map(fn));
        expect(keys(out)).eql(map(obj => obj.toString(), Object.keys(arr)));
    });
    
    it('skips sparse array indices', function() {
        let i = 0;
        const packedObj = {};
        keys(sparseList).map(k => packedObj[String(k)] = sparseList[k]);
        expect(mapObjIndexed(x => (i++, x), sparseList)).eql(packedObj);
        expect(i).eql(packedList.length);
    });
    
    it('maps objects, preserving natural key ordering', function() {
        const out = mapObjIndexed(fn, obj);
        expect(out).eql(mapped);
        expect(keys(out)).eql(keys(mapped));
    });

    it('excludes prototype properties', function() {
        function MyObject() { this.ownprop = 1; }
        MyObject.prototype.protoprop = 2;
        const obj = new MyObject();
        
        expect(map(x => x, obj)).eql({ownprop: 1});
    });
    
    it('passes values, keys, and the original object', function() {
        let count = 0;
        function inspect() {
            expect(arguments).lengthOf(3);
            expect(arguments[1]).a('string');
            expect(arguments[2]).an('object');
            count++;
        }
        mapObjIndexed(inspect, obj);
        expect(count).eql(keys(obj).length);
    });
    
    it('has arity of 2', () => expect(map).lengthOf(2));
    
    it('is curried', testCurrying(mapObjIndexed, [fn, obj], mapped));
    
});
