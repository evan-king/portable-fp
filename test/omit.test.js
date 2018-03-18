const
    { omit, values } = require('portable-fp'),
    { testCurrying, sparseList, varietyList } = require('./util'),
    { expect } = require('chai');

describe('omit :: [k] → {k: v} → {k: v}', function() {
    const
        obj = {b: 1, a: 2, c: 3, d: 4}, arr = values(obj), str = 'blah';
    
    it('creates object copies omitting specified keys', function() {
        expect(omit([], obj)).eql(obj);
        expect(omit(['x', 'y'], obj)).eql(obj);
        expect(omit(['a', 'b'], obj)).eql({c: 3, d: 4});
        expect(omit(Object.keys(obj), obj)).eql({});
    });
    
    it('uses order specified by source object', function() {
        expect(omit(['c', 'd'], obj)).eql({b: 1, a: 2});
    });
    
    it('accepts arrays as objects (omitting numeric or string indices)', function() {
        expect(omit([], arr)).eql({'0': 1, '1': 2, '2': 3, '3': 4});
        expect(omit(['8', '9'], arr)).eql({'0': 1, '1': 2, '2': 3, '3': 4});
        expect(omit([1, 2], arr)).eql({'0': 1, '3': 4});
        expect(omit(['0', '1', '4', '5'], arr)).eql({'2': 3, '3': 4});
        expect(omit(Object.keys(arr), arr)).eql({});
    });
    
    it('accepts strings as objects (omitting numeric or string indices)', function() {
        expect(omit([], str)).eql({'0': 'b', '1': 'l', '2': 'a', '3': 'h'});
        expect(omit(['8', '9'], str)).eql({'0': 'b', '1': 'l', '2': 'a', '3': 'h'});
        expect(omit([1, 2], str)).eql({'0': 'b', '3': 'h'});
        expect(omit(['0', '1', '4', '5'], str)).eql({'2': 'a', '3': 'h'});
        expect(omit(Object.keys(str), str)).eql({});
    });
    
    it('excludes unassigned sparse array indices', function() {
        const idxs = [];
        for(const i in sparseList) idxs.push(i);
        expect(omit(idxs, sparseList)).eql({});
    });

    it('copies prototype properties', function() {
        function MyObject() { this.ownprop = 1; }
        MyObject.prototype.protoprop = 2;
        const obj = new MyObject();
        
        expect(omit(['blah'], obj))
            .eql({ownprop: 1, protoprop: 2});
    });
    
    describe('diverging from Ramda behavior', function() {
        
        it.skip('throws error if given null or undefined for keys', function() {
            expect(() => omit(null, obj)).throw(TypeError);
            expect(() => omit(undefined, obj)).throw(TypeError);
        });
        
        it.skip('treats strings as arrays of one-character keys');
        
        it('accepts a single key without list', function() {
            ['blah', '', '1', 'NaN'].map(v => {
                const res = {};
                res[v] = true;
                expect(omit(v, res)).eql({});
            });
        });
        
        it('coerces all keys to strings', function() {
            [0, 1, {}, NaN, Infinity, new Date(), true, false].map(v => {
                const res = {};
                res[v] = true;
                expect(omit(v, res)).eql({});
            });
        });
        
    });
    
    it('treats all invalid objects as empty objects', function() {
        [true, false, NaN, Infinity, 0, 1]
            .map(v => expect(omit('a', v)).eql({}));
    });
    
    it('has arity of 2', () => expect(omit).lengthOf(2));
    
    it('is curried', testCurrying(omit, [[], obj], obj));
    
});
