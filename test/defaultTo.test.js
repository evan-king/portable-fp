const
    { defaultTo } = require('portable-fp'),
    { testCurrying, varietyList } = require('./util'),
    { expect } = require('chai');

describe('defaultTo :: a → b → a | b', function() {
    const
        def = 'alternative',
        applyDef = v => defaultTo(def, v),
        defaults = [null, undefined, NaN],
        nonDefaults = varietyList
            .filter(x => x !== null && x !== undefined && x === x);
    
    it('replaces null, undefined, and NaN with provided default', function() {
        expect(nonDefaults.map(applyDef)).eql(nonDefaults);
        expect(defaults.map(applyDef)).eql(defaults.map(x => def));
    });
    
    it('has arity of 2', () => expect(defaultTo).lengthOf(2));
    
    it('is curried', testCurrying(defaultTo, [1, NaN], 1));
    
});
