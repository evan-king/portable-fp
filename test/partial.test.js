const
    { partial } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('partial :: (Number → a) → Number → [a]', function() {
    const context = {x: 1};
    function args(a, b, c, d = 0) { return {ctx: this, args: [].slice.call(arguments) }; }
    
    it('binds arguments returning the bound function with remainder length', function() {
        expect(args).lengthOf(3);
        expect(partial(args, ['a', 'b'])).lengthOf(1);
        expect(partial(args, ['a'])()).property('args').eql(['a']);
        expect(partial(args, ['a'])('b')).property('args').eql(['a', 'b']);
        expect(partial(args, ['a', 'b'])('c', 'd', 'e'))
            .property('args').eql(['a', 'b', 'c', 'd', 'e']);
    });
    
    describe('diverging from Ramda behavior', function() {
        
        it.skip('leaves context unbound and bindable', function() {
            const part = partial(args, 'a'), bound = part.bind(context);
            expect(partial(args, 'a')()).property('ctx').eql(args().ctx);
            expect(bound()).property('ctx').eql(context);
        });
        
        it('uses the function as bound context (if unbound)', function() {
            const prebound = args.bind(context);
            expect(prebound()).property('ctx').eql(context);
            expect(partial(prebound, 'a')()).property('ctx').eql(context);
            expect(partial(args, 'a')()).property('ctx').eql(args);
        });
        
    });
    
    it('has arity of 2', () => expect(partial).lengthOf(2));
    
    it('is curried', testCurrying(partial, [(a, b) => a+b, 1], fn => expect(fn(1)).eql(2))); 
    
});
