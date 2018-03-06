const
    // TODO: cut down on API usage for better portability of suite in cherry-picked applications
    { converge, times, range, sum, length, slice } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('converge :: ((x1, x2, …) → z) → [((a, b, …) → x1), ((a, b, …) → x2), …] → (a → b → … → z)', function() {
    
    it('builds a converging function', function() {
        const avg = converge((a, b) => a / b, [sum, length]);
        expect(avg([1, 2, 4, 5])).eql(3);
    });
    
    describe('returned converging function', function() {
        let i = 0;
        const
            count = 5,
            args = [],
            fn = function() { args.push(slice(0, Infinity, arguments)); return i++; },
            cFn = converge(fn, times(() => fn, count));
        
        before(cFn.bind(null, 'a', 'b', 'c'));
        
        it('dispatches all arguments to the branching functions', function() {
            times(idx => expect(args[idx]).eql(['a', 'b', 'c']), count);
        });
        
        it('collects all results to the converging function', function() {
            expect(args[count]).eql(range(0, count));
        });
        
    });
    
    it('has arity of 2', () => expect(converge).lengthOf(2));
    
    it('is curried', testCurrying(
        converge,
        [(a, b) => a / b, [sum, length]],
        fn => expect(fn([1, 2, 4, 5])).eql(3))
    );
    
});
