const
    { always } = require('portable-fp'),
    { expect } = require('chai');

describe('always :: a → (* → a)', function() {
    
    it('converts value into function that returns it', function() {
        const inputs = [null, undefined, false, true, '', 'a', 5, String, x => x];
        inputs.map(v => expect(always(v)()).eql(v));
    });
    
    it('has arity of 1', () => expect(always).lengthOf(1));
    
});
