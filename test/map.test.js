const
    { map, keys, values, identity } = require('../lib/portable-fp'),
    { testCurrying, sparseList } = require('./util'),
    { expect } = require('chai');

describe('map :: Functor f => (a → b) → f a → f b', function() {
    const
        obj = {b: 1, a: 2, c: 3, d: 4},
        arr = values(obj),
        fn = n => n*2,
        out = arr.map(fn);
    
    it('maps arrays', function() {
        expect(map(fn, [])).eql([]);
        expect(map(fn, arr)).eql(out);
    });
    
    it('leaves sparse arrays unpacked', function() {
        const collected = [];
        expect(map(identity, sparseList)).eql(sparseList);
    });
    
    it('maps objects', function() {
        expect(map(identity, {})).eql({});
        expect(map(identity, obj)).eql(obj);
        const mapped = map(fn, obj);
        expect(keys(mapped)).eql(Object.keys(obj));
        expect(values(mapped)).eql(out);
    });

    it('excludes prototype properties', function() {
        function MyObject() { this.ownprop = 1; }
        MyObject.prototype.protoprop = 2;
        const obj = new MyObject();
        
        expect(map(x => x, obj)).eql({ownprop: 1});
    });
    
    it('passes only values', function() {
        let count = 0;
        function inspect() {
            expect(arguments).lengthOf(1);
            count++;
        }
        map(inspect, [1, 2]);
        expect(count).eql(2);
    });
    
    it('is curried', testCurrying(map, [fn, arr], out));
    
});
