const
    FP = require('portable-fp'),
    {
        testCurrying,
        sparseList,
        packedList,
        varietyList,
        varietyListCopy,
        varietyObj,
        varietyObjCopy
    } = require('./util'),
    { expect } = require('chai');

describe('API', function() {
    
    it('names all functions to match their API names', function() {
        Object.keys(FP).map(key => expect(FP[key].name).eql(key));
    });
    
    it('is immutable', function() {
        const mutate = (obj, name) => {
            // strict mode throws TypeError, else silently ignored
            expect(obj._blah, name).eql(undefined);
            try {
                obj._blah = 5;
            } catch(ex) {
                expect(ex, name).instanceOf(TypeError);
            }
            expect(obj._blah, name).eql(undefined);
        }
        
        mutate(FP, 'API');
        FP.mapObjIndexed(mutate, FP);
    });
    
});

describe('dist', function() {
    
});

const args = [null, undefined, false, true, '', 'a', '0xFF', 5, String, /x/, x => x, [], {}];

with(FP) {

// match
// pick
// prop


}
