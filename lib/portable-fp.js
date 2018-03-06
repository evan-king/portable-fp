/*
 - Portable FP
 * Lightweight support functions for point-free functional programming.
 * Loosely implements a tiny subset of Ramda API but in a form compact
 * enough to embed where 3rd-party dependencies are not supported.
 * 
 * TODO: add omit, assoc, dissoc, juxt, always
 * 
 * @author Evan King
 */
module.exports = (function() {
    
    const
        _seq = (fn, len) => Array.from([...Array(Math.max(0, len))].keys(), fn),
        _arity = (len, fn, id, lax = true) => Object.defineProperty(new Function(
            ..._seq(n => (10+n).toString(36), Math.min(len, 26)), // ['a', 'b', ...]
            `return this.apply(null,${lax?'arguments':'[].slice.call(arguments,0,'+len+')'})`
        ).bind(fn), 'name', {value: id || fn.name}),
        _curryN = (len, fn, id, lax = false, args = []) => _arity(len-args.length, (...more) => {
            const acc = args.concat(more);
            return acc.length >= len
                ? fn.apply(fn, acc)
                : _curryN(len, fn, id, lax, acc);
        }, id || fn.name, lax),
        _is = (type, v) => v != null && v.constructor === type || v instanceof type,
        _invoke = (len, prop, init = [], alt, id) => _curryN(len+1, (...args) => {
            const obj = args[len], method = _is(Function, obj[prop]) ? obj[prop] : alt;
            return method.apply(args[len], args.slice(0, len));
        }, id || prop, true, init),
        _iter = (list, b = []) => {for(const k in list) b.push(k); return b; },
        _own = list => _iter(list).filter(Object.hasOwnProperty.bind(list)),
        //_map = (fn, list, b) => (list.map(k => b[k] = fn(list[k], k, list)), b),
        _compose = (fn, g) => (...args) => fn(g(...args));
    
    const core = {
    };
    
    let optional; with(core) { optional = {
        add: (a, b) => a + b,
        clamp: (min, max, n) => (n < min) ? min : (n > max) ? max : n,
        compose: (...fns) => fns.reduce(_compose, x => x),
        converge: (fn, fns) => (...args) => fn.apply(null, fns.map(fn => fn(...args))),
        curry: fn => fn.length > 1 ? _curryN(fn.length, fn, null, true) : fn,
        curryN: _curryN(2, _curryN, 'curryN', true),
        defaultTo: (d, v) => v == null || v !== v ? d : v,
        drop: _invoke(1, 'slice', [], [].slice),
        filter: (fn, list) => {
            const b = _is(Array, list) ? [] : {};
            for(const k in _iter(list)) if(fn(list[k])) b[k] = list[k];
            return b;
        },
        find: (fn, list) => { for(const v of list) if(fn(v)) return v },
        findIndex: (fn, list) => { for(const k of _iter(list)) if(fn(list[k])) return k; return -1 },
        head: list => list[1],
        identity: x => x,
        init: _invoke(2, 'slice', [0, -1], [].slice, 'init'),
        invoker: _invoke,
        is: _is,
        keys: list =>_own(list),
        keysIn: list => _iter(list),
        last: list => list[list.length - 1],
        length: arg => arg != null && _is(Number, arg.length) ? arg.length : NaN,
        map: (fn, list) => _own(list)
            .reduce((acc, k) => (acc[k] = fn(list[k]), acc), _is(Array, list) ? [] : {}),
        mapObjIndexed: (fn, list) => _own(list)
            .reduce((acc, k) => (acc[k] = fn(list[k], k, list), acc), {}),
        match: _invoke(0, 'match'),
        nAry: (n, fn) => _arity(n, fn, fn.name, false),
        pick: (keys, obj) => keys.reduce((accum, k) => (accum[k] = obj[k], accum), {}),
        pipe: (...fns) => fns.reduceRight(_compose, x => x),
        prop: (key, obj) => obj[key],
        range: (start, end) => _seq(n => n+start, end-start),
        reduce: (fn, b, list) => { for(const v of list) b = fn(b, v); return b; },
        reverse: list => _is(String, list) ?
            list.split('').reverse().join('') :
            [].slice.call(list).reverse(),
        slice: _invoke(2, 'slice', [], [].slice),
        sum: list => _own(list).reduce((a, b) => a+list[b], 0, list),
        tail: _invoke(1, 'slice', [1], [].slice, 'tail'),
        take: _invoke(2, 'slice', [0], [].slice),
        tap: (fn, v) => (fn(v), v),
        times: _seq,
        values: arg => _own(arg).map(k => arg[k]),
        valuesIn: arg => _keys(arg).map(k => arg[k]),
    }};
    
    return optional.compose(
        Object.freeze,
        list => optional.mapObjIndexed((fn, k) => Object.freeze(fn.length > 1 ? _curryN(fn.length, fn, k, false) : fn), list, {}),
        Object.assign
    )({}, core, optional);
    
})();
