const
    { filter } = require('portable-fp'),
    { testCurrying, sparseList, packedList } = require('./util'),
    { expect } = require('chai');

describe('filter :: Filterable f => (a → Boolean) → f a → f a', function() {
    const t = () => true, f = () => false;
    
    it('filters arrays', function() {
        expect(filter(t, [])).eql([]);
        expect(filter(x => true, sparseList)).eql(packedList);
        expect(filter(f, [0, 1, 2, 3])).eql([]);
        expect(filter(x => x > 1, [0, 1, 2, 3])).eql([2, 3]);
    });
    
    it('filters arguments', function() {
        function args() { return arguments; }
        expect(filter(t, args())).eql([]);
        expect(filter(t, args(undefined, 2))).eql([undefined, 2]);
        expect(filter(f, args(0, 1, 2, 3))).eql([]);
        expect(filter(x => x > 1, args(0, 1, 2, 3))).eql([2, 3]);
    });
    
    it('filters objects', function() {
        expect(filter(t, {})).eql({});
        expect(filter(f, {d: 0, c: 1, b: 2, a: 3})).eql({});
        expect(filter(x => x > 1, {d: 0, c: 1, b: 2, a: 3})).eql({ b: 2, a: 3});
    });
    
    describe('diverging from Ramda behavior', function() {
        
        // this Ramda behavior would be complicated to replicate and arguably undesirable
        it.skip('inflates sparse arrays', function() {
            //expect(filter(t, sparseList)).eql(sparseList);
            expect(filter(x => x !== sparseList[0], sparseList)).eql(sparseList.slice(1));
        });
        
        it('collapses sparse arrays', function() {
            expect(filter(t, sparseList)).eql(packedList);
            expect(filter(x => x !== packedList[0], sparseList)).eql(packedList.slice(1));
        });
        
    });
    
    it('returns empty array on invalid input', function() {
        const args = [true, false, null, undefined, /x/, 4];
        args.map(arg => expect(filter(t, arg)).eql([]));
    });
    
    it('has arity of 2', () => expect(filter).lengthOf(2));
    
    it('is curried', testCurrying(filter, [t, []], []));
    
});
