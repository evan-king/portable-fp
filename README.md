
# portable-fp

[![version][version-img]][version-url]
[![npm][npmjs-img]][npmjs-url]
[![build status][travis-img]][travis-url]
[![Coveralls][coveralls-img]][coveralls-url]
[![deps status][daviddm-img]][daviddm-url]
[![mit license][license-img]][license-url]

Portable-FP is a compact, tested implementation of many common functional programming
support methods, acting as lightweight stand-in for a real FP utility library.

## Purpose

If you like tacit programming and want a good support library for it, I recommend
[Ramda](https://ramdajs.com).  This is the library whose API portable-fp follows.
Portable-FP's only objective is to offer a lightweight stand-in replacement when
for any reason Ramda itself cannot be used or is too large a dependency for how
much it would be used.

Ramda offers a fully featured API for writing and composing pure functions, preserving
immutability, and escaping procedural flow control.  It is widely supported, well
tested, and performant.  Portable-FP offers a collection of much more compact "good
enough" implementations for the highest value subset of Ramda's API.

In essence, Portable-FP should be seen not as an alternative to Ramda, but to hunting
the web for code-golfed implementations of the utility functions commonly used in
functional or tacit programming.  Portable-FP is the happy medium that still weighs
in at minimal size while remaining readable enough to cherry-pick down even smaller,
and adequately covered by minimal-dependency test code which can accompany embedded
use.

|     | Ramda | Portable-FP | Some gist of a single function |
| --- | --- | --- | --- |
| **Size** | ~270kb, ~45kb minified | ~6kb, ~3kb minified | ~100 bytes |
| **Curried** | :heavy_check_mark: | :heavy_check_mark: | :x: |
| **Robust API** | :heavy_check_mark: |  -  | :x: |
| **Optimal Performance** | :x: | :x: | :x: |
| **Immutable Behavior** | :heavy_check_mark: | :heavy_check_mark: |  -  |
| **Cross-Platform Tested** | :heavy_check_mark: |  -  | :x: |
| **ES5 Environment Support** | :heavy_check_mark: | :x: |  -  |

## Basic Usage

You *can* install portable-fp via npm: `npm install --save portable-fp`.  However,
the intended use case is for scenarios where installing dependencies is disallowed,
unsupported, or otherwise overkill.  Examples would include sandbox testing from
a browser console, applying FP approaches in systems with little or no support
for pulling in 3rd-party code, or publishing small packages with minimal dependency
footprint.

As alternative to usage as a dependency, the content of `lib/portable-fp.js` can
be copy-pasted directly into the project.  That code returns an object containing
the implementations of all supported API methods.  There are no interdependencies
so any unused API methods can be removed, along with any internal methods unneeded
by the remainder.

## Documentation

Portable-FP is not itself externally documented.  It does however stick closely
with Ramda's [API specification](http://ramdajs.com/docs) (that library you should
probably be using instead of this one).  Details of the subset currently implemented
in portable-fp, along with indication on any notable behavioral divergence, can
be seen in [Travis's test output][travis-url].

An API summary (list of signatures for implemented functions) will be included here
after such list stabilizes and is fully tested.


[version-url]: https://github.com/evan-king/portable-fp/releases
[version-img]: https://img.shields.io/github/tag/evan-king/portable-fp.svg?style=flat

[npmjs-url]: https://www.npmjs.com/package/portable-fp
[npmjs-img]: https://img.shields.io/npm/v/portable-fp.svg?style=flat

[coveralls-url]: https://coveralls.io/r/evan-king/portable-fp?branch=master
[coveralls-img]: https://img.shields.io/coveralls/evan-king/portable-fp.svg?style=flat

[license-url]: https://github.com/evan-king/portable-fp/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/evan-king/portable-fp
[travis-img]: https://img.shields.io/travis/evan-king/portable-fp.svg?style=flat

[daviddm-url]: https://david-dm.org/evan-king/portable-fp
[daviddm-img]: https://img.shields.io/david/evan-king/portable-fp.svg?style=flat
