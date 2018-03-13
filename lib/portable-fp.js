/*
 - Portable FP
 * Lightweight support functions for point-free functional programming.
 * Loosely implements a tiny subset of Ramda API but in a form compact
 * enough to embed where 3rd-party dependencies are not supported.
 * 
 * TODO: add not, complement, omit, assoc, dissoc, juxt, difference, union
 * 
 * @license MIT
 * @author Evan King
 */
(function(root, factory) {
    if(typeof define == 'function' && define.amd) define('portable-fp', [], factory);
    else if(typeof module == 'object' && module.exports) module.exports = factory();
    else root.portableFP = factory();
}(typeof self == 'undefined' ? this : self, function() {
    
    const
        _seq = (fn, len) => Array.from([...Array(Math.max(0, len))].keys(), fn),
        _arity = (len, fn, id, lax) => Object.defineProperty(new Function(
            ..._seq(n => (10+n).toString(36), Math.min(len, 26)), // ['a', 'b', ...]
            `return this.apply(null,${lax?'arguments':'[].slice.call(arguments,0,'+len+')'})`
        ).bind(fn), 'name', {value: id || fn.name}),
        _curryN = (len, fn, id, lax = false, args = []) => _arity(len-args.length, (...more) => {
            const acc = args.concat(more);
            return acc.length >= len
                ? fn.apply(fn, acc)
                : _curryN(len, fn, id, lax, acc);
        }, id || fn.name, lax),
        _is = (t, v) => v != null && v.constructor === t || v instanceof t,
        _prop = (name, v, t, def) => v != null && (!t || _is(t, v[name])) ? v[name] : def,
        _isObject = arg => Object.prototype.toString.call(arg) === '[object Object]',
        _invoke = (len, name, init = [], alt, id) => _curryN(len+1, (...args) => {
            return _prop(name, args[len], Function, alt).apply(args[len], args.slice(0, len));
        }, id || name, true, init),
        _value = a => _prop('valueOf', a, Function) ? a.valueOf() : a,
        _has = arg => Object.hasOwnProperty.bind(arg),
        _keys = (list, own = true, b = []) => {
            for(const k in list) b.push(k);
            return own ? b.filter(_has(list)) : b;
        },
        _ak = (src, fn = x => x) => (a, k) => (a[k] = fn(src[k], k, src), a),
        _ai = (src, fn = x => x) => (a, k) => (a[a.length] = fn(src[k], k, src), a),
        _map = (fn, src, b = {}, acc = _ak) => _keys(src).reduce(acc(src, fn), b),
        _filter = (fn, src) => _keys(src).filter(k => fn(src[k]))
            .reduce((_isObject(src) ? _ak : _ai)(src), _isObject(src) ? {} : []),
        _compose = (fn, g) => (...args) => fn(g(...args)),
        _contains = (v, arg) => _is(String, arg)
            ? arg.includes(v)
            : _keys(arg).findIndex(x => _eq(arg[x], v)) > -1,
        _def = (def, arg) => arg == null || arg !== arg ? def : arg,
        _eq = (a, b) => _value(a) === _value(b) || (a != a && b != b)
        _frz = Object.freeze;
    
    return _frz(_map((fn, k) => _frz(fn.length > 1 ? _curryN(fn.length, fn, k) : fn), {
        add: (a, b) => Number(a) + Number(b),
        always: arg => () => arg,
        clamp: (min, max, n) => (n < min) ? min : (n > max) ? max : n,
        compose: (...fns) => fns.reduce(_compose, x => x),
        contains: _contains,
        converge: (fn, fns) => (...args) => fn.apply(null, fns.map(fn => fn(...args))),
        curry: fn => fn.length > 1 ? _curryN(fn.length, fn, null, true) : fn,
        curryN: _curryN(2, _curryN, 'curryN', true),
        defaultTo: _def,
        drop: _invoke(1, 'slice', [], [].slice),
        equals: _eq,
        filter: (fn, list) => _prop('filter', list, Function, _filter).call(list, fn, list),
        find: (fn, list) => _prop(_keys(list).find(k => fn(list[k])), list),
        findIndex: (fn, list) => _def(-1, _keys(list).find(k => fn(list[k]))),
        head: list => list[1],
        identity: x => x,
        init: _invoke(2, 'slice', [0, -1], [].slice, 'init'),
        invoker: _invoke,
        is: _is,
        keys: arg => _keys(arg),
        keysIn: arg => _keys(arg, false),
        last: list => list[list.length - 1],
        length: arg => _prop('length', arg, Number, NaN),
        map: (fn, list) => _map(_arity(1, fn), list, _isObject(list) ? {} : []),
        mapObjIndexed: (fn, list) => _map(fn, list),
        match: _invoke(0, 'match'),
        nAry: (n, fn) => _arity(n, fn),
        pick: (keys, obj) => keys.reduce((accum, k) => (accum[k] = obj[k], accum), {}),
        pipe: (...fns) => fns.reduceRight(_compose, x => x),
        prop: _prop,
        range: (start, end) => _seq(n => n+start, end-start),
        reduce: (fn, b, list) => { for(const v of list) b = fn(b, v); return b; },
        reverse: list => _is(String, list) ?
            list.split('').reverse().join('') :
            [].slice.call(list).reverse(),
        slice: _invoke(2, 'slice', [], [].slice),
        sum: list => _keys(list).reduce((a, b) => Number(a) + Number(list[b]), 0, list),
        tail: _invoke(1, 'slice', [1], [].slice, 'tail'),
        take: _invoke(2, 'slice', [0], [].slice),
        tap: (fn, v) => (fn(v), v),
        times: _seq,
        uniq: list => _keys(list).map(k => list[k])
            .reduce((a, b) => _contains(b, a) ? a : a.concat([b]), []),
        values: arg => _keys(arg).map(k => arg[k]),
        valuesIn: arg => _keys(arg, false).map(k => arg[k]),
    }));
    
}));
