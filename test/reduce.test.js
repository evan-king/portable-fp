const
    { reduce } = require('portable-fp'),
    { testCurrying, sparseList } = require('./util'),
    { expect } = require('chai');

describe('reduce :: ((a, b) → a) → a → [b] → a', function() {
    const
        add = (a, b) => a + b,
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
    
    it('does not skip sparse array indexes', function() {
        const collected = [];
        expect(reduce(add, 0, sparseList)).eql(NaN);
    });
    
    it('supports iterators', function() {
        const iter = input.keys();
        expect(iter.length).eql(undefined);
        expect(iter[Symbol.iterator]).a('function');
        expect(reduce(add, 0, iter)).eql(6);
        
        const gen = function*() { yield 1; yield 2; yield 3; };
        expect(reduce(add, 0, gen())).eql(6);
    });
    
    it('supports arguments objects', function() {
        function fn() { return arguments; }
        expect(reduce(add, 0, fn(1, 2, 3))).eql(6);
    });
    
    it('throws error on non-list input', function() {
        const args = [true, false, {}, run, x => x, /x/, String, null, undefined, 4];
        args.map(arg => expect(reduce.bind(null, add, 0, arg)).throw(TypeError));
    });
    
    it('has arity of 3', () => expect(reduce).lengthOf(3));
    
    it('is curried', testCurrying(reduce, [add, init, input], output));
    
});
