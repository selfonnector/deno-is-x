# Deno is_x module

[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/is_x)

This module provides some basic utilities for creating or utilizing type-guarded validation.

## Requirement

- Deno v1.14.0+

## Usage

The validation in this module is specifically the following `Vld` type function.

### Types

- `Vld` - A functional type that takes `tgt` and returns a boolean. If `tgt` is valid, return true.
- `TgVld` - A functional type that takes `tgt` and returns a boolean. If `tgt` is valid, return true to **perform typeguard**.
- `TgtType` - The type of `tgt` in `Vld`.
- `OkType` - The type of type guard for `tgt` in `TgVld`, or the type of `tgt` in `Vld`.

### Functions

- `isAny()` - A `TgVld` that always returns true.
- `isNever()` - A `TgVld` that always returns false.
- `isString()` - A `TgVld` that returns true if the `tgt` is a string.
- `isNumber()` - A `TgVld` that returns true if the `tgt` is a number.
- `isInt()` - A `TgVld` that returns true if the `tgt` is an integer.
- `isBigInt()` - A `TgVld` that returns true if the `tgt` is a bigint.
- `isBoolean()` - A `TgVld` that returns true if the `tgt` is a boolean.
- `isSymbol()` - A `TgVld` that returns true if the `tgt` is a symbol.
- `isNull()` - A `TgVld` that returns true if the `tgt` is a null.
- `isUndefined()` - A `TgVld` that returns true if the `tgt` is a undefined.
- `eq()` - Takes `base` and returns `TgVld`. That `TgVld` returns true if `tgt` is equal to `base`.
- `gt()` - Takes `base` and returns `TgVld`. That `TgVld` returns true if `tgt` is greater than `base`.
- `lt()` - Takes `base` and returns `TgVld`. That `TgVld` returns true if `tgt` is less than `base`.
- `ge()` - Takes `base` and returns `TgVld`. That `TgVld` returns true if `tgt` is greater than or equal to `base`.
- `le()` - Takes `base` and returns `TgVld`. That `TgVld` returns true if `tgt` is less than or equal to `base`.
- `len()` - Takes `vld` and returns `TgVld`. That `TgVld` returns true if the value of the `length` property of `tgt` is valid for `vld`.
- `array()` - Takes `elemVld` and the optional `lenVld` and returns `TgVld`. That `TgVld` returns true if `tgt` is a plain array, all elements are valid for `elemVld`, and the value of the `length` property is valid for `lenVld`.
- `tuple()` - Takes `elemVlds` and returns `TgVld`. That `TgVld` returns true if `tgt` is a plain array and each element is valid for each element of `elemVlds`.
- `assoc()` - Takes `elemVld` and returns `TgVld`. That `TgVld` returns true if `tgt` is a plain object and the values of all the properties it owns are valid for `elemVld`.
- `dict()` - Takes `elemVld` and returns `TgVld`. That `TgVld` returns true if `tgt` is a plain object, the keys of all the properties it owns are **strings**, and the values of those properties are valid for `elemVld`.
- `album()` - Takes `elemVld` and returns `TgVld`. That `TgVld` returns true if `tgt` is a plain object, the keys of all the properties it owns are **symbols**, and the values of those properties are valid for `elemVld`.
- `interf()` - Takes `vldSchema` and the optional `optionalKeys` and returns `TgVld`. That `TgVld` returns true if `tgt` is a plain object, and each property it owns is valid for each property owned by `vldSchema`. Also, for a property that has a key in `optionalKeys`, it is valid even if the key does not exist or the value is undefined.
- `struct()` - Takes `vldSchema` and the optional `optionalKeys` and returns `TgVld`. That `TgVld` returns true if `tgt` is a plain object, and each property it owns is valid for each property owned by `vldSchema`, and **it owns only properties owned by `vldSchema`**. Also, for a property that has a key in `optionalKeys`, it is valid even if the key does not exist or the value is undefined.
- `extend()` - Takes `vlds` and returns `Vld`. That `Vld` returns true if `tgt` is valid for all elements of `vlds`.
- `union()` - Takes `vlds` and returns `Vld`. That `Vld` returns true if `tgt` is valid for any element of `vlds`.
- `lazy()` - Takes `vldGet` and `args` and returns `Vld`. That `Vld` returns true if `tgt` is valid for the return value of passing all the elements of `args` to `vldGet`.

### Examples

Basic:

```ts
import { isString, eq, tuple, struct, union }
from 'https://deno.land/x/is_x/mod.ts'

const isResult = union(
    struct({
        kind: eq('ok'),
        data: tuple(isString, isString)
    }),
    struct({
        kind: eq('ng'),
        message: isString
    }, ['message'])
)

const tgt = JSON.parse('{ "kind": "ok", "data": ["a", "b"] }')
if (isResult(tgt)) {
    // Guard the type of tgt
}
```

Extend:

```ts
import { isString, extend }
from 'https://deno.land/x/is_x/mod.ts'

function isURLFmt<T extends string>(tgt: T): tgt is T {
    // ...
    return true
}
const isURL = extend(isString, isURLFmt)

const tgt = JSON.parse('"https://deno.land/x/is_x"')
if (isURL(tgt)) {
    // Guard the type of tgt
}
```

Recursive:

```ts
import { Vld, struct, lazy }
from 'https://deno.land/x/is_x/mod.ts'

type LoopNest = { a?: LoopNest }
function loopNest(): Vld<unknown, LoopNest> {
    return struct({
        a: lazy(loopNest)
    }, ['a'])
}
const isLoopNest = loopNest()

const tgt = JSON.parse('{ "a": { "a": {} } }')
if (isLoopNest(tgt)) {
    // Guard the type of tgt
}
```
