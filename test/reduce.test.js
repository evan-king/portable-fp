const
    { reduce, add } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('reduce :: ((a, b) → a) → a → [b] → a', function() {
    const
        init = 5
        input = [1, 2, 4, 8],
        output = init + input.reduce(add),
        steps = [
            [init, 1],
            [init+1, 2],
            [init+3, 4],
            [init+7, 8]
        ];
    
    it('runs reducer callback, returns accumulated value', function() {
        const
            audit = [],
            auditor = (acc, val) => (audit.push([acc, val]), acc+val),
            result = reduce(auditor, init, input);
        
        expect(audit).eql(steps);
        expect(result).eql(output);
    });
    
    it('supports iterators', function() {
        const iter = input.keys();
        expect(iter.length).eql(undefined);
        expect(iter[Symbol.iterator]).a('function');
        expect(reduce(add, 0, iter)).eql(6);
        
        const gen = function*() { yield 1; yield 2; yield 3; };
        expect(reduce(add, 0, gen())).eql(6);
    });
    
    it('is curried', testCurrying(reduce, [add, init, input], output));
    
});
