const
    { identity } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('identity :: a → a', function() {
    
    it('returns first argument unmodified', function() {
        expect(identity()).eql(undefined);
        expect(identity(1)).eql(1);
        expect(identity(1, 2, 3)).eql(1);
    });
    
    it('has arity of 1', () => expect(identity).lengthOf(1));
    
});
