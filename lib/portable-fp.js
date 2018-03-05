/*
 - Portable FP
 * Lightweight support functions for point-free functional programming.
 * Loosely implements a tiny subset of Ramda API but in a form compact
 * enough to embed where 3rd-party dependencies are not supported.
 * 
 * TODO: add omit, assoc, dissoc, length
 * 
 * @author Evan King
 */
module.exports = (function() {
    
    const
        _seq = (len, fn = x=>x) => Array.from([...Array(len)].keys(), fn),
        
        
        //_arity = (len, fn, id, lax = true) => {
        //   const
        //       params = _seq(len, n => (10+n).toString(36)), // ['a', 'b', ...]
        //       args = lax ? `arguments` : `[].slice.call(arguments, 0, ${len})`,
        //       newFn = new Function(...params, `return this.apply(null, ${args})`).bind(fn);
        //   return Object.defineProperty(newFn, 'name', {value: id || fn.name});
        //},
        
        
        //_cut = (id, len) => len < 0 ? id : `[].slice.call(${id}, 0, ${len})`,
            //`return this.apply(null, ${_cut('arguments', lax ? len : -1)})`
            //`return this.apply(null,[].slice.call(arguments${lax?',0,'+len:''}))`
            //`return this.apply(null,[].slice.call(arguments,0,${lax?'Infinity':len}))`
        
        _arity = (len, fn, id, lax = true) => Object.defineProperty(new Function(
            ..._seq(len, n => (10+n).toString(36)), // ['a', 'b', ...]
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
            //console.log('_invoke', len, prop, init, alt, id);
            const obj = args[len], method = _is(Function, obj[prop]) ? obj[prop] : alt;
            return method.apply(args[len], args.slice(0, len));
        }, id || prop, true, init),
        _map = (fn, list, b) => { for(const k in list) b[k] = fn(list[k], k, list); return b; },
        _compose = (fn, g) => (...args) => fn(g(...args)),
        
        done = null;
    
    const core = {
        identity: x => x,
        is: _is,
        keys: arg => _is(Function, arg.keys)
            ? Array.from(arg.keys()).filter(arg.hasOwnProperty.bind(arg)).map(k => k.toString())
            : Object.keys(arg),
        reduce: (fn, b, list) => { for(const v of list) b = fn(b, v); return b; },
    };
    
    let optional; with(core) { optional = {
        filter: (fn, list) => {
            const b = _is(Array, list) ? [] : {};
            for(const k of keys(list)) if(fn(list[k])) b[k] = list[k];
            return b;
        },
        defaultTo: (d, v) => v == null || v !== v ? d : v,
        tap: (fn, v) => (fn(v), v),
        range: (start, end) => _seq(end-start, n => n+start),
        find: (fn, list) => { for(const v of list) if(fn(v)) return v },
        findIndex: (fn, list) => { for(const k of keys(list)) if(fn(list[k])) return k; return -1 },
        invoker: _invoke,
        nAry: (n, fn) => _arity(n, fn, fn.name, false),
        curryN: _curryN(2, _curryN, 'curryN', true),
        curry: fn => fn.length > 1 ? _curryN(fn.length, fn, null, true) : fn,
        map: (fn, list) => _map(v => fn(v), list, _is(Array, list) ? [] : {}),
        mapObjIndexed: (fn, list) => _map(fn, list, {}),
        values: arg => keys(arg).map(k => arg[k]),
        add: (a, b) => a + b,
        prop: (key, obj) => obj[key],
        times: (fn, count) => _seq(count, fn),
        sum: list => reduce((a, b) => a+b, 0, list),
        match: _invoke(0, 'match'),
        length: obj => Number(obj.length),
        drop: _invoke(1, 'slice', [], [].slice),
        //drop: (start, list) => list.slice(start),
        take: _invoke(2, 'slice', [0], [].slice),
        head: list => list[1],
        slice: _invoke(2, 'slice', [], [].slice),
        tail: _invoke(1, 'slice', [1], [].slice, 'tail'),
        last: list => list[list.length - 1],
        init: _invoke(0, 'slice', [0, -1], [].slice, 'init'),
        // init: list => Array.prototype.slice.call(list, 0, -1),
        clamp: (min, max, n) => (n < min) ? min : (n > max) ? max : n,
        compose: (...fns) => fns.reduce(_compose, x => x),
        pipe: (...fns) => fns.reduceRight(_compose, x => x),
        converge: (fn, fns, arg) => fn.apply(null, fns.map(fn => fn(arg))),
        pick: (keys, obj) => keys.reduce((accum, k) => (accum[k] = obj[k], accum), {}),
        
        // off-Ramda-spec extras
        debug: v => (console.log(v), v),
        bind: (fn, ...args) => fn.bind.apply(fn, [null].concat(args)),
        apply: (fn, args) => fn.apply(fn, args),
        fail: msg => { throw new Error(msg); },
    }};
    
    return optional.compose(
        Object.freeze,
        list => _map((fn, k) => Object.freeze(fn.length > 1 ? _curryN(fn.length, fn, k, false) : fn), list, {}),
        Object.assign
    )({}, core, optional);
    
})();
