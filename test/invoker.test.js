const
    { invoker, range } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('invoker :: Number → String → (a → b → … → n → Object → *)', function() {
    
    const testObj = {
        prop: 5,
        method: function(...args) { return args.concat(this.prop); }
    };
    
    describe('return value', function() {
        
        it('is a function with fixed arity', function() {
            range(0, 9).map(
                len => expect(invoker(len, 'method'))
                    .a('function')
                    .lengthOf(len+1)
            );
        });
        
        it('dispatches the first n-1 arguments to named method of argument n', function() {
            expect(invoker(0, 'method')(testObj)).eql([5]);
            expect(invoker(3, 'method')(1, 2, 3, testObj)).eql([1, 2, 3, 5]);
        });
        
        it('ignores extra parameters', function() {
            expect(invoker(1, 'method').bind(null, 1, 2, testObj)).throw(TypeError);
            expect(invoker(1, 'method')(1, testObj, 2)).eql([1, 5]);
        });
        
        it('is curried when it takes extra arguments', function() {
            const gather = invoker(3, 'method');
            testCurrying(gather, [1, 2, 3, testObj], [1, 2, 3, 5]);
        });
        
    });
    
    it('does not expose extra parameters of internal implementation', function() {
        const run = invoker(2, 'method', [1, 2], null, 'renamed');
        expect(run.name).eql('method');
        expect(run(3, 4, testObj)).eql([3, 4, 5]);
    });
    
    it('has arity of 2', () => expect(invoker).lengthOf(2));
    
    it('is curried', testCurrying(invoker, [0, 'method'], v => expect(v(testObj)).eql([5])));
    
});
