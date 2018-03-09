const
    { keys } = require('../lib/portable-fp'),
    { sparseList, packedList } = require('./util'),
    { expect } = require('chai');

describe('keys :: {k: v} ? [k]', function() {
    
    it('returns object keys in natural (defined) order', function() {
        expect(keys({b: 1, a: 2, c: 3})).eql(['b', 'a', 'c']);
    });
    
    it('returns (sparse) array keys, as strings', function() {
        const out = [];
        for(const k in sparseList) out.push(String(k));
        expect(out).lengthOf(packedList.length);
        expect(keys(sparseList)).eql(out);
    });

    it('excludes prototype properties', function() {
        function MyObject() { this.ownprop = 1; }
        MyObject.prototype.protoprop = 2;
        const obj = new MyObject();
        
        expect(keys(obj)).eql(['ownprop']);
    });
    
    it('returns empty array on invalid input', function() {
        const args = [true, false, {}, keys, x => x, /x/, String, null, undefined, 4];
        args.map(arg => expect(keys(arg)).an('array').eql([]));
    });
    
    it('has arity of 1', () => expect(keys).lengthOf(1));
    
});
