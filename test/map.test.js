const
    { map, keys, values, identity } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
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
    
    it('maps objects', function() {
        expect(map(identity, {})).eql({});
        expect(map(identity, obj)).eql(obj);
        const mapped = map(fn, obj);
        expect(keys(mapped)).eql(Object.keys(obj));
        expect(values(mapped)).eql(out);
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
