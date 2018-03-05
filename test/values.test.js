const
    { values } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('values :: {k: v} → [v]', function() {
    const
        obj = {b: 1, a: 2, c: 3},
        arr = [1, 2];
    arr[3] = 4;
    
    it('returns object values in natural (defined) order', function() {
        expect(values(obj)).eql([1, 2, 3]);
    });
    
    it('returns (sparse) array values', function() {
        expect(values(arr)).eql([1, 2, 4]);
    });
});
