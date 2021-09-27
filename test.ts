import {
    assertEquals
} from 'https://deno.land/std@0.108.0/testing/asserts.ts'
import {
    Validation,
    TargetType,
    ValidType,
    extend,
    join,
    ref,
    isUnknown,
    isNever,
    isString,
    isNumber,
    isInt,
    isBigInt,
    isBoolean,
    isSymbol,
    isNull,
    isUndefined,
    eq,
    gt,
    lt,
    ge,
    le,
    len,
    isArray_,
    isTuple_,
    isAssoc_,
    isDict_,
    isAlbum_,
    isStruct_,
    hasStruct_
} from './mod.ts'
const symbolA = Symbol(0)
const symbolB = Symbol(0)
function is1_1or__1__(target: 1 | '1'): target is 1 {
    return target === 1
}
type LoopNest = { a?: LoopNest }
function isLoopNest_(): Validation<unknown, LoopNest> {
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
function assertEqualsForValidations(target: unknown, expected: typeof vldsExpected) {
    assertEquals<boolean>(isUnknown(target), true)
    assertEquals<boolean>(isNever(target), false)
    assertEquals<boolean>(isString(target), expected.isString)
    assertEquals<boolean>(isNumber(target), expected.isNumber)
    assertEquals<boolean>(isBigInt(target), expected.isBigInt)
    assertEquals<boolean>(isBoolean(target), expected.isBoolean)
    assertEquals<boolean>(isSymbol(target), expected.isSymbol)
    assertEquals<boolean>(isNull(target), expected.isNull)
    assertEquals<boolean>(isUndefined(target), expected.isUndefined)
    assertEquals<boolean>(eq('0')(target), expected.is__0__)
    assertEquals<boolean>(eq(0)(target), expected.is0)
    assertEquals<boolean>(eq(0n)(target), expected.is0n)
    assertEquals<boolean>(eq(false)(target), expected.isFalse)
    assertEquals<boolean>(eq(symbolA)(target), expected.isSymbolA)
    assertEquals<boolean>(isArray_(isNever)(target), expected.isEmptyArray)
    assertEquals<boolean>(isArray_(isString)(target), expected.isStringArray)
    assertEquals<boolean>(isArray_(eq('0'))(target), expected.is__0__Array)
    assertEquals<boolean>(isArray_(eq('0'), 0)(target), expected.is__0__Array_LEN_0)
    assertEquals<boolean>(isArray_(eq('0'), 1)(target), expected.is__0__Array_LEN_1)
    assertEquals<boolean>(isArray_(eq('0'), 2)(target), expected.is__0__Array_LEN_2)
    assertEquals<boolean>(isTuple_()(target), expected.isEmptyTuple)
    assertEquals<boolean>(isTuple_(isString)(target), expected.isTuple_0_String)
    assertEquals<boolean>(isTuple_(isString, isString)(target), expected.isTuple_0_String_1_String)
    assertEquals<boolean>(isTuple_(eq('0'), eq('0'))(target), expected.isTuple_0___0___1___0__)
    assertEquals<boolean>(isAssoc_(isNever)(target), expected.isEmptyAssoc)
    assertEquals<boolean>(isAssoc_(isString)(target), expected.isStringAssoc)
    assertEquals<boolean>(isAssoc_(eq('0'))(target), expected.is__0__Assoc)
    assertEquals<boolean>(isDict_(isNever)(target), expected.isEmptyDict)
    assertEquals<boolean>(isDict_(isString)(target), expected.isStringDict)
    assertEquals<boolean>(isDict_(eq('0'))(target), expected.is__0__Dict)
    assertEquals<boolean>(isAlbum_(isNever)(target), expected.isEmptyAlbum)
    assertEquals<boolean>(isAlbum_(isString)(target), expected.isStringAlbum)
    assertEquals<boolean>(isAlbum_(eq('0'))(target), expected.is__0__Album)
    assertEquals<boolean>(isStruct_({})(target), expected.isEmptyStruct)
    assertEquals<boolean>(isStruct_({ a: isString })(target), expected.isStruct___a___String)
    assertEquals<boolean>(isStruct_({ a: isString, b: isString })(target), expected.isStruct___a___String___b___String)
    assertEquals<boolean>(isStruct_({ a: eq('0'), b: eq('0') })(target), expected.isStruct___a_____0_____b_____0__)
    assertEquals<boolean>(isStruct_({ a: eq('0'), b: eq('0') }, ['a', 'b'])(target), expected.isStruct___a_____0_____b_____0___OPT___a_____b__)
    assertEquals<boolean>(isStruct_({ a: eq('0'), b: eq('0') }, ['b'])(target), expected.isStruct___a_____0_____b_____0___OPT___b__)
    assertEquals<boolean>(isStruct_({ [symbolA]: eq('0'), [symbolB]: eq('0') }, [symbolB])(target), expected.isStruct_SymbolA___0___SymbolB___0___OPT_SymbolB)
    assertEquals<boolean>(hasStruct_({})(target), expected.hasEmptyStruct)
    assertEquals<boolean>(hasStruct_({ a: isString })(target), expected.hasStruct___a___String)
    assertEquals<boolean>(hasStruct_({ a: isString, b: isString })(target), expected.hasStruct___a___String___b___String)
    assertEquals<boolean>(hasStruct_({ a: eq('0'), b: eq('0') })(target), expected.hasStruct___a_____0_____b_____0__)
    assertEquals<boolean>(hasStruct_({ a: eq('0'), b: eq('0') }, ['a', 'b'])(target), expected.hasStruct___a_____0_____b_____0___OPT___a_____b__)
    assertEquals<boolean>(hasStruct_({ a: eq('0'), b: eq('0') }, ['b'])(target), expected.hasStruct___a_____0_____b_____0___OPT___b__)
    assertEquals<boolean>(hasStruct_({ [symbolA]: eq('0'), [symbolB]: eq('0') }, [symbolB])(target), expected.hasStruct_SymbolA___0___SymbolB___0___OPT_SymbolB)
    assertEquals<boolean>(join(isNever, isNever)(target), expected.isEmptyUnion)
    assertEquals<boolean>(join(eq('0')).or(eq(0n)).or(eq(symbolA)).or(isUndefined).or(isStruct_({})).x(target), expected.isUnion_ptnA)
    assertEquals<boolean>(join(eq(0)).or(eq(false)).or(isNull).or(isArray_(isNever)).x(target), expected.isUnion_ptnB)
    assertEquals<boolean>(extend(join(eq(1), eq('1'))).and(is1_1or__1__).x(target), expected.is1)
    assertEquals<boolean>(extend(join(eq(1), eq('1')), is1_1or__1__)(target), expected.is1)
    assertEquals<boolean>(join(eq('0')).or(eq(0n)).or(eq(symbolA)).or(isUndefined).or(isStruct_({})).x(target), expected.isUnion_ptnA)
    assertEquals<boolean>(join(join(join(join(eq('0'), eq(0n)), eq(symbolA)), isUndefined), isStruct_({}))(target), expected.isUnion_ptnA)
    assertEquals<boolean>(ref(eq, '0')(target), expected.ref_is__0__)
    assertEquals<boolean>(isLoopNest(target), expected.isLoopNest)
}
function assertEquals_Vlds(target: unknown, trueExpectedKeys: (keyof Parameters<typeof assertEqualsForValidations>['1'])[]) {
    const expected = { ...vldsExpected }
    for (const key of trueExpectedKeys) expected[key] = true
    assertEqualsForValidations(target, expected)
}
// Type test
let target: unknown
if (isUnknown(target)) {
    target // : unknown
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
if (eq('0')(target)) {
    target // : "0"
    target.anchor
}
if (eq(0)(target)) {
    target // : 0
    target.toExponential
}
if (eq(false)(target)) {
    target // : false
    target.valueOf
}
if (eq(symbolA)(target)) {
    target // : typeof symbolA
    target.description
}
if (isNull(target)) {
    target // : null
}
if (isUndefined(target)) {
    target // : undefined
}
if (isArray_(eq('0'))(target)) {
    target // : "0"[]
    target.pop
}
if (isArray_(eq('0'), 3)(target)) {
    target // : ["0", "0", "0"]
    target.pop
}
if (isArray_(eq('0'), 3 as number)(target)) {
    target // : "0"[]
    target.pop
}
if (isTuple_(eq('0'), eq(0))(target)) {
    target // : ["0", 0]
    target.pop
}
if (isAssoc_(eq('0'))(target)) {
    target // : Assoc<"0"> = { [key: string | symbol]: "0" }
    target.a // : "0" (It may be '"0" | undefined' to be exact, but ...)
    target[symbolA] // : "0" (It may be '"0" | undefined' to be exact, but ...)
    target.valueOf // : Object.valueOf(): Object (It may be '"0" | undefined | Object.valueOf(): Object' to be exact, but ...)
}
if (isDict_(eq('0'))(target)) {
    target // : Dict<"0"> = { [key: string]: "0" }
    target.a // : "0" (It may be '"0" | undefined' to be exact, but ...)
    target.valueOf // : Object.valueOf(): Object (It may be '"0" | undefined | Object.valueOf(): Object' to be exact, but ...)
}
if (isAlbum_(eq('0'))(target)) {
    target // : Album<"0"> = { [key: symbol]: "0" }
    target[symbolA] // : "0" (It may be '"0" | undefined' to be exact, but ...)
    target.valueOf // : Object.valueOf(): Object
}
if (isStruct_({ a: eq('0'), b: eq(0) })(target)) {
    target // : { a: "0"; b: 0; }
    target.a // : "0"
    target.b // : 0
    target.valueOf // : Object.valueOf(): Object
}
if (isStruct_({ a: eq('0'), b: eq(0) }, ['b'])(target)) {
    target // : Optionally<{ a: "0"; b: 0; }, "b"> = { a: "0"; b?: 0 | undefined; }
    target.a // : "0"
    target.b // ?: 0 | undefined
    target.valueOf // : Object.valueOf(): Object
}
if (hasStruct_({ a: eq('0'), b: eq(0) })(target)) {
    target // : { a: "0"; b: 0; }
    target.a // : "0"
    target.b // : 0
    target.c // : unknown
    target.valueOf // : Object.valueOf(): Object (It may be 'unknown' to be exact, but ...)
}
if (hasStruct_({ a: eq('0'), b: eq(0) }, ['b'])(target)) {
    target // : Omit<{ a: "0"; b: 0; }, "b"> & Partial<Pick<{ a: "0"; b: 0; }, "b">> & Assoc<unknown> = Optionally<{ a: "0"; b: 0; }, "b"> &  & Assoc<unknown>
    target.a // : "0"
    target.b // ?: 0 | undefined
    target.c // : unknown
    target.valueOf // : Object.valueOf(): Object (It may be 'unknown' to be exact, but ...)
}
if (join(eq('0'), eq(0))(target)) {
    target // : 0 | "0"
}
let target2 = 1 as 1 | '1'
if (extend(isString, eq('0'))(target)) {
    target // : "0"
}
if (extend(isString).and(eq('0')).x(target)) {
    target // : "0"
}
if (extend(join(eq(1), eq('1')), is1_1or__1__)(target)) {
    target // : 1
}
if (extend(join(eq(1), eq('1'))).and(is1_1or__1__).x(target)) {
    target // : 1
}
if (join(isString, eq('0'))(target)) {
    target // : string
}
if (join(isString).or(eq('0')).x(target)) {
    target // : string
}
if (join(join(eq(1), eq('1')), is1_1or__1__)(target2)) {
    target2 // : 1 | "1"
}
if (join(is1_1or__1__).or(join(eq(1), eq('1'))).x(target2)) {
    target2 // : 1 | "1"
}
if (ref(eq, '0')(target)) {
    target // : string (be careful!)
}
if (ref(() => is1_1or__1__)(target2)) {
    target2 // : 1
}
type _1or__1__ = TargetType<typeof is1_1or__1__> // : 1 | "1"
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
