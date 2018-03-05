const
    { keys } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('keys :: {k: v} ? [k]', function() {
    const
        obj = {b: 1, a: 2, c: 3},
        arr = [1, 2];
    arr[3] = 4;
    
    it('returns object keys in natural (defined) order', function() {
        expect(keys(obj)).eql(['b', 'a', 'c']);
    });
    
    it('returns (sparse) array keys, as strings', function() {
        expect(keys(arr)).eql(['0', '1', '3']);
    });
});
