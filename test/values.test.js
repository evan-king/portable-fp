const
    { values } = require('../lib/portable-fp'),
    { testCurrying, sparseList, packedList } = require('./util'),
    { expect } = require('chai');

describe('values :: {k: v} → [v]', function() {
    
    it('returns object values in natural (defined) order', function() {
        expect(values({b: 1, a: 2, c: 3})).eql([1, 2, 3]);
    });
    
    it('returns (sparse) array values', function() {
        expect(values(sparseList)).eql(packedList);
    });
    
    it('returns empty array on invalid input', function() {
        const args = [true, false, {}, values, x => x, /x/, String, null, undefined, 4];
        args.map(arg => expect(values(arg)).an('array').eql([]));
    });
    
    it('has arity of 1', () => expect(values).lengthOf(1));
});
