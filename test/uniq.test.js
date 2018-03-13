const
    { uniq } = require('portable-fp'),
    { sparseList, packedList, varietyList, varietyListCopy } = require('./util'),
    { expect } = require('chai');

describe('uniq :: [a] → [a]', function() {
    
    it('removes repeated elements in arrays (matching by equals spec)', function() {
        expect(uniq(varietyList)).eql(varietyList);
        expect(uniq([1, 2, 1, 3, 5, 4, 5, 6])).eql([1, 2, 3, 5, 4, 6]);
        varietyListCopy.map(v => expect(uniq(varietyList.concat(v))).eql(varietyList));
    });
    
    it('returns a naturally ordered list of the unique characters in a string', function() {
        expect(uniq('babcd')).eql(['b', 'a', 'c', 'd']);
    });
    
    describe('diverging from Ramda behavior', function() {
        
        it('handles sparse arrays', function() {
            expect(packedList.length).gt(0);
            expect(uniq(sparseList)).eql(uniq(packedList));
        });
        
    });
    
    it('handles invalid input', function() {
        const inputs = [null, undefined, false, true, 5, String, /x/, x => x];
        inputs.map(v => expect(uniq(v)).eql([]));
    });
    
    it('has arity of 1', () => expect(uniq).lengthOf(1));
    
});