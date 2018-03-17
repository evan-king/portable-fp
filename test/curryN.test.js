const
    { curryN, times } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('curryN :: Number → (* → a) → (* → a)', function() {
    
    describe('returned function', function() {
        
        const
            count = function(a, b, c, d, e=0) { return arguments.length; },
            args = times(x => 1, count.length + 2);
        
        it('has specified arity', function() {
            times(function(idx) {
                const countC = curryN(idx, count);
                expect(countC).lengthOf(idx);
            }, args.length);
        });
        
        it('does not execute until specified number of arguments is supplied', function() {
            times(function(idx) {
                const countC = curryN(idx, count);
                if(idx < 1) return expect(countC()).a('number').eql(0);
                expect(countC.apply(null, args.slice(0, idx-1))).a('function');
                expect(countC.apply(null, args.slice(0, idx))).a('number').eql(idx);
            }, args.length);
        });
        
        it('still receives any additional arguments', function() {
            times(function(idx) {
                if(idx < 1) return;
                const countC = curryN(idx, count);
                expect(countC.apply(null, args.slice(0, idx+1))).a('number').eql(idx+1);
                expect(countC.apply(null, args)).a('number').eql(args.length);
            }, args.length);
        });
        
        it('retains binding of original function', function() {
           const
               ctx = {a: 1},
               op = function(b, c) {
                   expect(this, 'retain context').property('a').eql(1);
                   return [this.a, b, c];
               },
               bound = op.bind(ctx),
               partial = op.bind(ctx, 2);
           
           expect(op).lengthOf(2);
           
           expect(bound).lengthOf(2);
           expect(bound()).eql([1, undefined, undefined]);
           expect(curryN(2, bound)(2, 3)).eql([1, 2, 3]);
           expect(curryN(2, bound)(2)(3)).eql([1, 2, 3]);
           
           expect(partial).lengthOf(1);
           expect(partial()).eql([1, 2, undefined]);
           expect(curryN(1, partial)(3)).eql([1, 2, 3]);
        });
        
        it('chains into functions with remainder arity', function() {
           const op = (a, b, c, d) => 'done';
           expect(op).lengthOf(4);
           expect(curryN(3, op)).lengthOf(3);
           expect(curryN(3, op)(1)).lengthOf(2);
           expect(curryN(3, op)(1, 2)).lengthOf(1);
        });
        
        it('retains name of original function', function() {
           const op = (a, b, c) => null, cop = curryN(5, op);
           expect(op.name).eql('op');
           expect(cop.name).eql(op.name);
        });
        
    });
    
    it('has arity of 2', () => expect(curryN).lengthOf(2));
    
    it('is curried', testCurrying(curryN, [2, (a, b) => a+b], fn => expect(fn(1)(1)).eql(2)));
    
});