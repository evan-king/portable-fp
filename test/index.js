const
    R = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');



describe('API', function() {
    
    it('names all functions to match their API names', function() {
        Object.keys(R).map(key => expect(R[key].name).eql(key));
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
        
        mutate(R, 'API');
        R.mapObjIndexed(mutate, R);
    });
    
});

with(R) {



    

describe('find :: (a → Boolean) → [a] → a | undefined', function() {
    
    it('finds first value in array satisftying match function', function() {
        const arr = [1, 0.5, 2, -3, 4];
        
    });
    
});

describe('findIndex :: (a → Boolean) → [a] → Number', function() {
    
    it('finds first value in array satisftying match function', function() {
        const arr = [1, 0.5, 2, -3, 4];
        
    });
    
});


    
}
