const
    { reverse } = require('portable-fp'),
    { expect } = require('chai');

describe('reverse :: [a] → [a]', function() {
    
    it('reverses the order of items in a list', function() {
        const arg = [432, undefined, null, 2.5, 'blah', 0, -5];
        expect(reverse([])).eql([]);
        expect(reverse(['a'])).eql(['a']);
        expect(reverse(['a', 'b'])).eql(['b', 'a']);
        expect(reverse(arg)).eql(arg.reverse());
    });
    
    it('reverses the order of characters in a string', function() {
        const arg = 'blah blah';
        expect(reverse('')).eql('');
        expect(reverse('a')).eql('a');
        expect(reverse('ab')).eql('ba');
        expect(reverse('blah blah')).eql('halb halb');
    });
    
    it('throws error when given null or undefined', function() {
        const run = arg => () => reverse(arg);
        expect(run(null)).throw(TypeError);
        expect(run(undefined)).throw(TypeError);
    });
    
    it('returns empty array on primitive input', function() {
        const args = [NaN, true, false, {}, /x/, 1, -5, new Boolean(true), Infinity];
        args.map(arg => expect(reverse(arg)).an('array').eql([]));
    });
    
    // doesn't seem desirable, but is consistent with Ramda
    it('returns [undefined] on non-primitive invalid input', function() {
        const args = [reverse, x => x, Object, String, Function];
        args.map(arg => expect(reverse(arg)).an('array').eql([undefined]));
    });
    
    it('has arity of 1', () => expect(reverse).lengthOf(1));
    
});
