const
    { clamp } = require('../lib/portable-fp'),
    { testCurrying } = require('./util'),
    { expect } = require('chai');

describe('clamp :: Ord a => a → a → a → a', function() {
    
    it('constrains numbers to min and max value', function() {
        const clampNum = clamp(-1, 2.5);
        expect(clampNum(3)).eql(2.5);
        expect(clampNum('3')).eql(2.5);
        expect(clampNum(0)).eql(0);
        expect(clampNum(-2)).eql(-1);
    });
    
    it('constrains strings to min and max value', function() {
        const clampStr = clamp('b', 'c');
        expect(clampStr('d')).eql('c');
        expect(clampStr('ca')).eql('c');
        expect(clampStr('a')).eql('b');
        expect(clampStr('ba')).eql('ba');
    });
    
    it('constrains dates to min and max value', function() {
        const
            week = 1000*60*60*24*7,
            later = d => (new Date(d + Math.floor(Math.random() * week)));
        const
            a = new Date(2017, 1, 1),
            b = later(a),
            c = later(b),
            d = later(c),
            e = later(d);
        const clampDate = clamp(b, d);
        expect(clampDate(a)).eql(b);
        expect(clampDate(b)).eql(b);
        expect(clampDate(c)).eql(c);
        expect(clampDate(d)).eql(d);
        expect(clampDate(e)).eql(d);
    });
    
    it('is curried', testCurrying(clamp, [1, 2, 3], 2));
    
});