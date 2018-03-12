const
    R = require('portable-fp'),
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

describe('dist', function() {
    
});

const args = [null, undefined, false, true, '', 'a', '0xFF', 5, String, /x/, x => x, [], {}];

with(R) {

describe('contains', function() {
    
    it('identifies whether element is in list', function() {
        expect(contains(1, [1, 2])).true;
        expect(contains(3, [1, 2])).false;
    });
    
    it('identifies whether element is in object', function() {
        expect(contains(1, {a: 1, b: 2})).true;
        expect(contains(3, {a: 1, b: 2})).false;
    });
    
    it('handles invalid input', function() {
        const inputs = [null, undefined, false, true, '', 'a', 5, String, /x/, x => x];
        inputs.map(v => expect(contains(1, v)).eql(false));
    });
    
    it('has arity of 2', () => expect(filter).lengthOf(2));
    
    it('is curried', testCurrying(contains, [1, [1, 2]], true));
    
});

// defaultTo
// head
// is
// last
// match
// pick
// prop
// range
// reverse
// tail




describe('find :: (a → Boolean) → [a] → a | undefined', function() {
    
    it('finds first value in array satisftying match function', function() {
        const arr = [1, 0.5, 3, -3, 4];
        expect(find(x => x > 1, arr)).eql(3);
    });
    
});

describe('findIndex :: (a → Boolean) → [a] → Number', function() {
    
    it('finds first value in array satisftying match function', function() {
        const arr = [1, 0.5, 2, -3, 4];
        
    });
    
});


    
}
