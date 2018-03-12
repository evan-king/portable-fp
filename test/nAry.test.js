const
    { nAry, sum } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('nAry :: Number → (* → a) → (* → a)', function() {
    let count = 0;
    const
        natural0 = function() {},
        natural3 = (a, b, c) => a+b+c,
        seq = [0, 1, 2, 3, 4, 5],
        check = fn => idx => {
            count++;
            expect(nAry(idx, natural0)).lengthOf(idx);
        };
    
    it('sets the reported arity of a function', function() {
        seq.map(check(natural0));
        seq.map(check(natural3));
        
        expect(count).eql(2*seq.length);
    });
    
    it('witholds additional arguments', function() {
        nAry(1, (a, b, c = 3, d) => {
            expect(a).eql(1);
            expect(b).eql(undefined);
            expect(c).eql(3);
            expect(d).eql(undefined);
        })(1, 2, 4);
    });
    
    it('preserves original behavior (except arg limiting)', () => {
        Error.stackTraceLimit = 5;

        const
            input = [1, 2, 3, 4],
            run = len => nAry(len, fn).apply(fn, input),
            fn = function(a, b, c = -1, d) {
                return [arguments.length, a, b, c, d];
            };
        
        expect(run(0)).eql([0, undefined, undefined, -1, undefined]);
        expect(run(1)).eql([1, 1, undefined, -1, undefined]);
        expect(run(2)).eql([2, 1, 2, -1, undefined]);
        expect(run(3)).eql([3, 1, 2, 3, undefined]);
        expect(run(4)).eql([4, 1, 2, 3, 4]);
        expect(run(5)).eql([4, 1, 2, 3, 4]);
        
        return;
        seq.map(function(idx) {
            const
                args = [1, 2, 3, 4],
                len = Math.min(natural3.length, idx),
                ret = args.slice(0, len);
            console.log(idx, len, ret);
            expect(nAry(idx, natural3).apply(null, args)).eql(ret);
        });
    });
    
    it('preserves original function name', function() {
        expect(nAry(2, natural3).name).eql('natural3');
    });
    
    it('has arity of 2', () => expect(nAry).lengthOf(2));
    
    it('is curried', testCurrying(nAry, [4, natural0], fn => expect(fn.name).eql(natural0.name)));
    
});