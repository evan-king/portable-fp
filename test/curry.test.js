const
    { curry } = require('portable-fp'),
    { expect } = require('chai');

describe('curry :: (* → a) → (* → a)', function() {
    
    describe('returned function', function() {
        
        const
            addC = curry((a, b, c, d, e=0) => a+b+c+d+e),
            partials = [addC(1, 2, 3), addC(1)(2)(3), addC(1, 2)(3), addC(1)(2, 3)];
        
        it('is the original unmodified function when arity < 2', function() {
            const zero = () => null, one = a => null, two = (a, b) => null;
            zero.prop = 'blah';
            one.prop = 'blah';
            two.prop = 'blah';
            expect(curry(zero)).property('prop');
            expect(curry(one)).property('prop');
            expect(curry(two)).not.property('prop');
        });
        
        it('accumulates required arguments without executing', function() {
            partials.map(fn => expect(fn).a('function'));
        });
        
        it('returns result on last required argument supplied', function() {
            expect(addC(1, 2, 3, 4)).eql(10);
            expect(addC(1, 2)(3, 4)).eql(10);
            expect(addC(1)(2, 3, 4)).eql(10);
            partials.map(fn => fn(4)).map(val => expect(val).eql(10));
        });
        
        it('supports additional (optional) arguments', function() {
            expect(addC(1, 2, 3, 4, 5)).eql(15);
            expect(addC(1, 2, 3)(4, 5)).eql(15);
            partials.map(fn => fn(4, 5)).map(val => expect(val).eql(15));
        });
        
        it('retains arity of original function', function() {
            const op = (a, b, c) =>  null;
            expect(op).lengthOf(3);
            expect(curry(op)).lengthOf(3);
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
            expect(curry(bound)(2, 3)).eql([1, 2, 3]);
            expect(curry(bound)(2)(3)).eql([1, 2, 3]);
            
            expect(partial).lengthOf(1);
            expect(partial()).eql([1, 2, undefined]);
            expect(curry(partial)(3)).eql([1, 2, 3]);
        });
        
        it('chains into functions with remainder arity', function() {
            const op = (a, b, c, d) => 'done';
            expect(op).lengthOf(4);
            expect(curry(op)).lengthOf(4);
            expect(curry(op)(1)).lengthOf(3);
            expect(curry(op)(1)(2, 3)).lengthOf(1);
        });
        
        it('retains name of original function', function() {
            const op = (a, b, c) => null, cop = curry(op);
            expect(op.name).eql('op');
            expect(cop.name).eql(op.name);
        });
        
    });
    
    it('has arity of 1', () => expect(curry).lengthOf(1));
    
});