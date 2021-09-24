import {
    assertEquals
} from 'https://deno.land/std@0.108.0/testing/asserts.ts'
import {
    Validation,
    ValidType,
    isAny,
    isNever,
    isString,
    isNumber,
    isBigInt,
    isBoolean,
    isSymbol,
    isNull,
    isUndefined,
    is,
    isArray_,
    isTuple_,
    isAssoc_,
    isDict_,
    isAlbum_,
    isStruct_,
    hasStruct_,
    isUnion_,
    concat,
    dev,
    ref
} from './mod.ts'
const symbolA = Symbol(0)
const symbolB = Symbol(0)
function is1_1or__1__(target: 1 | '1'): target is 1 {
    return target === 1
}
type LoopNest = { a?: LoopNest }
function isLoopNest_(): Validation<LoopNest> {
    return isStruct_({
        a: ref(isLoopNest_)
    }, ['a'])
}
const isLoopNest = isLoopNest_()
class UnextendedClass {}
class SubObject extends Object {}
class SubArray extends Array {}
const vldsExpected = {
    isString: false,
    isNumber: false,
    isBigInt: false,
    isBoolean: false,
    isSymbol: false,
    isNull: false,
    isUndefined: false,
    is__0__: false,
    is0: false,
    is0n: false,
    isFalse: false,
    isSymbolA: false,
    isEmptyArray: false,
    isStringArray: false,
    is__0__Array: false,
    is__0__Array_LEN_0: false,
    is__0__Array_LEN_1: false,
    is__0__Array_LEN_2: false,
    isEmptyTuple: false,
    isTuple_0_String: false,
    isTuple_0_String_1_String: false,
    isTuple_0___0___1___0__: false,
    isEmptyAssoc: false,
    isStringAssoc: false,
    is__0__Assoc: false,
    isEmptyDict: false,
    isStringDict: false,
    is__0__Dict: false,
    isEmptyAlbum: false,
    isStringAlbum: false,
    is__0__Album: false,
    isEmptyStruct: false,
    isStruct___a___String: false,
    isStruct___a___String___b___String: false,
    isStruct___a_____0_____b_____0__: false,
    isStruct___a_____0_____b_____0___OPT___a_____b__: false,
    isStruct___a_____0_____b_____0___OPT___b__: false,
    isStruct_SymbolA___0___SymbolB___0___OPT_SymbolB: false,
    hasEmptyStruct: false,
    hasStruct___a___String: false,
    hasStruct___a___String___b___String: false,
    hasStruct___a_____0_____b_____0__: false,
    hasStruct___a_____0_____b_____0___OPT___a_____b__: false,
    hasStruct___a_____0_____b_____0___OPT___b__: false,
    hasStruct_SymbolA___0___SymbolB___0___OPT_SymbolB: false,
    isEmptyUnion: false,
    isUnion_ptnA: false,
    isUnion_ptnB: false,
    is1: false,
    ref_is__0__: false,
    isLoopNest: false
}
function assertEqualsForValidations(target: any, expected: typeof vldsExpected) {
    assertEquals<boolean>(isAny(target), true)
    assertEquals<boolean>(isNever(target), false)
    assertEquals<boolean>(isString(target), expected.isString)
    assertEquals<boolean>(isNumber(target), expected.isNumber)
    assertEquals<boolean>(isBigInt(target), expected.isBigInt)
    assertEquals<boolean>(isBoolean(target), expected.isBoolean)
    assertEquals<boolean>(isSymbol(target), expected.isSymbol)
    assertEquals<boolean>(isNull(target), expected.isNull)
    assertEquals<boolean>(isUndefined(target), expected.isUndefined)
    assertEquals<boolean>(is('0')(target), expected.is__0__)
    assertEquals<boolean>(is(0)(target), expected.is0)
    assertEquals<boolean>(is(0n)(target), expected.is0n)
    assertEquals<boolean>(is(false)(target), expected.isFalse)
    assertEquals<boolean>(is(symbolA)(target), expected.isSymbolA)
    assertEquals<boolean>(isArray_(isNever)(target), expected.isEmptyArray)
    assertEquals<boolean>(isArray_(isString)(target), expected.isStringArray)
    assertEquals<boolean>(isArray_(is('0'))(target), expected.is__0__Array)
    assertEquals<boolean>(isArray_(is('0'), 0)(target), expected.is__0__Array_LEN_0)
    assertEquals<boolean>(isArray_(is('0'), 1)(target), expected.is__0__Array_LEN_1)
    assertEquals<boolean>(isArray_(is('0'), 2)(target), expected.is__0__Array_LEN_2)
    assertEquals<boolean>(isTuple_()(target), expected.isEmptyTuple)
    assertEquals<boolean>(isTuple_(isString)(target), expected.isTuple_0_String)
    assertEquals<boolean>(isTuple_(isString, isString)(target), expected.isTuple_0_String_1_String)
    assertEquals<boolean>(isTuple_(is('0'), is('0'))(target), expected.isTuple_0___0___1___0__)
    assertEquals<boolean>(isAssoc_(isNever)(target), expected.isEmptyAssoc)
    assertEquals<boolean>(isAssoc_(isString)(target), expected.isStringAssoc)
    assertEquals<boolean>(isAssoc_(is('0'))(target), expected.is__0__Assoc)
    assertEquals<boolean>(isDict_(isNever)(target), expected.isEmptyDict)
    assertEquals<boolean>(isDict_(isString)(target), expected.isStringDict)
    assertEquals<boolean>(isDict_(is('0'))(target), expected.is__0__Dict)
    assertEquals<boolean>(isAlbum_(isNever)(target), expected.isEmptyAlbum)
    assertEquals<boolean>(isAlbum_(isString)(target), expected.isStringAlbum)
    assertEquals<boolean>(isAlbum_(is('0'))(target), expected.is__0__Album)
    assertEquals<boolean>(isStruct_({})(target), expected.isEmptyStruct)
    assertEquals<boolean>(isStruct_({ a: isString })(target), expected.isStruct___a___String)
    assertEquals<boolean>(isStruct_({ a: isString, b: isString })(target), expected.isStruct___a___String___b___String)
    assertEquals<boolean>(isStruct_({ a: is('0'), b: is('0') })(target), expected.isStruct___a_____0_____b_____0__)
    assertEquals<boolean>(isStruct_({ a: is('0'), b: is('0') }, ['a', 'b'])(target), expected.isStruct___a_____0_____b_____0___OPT___a_____b__)
    assertEquals<boolean>(isStruct_({ a: is('0'), b: is('0') }, ['b'])(target), expected.isStruct___a_____0_____b_____0___OPT___b__)
    assertEquals<boolean>(isStruct_({ [symbolA]: is('0'), [symbolB]: is('0') }, [symbolB])(target), expected.isStruct_SymbolA___0___SymbolB___0___OPT_SymbolB)
    assertEquals<boolean>(hasStruct_({})(target), expected.hasEmptyStruct)
    assertEquals<boolean>(hasStruct_({ a: isString })(target), expected.hasStruct___a___String)
    assertEquals<boolean>(hasStruct_({ a: isString, b: isString })(target), expected.hasStruct___a___String___b___String)
    assertEquals<boolean>(hasStruct_({ a: is('0'), b: is('0') })(target), expected.hasStruct___a_____0_____b_____0__)
    assertEquals<boolean>(hasStruct_({ a: is('0'), b: is('0') }, ['a', 'b'])(target), expected.hasStruct___a_____0_____b_____0___OPT___a_____b__)
    assertEquals<boolean>(hasStruct_({ a: is('0'), b: is('0') }, ['b'])(target), expected.hasStruct___a_____0_____b_____0___OPT___b__)
    assertEquals<boolean>(hasStruct_({ [symbolA]: is('0'), [symbolB]: is('0') }, [symbolB])(target), expected.hasStruct_SymbolA___0___SymbolB___0___OPT_SymbolB)
    assertEquals<boolean>(isUnion_()(target), expected.isEmptyUnion)
    assertEquals<boolean>(isUnion_(is('0'), is(0n), is(symbolA), isUndefined, isStruct_({}))(target), expected.isUnion_ptnA)
    assertEquals<boolean>(isUnion_(is(0), is(false), isNull, isArray_(isNever))(target), expected.isUnion_ptnB)
    assertEquals<boolean>(concat(isUnion_(is(1), is('1')), is1_1or__1__)(target), expected.is1)
    assertEquals<boolean>(dev(isUnion_(is(1), is('1'))).add(is1_1or__1__).v(target), expected.is1)
    assertEquals<boolean>(ref(is, '0')(target), expected.ref_is__0__)
    assertEquals<boolean>(isLoopNest(target), expected.isLoopNest)
}
function assertEquals_Vlds(target: any, trueExpectedKeys: (keyof Parameters<typeof assertEqualsForValidations>['1'])[]) {
    const expected = { ...vldsExpected }
    for (const key of trueExpectedKeys) expected[key] = true
    assertEqualsForValidations(target, expected)
}
// Type test
let target: any
if (isAny(target)) {
    target // : any
}
if (isNever(target)) {
    target // : never
}
if (isString(target)) {
    target // : string
    target.anchor
}
if (isNumber(target)) {
    target // : number
    target.toExponential
}
if (isBoolean(target)) {
    target // : boolean
    target.valueOf
}
if (is('0')(target)) {
    target // : "0"
    target.anchor
}
if (is(0)(target)) {
    target // : 0
    target.toExponential
}
if (is(false)(target)) {
    target // : false
    target.valueOf
}
if (is(symbolA)(target)) {
    target // : typeof symbolA
    target.description
}
if (isNull(target)) {
    target // : null
}
if (isUndefined(target)) {
    target // : undefined
}
if (isArray_(is('0'))(target)) {
    target // : "0"[]
    target.pop
}
if (isArray_(is('0'), 3)(target)) {
    target // : ["0", "0", "0"]
    target.pop
}
if (isArray_(is('0'), 3 as number)(target)) {
    target // : "0"[]
    target.pop
}
if (isTuple_(is('0'), is(0))(target)) {
    target // : ["0", 0]
    target.pop
}
if (isAssoc_(is('0'))(target)) {
    target // : Assoc<"0"> = { [key: string | symbol]: "0" }
    target.a // : "0" (It may be '"0" | undefined' to be exact, but ...)
    target[symbolA] // : "0" (It may be '"0" | undefined' to be exact, but ...)
    target.valueOf // : Object.valueOf(): Object (It may be '"0" | undefined | Object.valueOf(): Object' to be exact, but ...)
}
if (isDict_(is('0'))(target)) {
    target // : Dict<"0"> = { [key: string]: "0" }
    target.a // : "0" (It may be '"0" | undefined' to be exact, but ...)
    target.valueOf // : Object.valueOf(): Object (It may be '"0" | undefined | Object.valueOf(): Object' to be exact, but ...)
}
if (isAlbum_(is('0'))(target)) {
    target // : Album<"0"> = { [key: symbol]: "0" }
    target[symbolA] // : "0" (It may be '"0" | undefined' to be exact, but ...)
    target.valueOf // : Object.valueOf(): Object
}
if (isStruct_({ a: is('0'), b: is(0) })(target)) {
    target // : { a: "0"; b: 0; }
    target.a // : "0"
    target.b // : 0
    target.valueOf // : Object.valueOf(): Object
}
if (isStruct_({ a: is('0'), b: is(0) }, ['b'])(target)) {
    target // : Optionally<{ a: "0"; b: 0; }, "b"> = { a: "0"; b?: 0 | undefined; }
    target.a // : "0"
    target.b // ?: 0 | undefined
    target.valueOf // : Object.valueOf(): Object
}
if (hasStruct_({ a: is('0'), b: is(0) })(target)) {
    target // : { a: "0"; b: 0; }
    target.a // : "0"
    target.b // : 0
    target.c // : any
    target.valueOf // : Object.valueOf(): Object (It may be 'any' to be exact, but ...)
}
if (hasStruct_({ a: is('0'), b: is(0) }, ['b'])(target)) {
    target // : Omit<{ a: "0"; b: 0; }, "b"> & Partial<Pick<{ a: "0"; b: 0; }, "b">> & Assoc<any> = Optionally<{ a: "0"; b: 0; }, "b"> &  & Assoc<any>
    target.a // : "0"
    target.b // ?: 0 | undefined
    target.c // : any
    target.valueOf // : Object.valueOf(): Object (It may be 'any' to be exact, but ...)
}
if (isUnion_(is('0'), is(0))(target)) {
    target // : 0 | "0"
}
if (concat(isString, is('0'))(target)) {
    target // : "0"
}
if (concat(isUnion_(is(1), is('1')), is1_1or__1__)(target)) {
    target // : 1
}
if (dev(isString).add(is('0')).v(target)) {
    target // : "0"
}
if (ref(is, '0')(target)) {
    target // : "0"
}
if (ref(() => is1_1or__1__)('1'/* : 1 | "1" */)) {
    target // : 1
}
type _String = ValidType<typeof isString> // : string
type _LoopNest = ValidType<typeof isLoopNest> // : { a?: LoopNest | undefined; }
Deno.test({
    name: 'Validation',
    fn() {
        assertEquals_Vlds('0', ['isString', 'is__0__', 'isUnion_ptnA', 'ref_is__0__'])
        assertEquals_Vlds('1', ['isString'])
        assertEquals_Vlds(0, ['isNumber', 'is0', 'isUnion_ptnB'])
        assertEquals_Vlds(1, ['isNumber', 'is1'])
        assertEquals_Vlds(0n, ['isBigInt', 'is0n', 'isUnion_ptnA'])
        assertEquals_Vlds(1n, ['isBigInt'])
        assertEquals_Vlds(false, ['isBoolean', 'isFalse', 'isUnion_ptnB'])
        assertEquals_Vlds(true, ['isBoolean'])
        assertEquals_Vlds(symbolA, ['isSymbol', 'isSymbolA', 'isUnion_ptnA'])
        assertEquals_Vlds(symbolB, ['isSymbol'])
        assertEquals_Vlds(null, ['isNull', 'isUnion_ptnB'])
        assertEquals_Vlds(undefined, ['isUndefined', 'isUnion_ptnA'])
        assertEquals_Vlds([], ['isEmptyArray', 'isStringArray', 'is__0__Array', 'is__0__Array_LEN_0', 'isEmptyTuple', 'isUnion_ptnB'])
        assertEquals_Vlds(['0'], ['isStringArray', 'is__0__Array', 'is__0__Array_LEN_1', 'isTuple_0_String'])
        assertEquals_Vlds(['0', '0'], ['isStringArray', 'is__0__Array', 'is__0__Array_LEN_2', 'isTuple_0_String_1_String', 'isTuple_0___0___1___0__'])
        assertEquals_Vlds(['0', '1'], ['isStringArray', 'isTuple_0_String_1_String'])
        assertEquals_Vlds({}, ['isEmptyAssoc', 'isStringAssoc', 'is__0__Assoc', 'isEmptyDict', 'isStringDict', 'is__0__Dict', 'isEmptyAlbum', 'isStringAlbum', 'is__0__Album', 'isEmptyStruct', 'isStruct___a_____0_____b_____0___OPT___a_____b__', 'hasEmptyStruct', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'isUnion_ptnA', 'isLoopNest'])
        assertEquals_Vlds({ a: '0' }, ['isStringAssoc', 'is__0__Assoc', 'isStringDict', 'is__0__Dict', 'isStruct___a___String', 'isStruct___a_____0_____b_____0___OPT___a_____b__', 'isStruct___a_____0_____b_____0___OPT___b__', 'hasEmptyStruct', 'hasStruct___a___String', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'hasStruct___a_____0_____b_____0___OPT___b__'])
        assertEquals_Vlds({ [symbolA]: '0' }, ['isStringAssoc', 'is__0__Assoc', 'isStringAlbum', 'is__0__Album', 'isStruct_SymbolA___0___SymbolB___0___OPT_SymbolB', 'hasEmptyStruct', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'hasStruct_SymbolA___0___SymbolB___0___OPT_SymbolB'])
        assertEquals_Vlds({ a: '0', b: '0' }, ['isStringAssoc', 'is__0__Assoc', 'isStringDict', 'is__0__Dict', 'isStruct___a___String___b___String', 'isStruct___a_____0_____b_____0__', 'isStruct___a_____0_____b_____0___OPT___a_____b__', 'isStruct___a_____0_____b_____0___OPT___b__', 'hasEmptyStruct', 'hasStruct___a___String', 'hasStruct___a___String___b___String', 'hasStruct___a_____0_____b_____0__', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'hasStruct___a_____0_____b_____0___OPT___b__'])
        assertEquals_Vlds({ a: '0', b: '1' }, ['isStringAssoc', 'isStringDict', 'isStruct___a___String___b___String', 'hasEmptyStruct', 'hasStruct___a___String', 'hasStruct___a___String___b___String'])
        assertEquals_Vlds({ [symbolA]: '0', [symbolB]: '0' }, ['isStringAssoc', 'is__0__Assoc', 'isStringAlbum', 'is__0__Album', 'isStruct_SymbolA___0___SymbolB___0___OPT_SymbolB', 'hasEmptyStruct', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'hasStruct_SymbolA___0___SymbolB___0___OPT_SymbolB'])
        assertEquals_Vlds({ [symbolA]: '0', [symbolB]: '1' }, ['isStringAssoc', 'isStringAlbum', 'hasEmptyStruct', 'hasStruct___a_____0_____b_____0___OPT___a_____b__'])
        assertEquals_Vlds({ a: '0', [symbolB]: '0' }, ['isStringAssoc', 'is__0__Assoc', 'hasEmptyStruct', 'hasStruct___a___String', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'hasStruct___a_____0_____b_____0___OPT___b__'])
        assertEquals_Vlds({ a: '0', [symbolB]: '1' }, ['isStringAssoc', 'hasEmptyStruct', 'hasStruct___a___String', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'hasStruct___a_____0_____b_____0___OPT___b__'])
        assertEquals_Vlds({ a: {} }, ['hasEmptyStruct', 'isLoopNest'])
        assertEquals_Vlds({ a: { a: {} } }, ['hasEmptyStruct', 'isLoopNest'])
        assertEquals_Vlds({ a: { a: undefined } }, ['hasEmptyStruct', 'isLoopNest'])
        assertEquals_Vlds({ a: { a: null } }, ['hasEmptyStruct'])
        assertEquals_Vlds({ a: { b: {} } }, ['hasEmptyStruct'])
        assertEquals_Vlds({ a: { a: {}, b: {} } }, ['hasEmptyStruct'])
        assertEquals_Vlds(new UnextendedClass, [])
        assertEquals_Vlds(new SubObject, [])
        assertEquals_Vlds(new SubArray, [])
    }
})
Deno.test({
    name: 'Validation for JSON parsed values',
    fn() {
        assertEquals_Vlds(JSON.parse('"0"'), ['isString', 'is__0__', 'isUnion_ptnA', 'ref_is__0__'])
        assertEquals_Vlds(JSON.parse('"1"'), ['isString'])
        assertEquals_Vlds(JSON.parse('0'), ['isNumber', 'is0', 'isUnion_ptnB'])
        assertEquals_Vlds(JSON.parse('1'), ['isNumber', 'is1'])
        assertEquals_Vlds(JSON.parse('false'), ['isBoolean', 'isFalse', 'isUnion_ptnB'])
        assertEquals_Vlds(JSON.parse('true'), ['isBoolean'])
        assertEquals_Vlds(JSON.parse('null'), ['isNull', 'isUnion_ptnB'])
        assertEquals_Vlds(JSON.parse('[]'), ['isEmptyArray', 'isStringArray', 'is__0__Array', 'is__0__Array_LEN_0', 'isEmptyTuple', 'isUnion_ptnB'])
        assertEquals_Vlds(JSON.parse('["0"]'), ['isStringArray', 'is__0__Array', 'is__0__Array_LEN_1', 'isTuple_0_String'])
        assertEquals_Vlds(JSON.parse('["0", "0"]'), ['isStringArray', 'is__0__Array', 'is__0__Array_LEN_2', 'isTuple_0_String_1_String', 'isTuple_0___0___1___0__'])
        assertEquals_Vlds(JSON.parse('["0", "1"]'), ['isStringArray', 'isTuple_0_String_1_String'])
        assertEquals_Vlds(JSON.parse('{}'), ['isEmptyAssoc', 'isStringAssoc', 'is__0__Assoc', 'isEmptyDict', 'isStringDict', 'is__0__Dict', 'isEmptyAlbum', 'isStringAlbum', 'is__0__Album', 'isEmptyStruct', 'isStruct___a_____0_____b_____0___OPT___a_____b__', 'hasEmptyStruct', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'isUnion_ptnA', 'isLoopNest'])
        assertEquals_Vlds(JSON.parse('{ "a": "0" }'), ['isStringAssoc', 'is__0__Assoc', 'isStringDict', 'is__0__Dict', 'isStruct___a___String', 'isStruct___a_____0_____b_____0___OPT___a_____b__', 'isStruct___a_____0_____b_____0___OPT___b__', 'hasEmptyStruct', 'hasStruct___a___String', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'hasStruct___a_____0_____b_____0___OPT___b__'])
        assertEquals_Vlds(JSON.parse('{ "a": "0", "b": "0" }'), ['isStringAssoc', 'is__0__Assoc', 'isStringDict', 'is__0__Dict', 'isStruct___a___String___b___String', 'isStruct___a_____0_____b_____0__', 'isStruct___a_____0_____b_____0___OPT___a_____b__', 'isStruct___a_____0_____b_____0___OPT___b__', 'hasEmptyStruct', 'hasStruct___a___String', 'hasStruct___a___String___b___String', 'hasStruct___a_____0_____b_____0__', 'hasStruct___a_____0_____b_____0___OPT___a_____b__', 'hasStruct___a_____0_____b_____0___OPT___b__'])
        assertEquals_Vlds(JSON.parse('{ "a": "0", "b": "1" }'), ['isStringAssoc', 'isStringDict', 'isStruct___a___String___b___String', 'hasEmptyStruct', 'hasStruct___a___String', 'hasStruct___a___String___b___String'])
        assertEquals_Vlds(JSON.parse('{ "a": {} }'), ['hasEmptyStruct', 'isLoopNest'])
        assertEquals_Vlds(JSON.parse('{ "a": { "a": {} } }'), ['hasEmptyStruct', 'isLoopNest'])
        assertEquals_Vlds(JSON.parse('{ "a": { "a": null } }'), ['hasEmptyStruct'])
        assertEquals_Vlds(JSON.parse('{ "a": { "b": {} } }'), ['hasEmptyStruct'])
        assertEquals_Vlds(JSON.parse('{ "a": { "a": {}, "b": {} } }'), ['hasEmptyStruct'])
    }
})
