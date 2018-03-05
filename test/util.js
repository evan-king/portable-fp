
const
    { sum, length } = require('../lib/portable-fp'),
    expect = require('chai').expect;

// curryPermutations :: [1, 2, 3] -> [[1, 2, 3]], [[1, 2], [3]], [[1], [2], [3]], ... ]
function curryPermutations(args) {
    if(args.length === 1) return [[[args[0]]]];
    
    const
        last = args[args.length-1],
        bases = curryPermutations(args.slice(0, -1)),
        appendNewSet = arr => arr.concat([[last]]),
        extendLastSet = arr => (arr[arr.length-1] = arr[arr.length-1].concat([last]), arr);
    
    return []
        .concat(bases.map(appendNewSet))
        .concat(bases.map(extendLastSet));
    
}

// remainder :: [[a]] -> n
function remainder(argSet) {
    return argSet.map(args => args.length).reduce((a,b) => a+b);
}

// testCurrying :: fn -> [arg] -> * -> testImplementation
function testCurrying(fn, args, result) {
    
    const
        argSets = curryPermutations(args); //.filter(arr => arr.length > 1);
    
    return function() {
        const partials = [];
        
        argSets.map(function(copy) {
            const set = copy.slice();
            let step = fn;
            while(set.length > 1) {
                partials.push(step = step.apply(null, set.shift()));
                expect(step, 'arity matching remaining args').lengthOf(remainder(set));
                // const nextArgs = set.shift();
                // console.log('adding args', nextArgs);
                // step = step.apply(null, nextArgs)
                // console.log('step', step.toString());
                // partials.push(step);
            }
            const lastArgs = set.shift();
            const end = step.apply(null, lastArgs);
            if(typeof result == 'function') return result(end);
            if(result !== undefined) expect(end, 'end result').eql(result);
            else expect(end, 'end result').not.a('function');
            //console.log('executed');
        });
        
        // We should have accumulated a partial every time we stepped through currying without completing
        expect(partials).lengthOf(sum(argSets.map(length)) - argSets.length);
        partials.map(fn => expect(fn).a('function'));
        //console.log('done');
    }
}

describe.skip('[curry test generator]', function() {
    it('generates sets of args to pass', function() {
        expect(curryPermutations([1, 2, 3])).eql([
            [[1], [2], [3]],
            [[1, 2], [3]],
            [[1], [2, 3]],
            [[1, 2, 3]]
        ]);
    });
    
    it('runs every arg set', function() {
        const
            argNames = ['a', 'b', 'c'],
            partialRuns = [],
            finishRuns = [];
        const curryMock = (prior = {idx: 0, a: 0, b: 0, c: 0}) => function(a, b, c) {
            console.log(a, b, c, prior);
            prior.idx++;
            
            if(a && !prior.a) prior.a = prior.idx;
            if(b && !prior.b) prior.b = prior.idx;
            if(c && !prior.c) prior.c = prior.idx;
            
            const set = [];
            for(i = 1; i <= prior.idx; i++) {
                set.push(argNames.filter(key => prior[key] == i).join(''));
            }
            console.log('adding set', set);
            const target = c ? finishRuns : partialRuns;
            target.push(set);
            
            if(!b) return curryMock(prior).bind(null, a);
            if(!c) return curryMock(prior).bind(null, a, b);
            
            return a + b + c;
        }
        
        testCurrying(curryMock(), [1, 2, 3], 6)();
        
        console.log(partialRuns);
        console.log(finishRuns);
    });
    
});

exports.testCurrying = testCurrying;
