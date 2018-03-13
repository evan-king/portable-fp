const
    { keysIn } = require('portable-fp'),
    { sparseList, packedList } = require('./util'),
    { expect } = require('chai');

describe('keysIn :: {k: v} ? [k]', function() {
    
    it('returns object keys in natural (defined) order', function() {
        expect(keysIn({b: 1, a: 2, c: 3})).eql(['b', 'a', 'c']);
    });
    
    it('returns (sparse) array keys, as strings', function() {
        const out = [];
        for(const k in sparseList) out.push(String(k));
        expect(out).lengthOf(packedList.length);
        expect(keysIn(sparseList)).eql(out);
    });
    
    it('returns string keys', function() {
        expect(keysIn('ab')).eql(['0', '1']);
    });

    it('includes prototype properties', function() {
        function MyObject() { this.ownprop = 1; }
        MyObject.prototype.protoprop = 2;
        const obj = new MyObject();
        
        expect(keysIn(obj)).eql(['ownprop', 'protoprop']);
    });
    
    it('returns empty array on invalid input', function() {
        const args = [true, false, {}, keysIn, x => x, /x/, String, null, undefined, 4];
        args.map(arg => expect(keysIn(arg)).an('array').eql([]));
    });
    
    it('has arity of 1', () => expect(keysIn).lengthOf(1));
    
});
