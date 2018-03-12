const
    { valuesIn } = require('portable-fp'),
    { sparseList, packedList } = require('./util'),
    { expect } = require('chai');

describe('valuesIn :: {k: v} → [v]', function() {
    
    it('returns object values in natural (defined) order', function() {
        expect(valuesIn({b: 1, a: 2, c: 3})).eql([1, 2, 3]);
    });
    
    it('returns (sparse) array values', function() {
        expect(valuesIn(sparseList)).eql(packedList);
    });

    it('includes prototype properties', function() {
        function MyObject() { this.ownprop = 1; }
        MyObject.prototype.protoprop = 2;
        const obj = new MyObject();
        
        expect(valuesIn(obj)).eql([1, 2]);
    });
    
    it('returns empty array on invalid input', function() {
        const args = [true, false, {}, valuesIn, x => x, /x/, String, null, undefined, 4];
        args.map(arg => expect(valuesIn(arg)).an('array').eql([]));
    });
    
    it('has arity of 1', () => expect(valuesIn).lengthOf(1));
    
});
