const
    { is } = require('portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('is', function() {
    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();
    
    const foo = new Foo(), bar = new Bar();
    
    it('matches built-in types', function() {
        expect(is(Array, [])).true;
        expect(is(Boolean, new Boolean(false))).true;
        expect(is(Date, new Date())).true;
        expect(is(Function, x => x)).true;
        expect(is(Function, Foo)).true;
        expect(is(Number, new Number(0))).true;
        expect(is(Object, {})).true;
        expect(is(RegExp, /x/)).true;
        expect(is(String, new String(''))).true;
    });
    
    it('matches user-defined types', function() {
        expect(is(Foo, foo)).true;
        expect(is(Bar, bar)).true;
        expect(is(Foo, bar)).true;
        expect(is(Bar, foo)).false;
    });
    
    it('identifies any non-primitives as Object', function() {
        [
            Foo,
            new Foo(),
            [],
            x => x,
            new Date(),
            new Number(0),
            new String(''),
            new Boolean(false),
            /x/,
        ].map(obj => expect(is(Object, obj)).true);
    });
    
    it('does not coerce', function() {
        expect(is(Boolean, 1)).false;
        expect(is(Number, '1')).false;
        expect(is(Number, true)).false;
    });
    
    it('recognizes primitives as their object equivalents', function() {
        expect(is(Boolean, false)).true;
        expect(is(Number, 0)).true;
        expect(is(String, '')).true;
    });
    
    it('distinguishes primitives from Object', function() {
        [null, 1, '1', undefined, NaN, true, false, Infinity]
            .map(t => expect(is(Object, t)).false);
    });
    
    it('is curried', testCurrying(is, [String, 'a'], true));
    
});
