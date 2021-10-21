import { assertEquals } from 'https://deno.land/std@0.110.0/testing/asserts.ts'
import {
    isAny, isNever, isString, isNumber, isInt, isBigInt, isBoolean, isSymbol, isNull, isUndefined, isObject, isArray, nodupElems,
    proto, eq, gt, lt, ge, le, len, allElems, elems, allProps, allPropsStr, allPropsSym, hasSchema, schema
} from './std.ts'
const symA = Symbol()
const symB = Symbol()
const objA = {}
const objB = {}
const aryA = [] as []
const aryB = [] as []
Deno.test({
    name: 'isAny',
    fn() {
        const vld = isAny
        assertEquals(vld(''), true)
        assertEquals(vld(0), true)
        assertEquals(vld(0n), true)
        assertEquals(vld(false), true)
        assertEquals(vld(symA), true)
        assertEquals(vld(null), true)
        assertEquals(vld(undefined), true)
        assertEquals(vld(objA), true)
        assertEquals(vld(aryA), true)
    }
})
Deno.test({
    name: 'isNever',
    fn() {
        const vld = isNever
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isString',
    fn() {
        const vld = isString
        assertEquals(vld(''), true)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isNumber',
    fn() {
        const vld = isNumber
        assertEquals(vld(''), false)
        assertEquals(vld(0), true)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isInt type test',
    fn() {
        const vld = isInt
        assertEquals(vld(''), false)
        assertEquals(vld(0), true)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isInt int test',
    fn() {
        const vld = isInt
        assertEquals(vld(0.9), false)
        assertEquals(vld(1), true)
        assertEquals(vld(1.1), false)
    }
})
Deno.test({
    name: 'isBigInt',
    fn() {
        const vld = isBigInt
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), true)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isBoolean',
    fn() {
        const vld = isBoolean
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), true)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isSymbol',
    fn() {
        const vld = isSymbol
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), true)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isNull',
    fn() {
        const vld = isNull
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), true)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isUndefined',
    fn() {
        const vld = isUndefined
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), true)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'isObject',
    fn() {
        const vld = isObject
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), true)
        assertEquals(vld(aryA), true)
    }
})
Deno.test({
    name: 'isArray',
    fn() {
        const vld = isArray
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), true)
    }
})
Deno.test({
    name: 'nodupElems',
    fn() {
        const vld = nodupElems
        assertEquals(vld([]), true)
        assertEquals(vld(['']), true)
        assertEquals(vld(['', '']), false)
        assertEquals(vld(['', ' ']), true)
        assertEquals(vld([0]), true)
        assertEquals(vld([0, 0]), false)
        assertEquals(vld([0, 1]), true)
        assertEquals(vld([0n]), true)
        assertEquals(vld([0n, 0n]), false)
        assertEquals(vld([0n, 1n]), true)
        assertEquals(vld([false]), true)
        assertEquals(vld([false, false]), false)
        assertEquals(vld([false, true]), true)
        assertEquals(vld([symA]), true)
        assertEquals(vld([symA, symA]), false)
        assertEquals(vld([symA, symB]), true)
        assertEquals(vld([null]), true)
        assertEquals(vld([null, null]), false)
        assertEquals(vld([null, undefined]), true)
        assertEquals(vld([undefined]), true)
        assertEquals(vld([undefined, undefined]), false)
        assertEquals(vld([undefined, null]), true)
        assertEquals(vld([objA]), true)
        assertEquals(vld([objA, objA]), false)
        assertEquals(vld([objA, objB]), true)
        assertEquals(vld([aryA]), true)
        assertEquals(vld([aryA, aryA]), false)
        assertEquals(vld([aryA, aryB]), true)
    }
})
Deno.test({
    name: 'proto',
    fn() {
        const vld = proto(eq(objA))
        assertEquals(vld(Object.create(objA)), true)
        assertEquals(vld(Object.create(objB)), false)
        assertEquals(vld(Object.create(null)), false)
    }
})
Deno.test({
    name: 'proto std case',
    fn() {
        const vld = proto(eq(Object.prototype))
        assertEquals(vld(objA), true)
        assertEquals(vld(aryA), false)
        assertEquals(vld(Object.create(null)), false)
    }
})
Deno.test({
    name: 'eq string',
    fn() {
        const vld = eq('')
        assertEquals(vld(''), true)
        assertEquals(vld(' '), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'eq number',
    fn() {
        const vld = eq(0)
        assertEquals(vld(''), false)
        assertEquals(vld(0), true)
        assertEquals(vld(1), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'eq bigint',
    fn() {
        const vld = eq(0n)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), true)
        assertEquals(vld(1n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'eq boolean',
    fn() {
        const vld = eq(false)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), true)
        assertEquals(vld(true), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'eq symbol',
    fn() {
        const vld = eq(symA)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), true)
        assertEquals(vld(symB), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'eq null',
    fn() {
        const vld = eq(null)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), true)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'eq undefined',
    fn() {
        const vld = eq(undefined)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), true)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'eq object',
    fn() {
        const vld = eq(objA)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), true)
        assertEquals(vld(objB), false)
        assertEquals(vld(aryA), false)
    }
})
Deno.test({
    name: 'eq Array',
    fn() {
        const vld = eq(aryA)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(objA), false)
        assertEquals(vld(aryA), true)
        assertEquals(vld(aryB), false)
    }
})
Deno.test({
    name: 'gt string',
    fn() {
        const vld = gt('1')
        assertEquals(vld('0'), false)
        assertEquals(vld('1'), false)
        assertEquals(vld('2'), true)
    }
})
Deno.test({
    name: 'gt number',
    fn() {
        const vld = gt(1)
        assertEquals(vld(0.9), false)
        assertEquals(vld(1), false)
        assertEquals(vld(1.1), true)
    }
})
Deno.test({
    name: 'gt bigint',
    fn() {
        const vld = gt(1n)
        assertEquals(vld(0n), false)
        assertEquals(vld(1n), false)
        assertEquals(vld(2n), true)
    }
})
Deno.test({
    name: 'lt string',
    fn() {
        const vld = lt('1')
        assertEquals(vld('0'), true)
        assertEquals(vld('1'), false)
        assertEquals(vld('2'), false)
    }
})
Deno.test({
    name: 'lt number',
    fn() {
        const vld = lt(1)
        assertEquals(vld(0.9), true)
        assertEquals(vld(1), false)
        assertEquals(vld(1.1), false)
    }
})
Deno.test({
    name: 'lt bigint',
    fn() {
        const vld = lt(1n)
        assertEquals(vld(0n), true)
        assertEquals(vld(1n), false)
        assertEquals(vld(2n), false)
    }
})
Deno.test({
    name: 'ge string',
    fn() {
        const vld = ge('1')
        assertEquals(vld('0'), false)
        assertEquals(vld('1'), true)
        assertEquals(vld('2'), true)
    }
})
Deno.test({
    name: 'ge number',
    fn() {
        const vld = ge(1)
        assertEquals(vld(0.9), false)
        assertEquals(vld(1), true)
        assertEquals(vld(1.1), true)
    }
})
Deno.test({
    name: 'ge bigint',
    fn() {
        const vld = ge(1n)
        assertEquals(vld(0n), false)
        assertEquals(vld(1n), true)
        assertEquals(vld(2n), true)
    }
})
Deno.test({
    name: 'le string',
    fn() {
        const vld = le('1')
        assertEquals(vld('0'), true)
        assertEquals(vld('1'), true)
        assertEquals(vld('2'), false)
    }
})
Deno.test({
    name: 'le number',
    fn() {
        const vld = le(1)
        assertEquals(vld(0.9), true)
        assertEquals(vld(1), true)
        assertEquals(vld(1.1), false)
    }
})
Deno.test({
    name: 'le bigint',
    fn() {
        const vld = le(1n)
        assertEquals(vld(0n), true)
        assertEquals(vld(1n), true)
        assertEquals(vld(2n), false)
    }
})
Deno.test({
    name: 'len',
    fn() {
        const vld = len(eq(1))
        assertEquals(vld([]), false)
        assertEquals(vld(['']), true)
        assertEquals(vld(['', '']), false)
        assertEquals(vld(''), false)
        assertEquals(vld(' '), true)
        assertEquals(vld('  '), false)
    }
})
Deno.test({
    name: 'allElems',
    fn() {
        const vld = allElems(isString)
        assertEquals(vld([]), true)
        assertEquals(vld(['']), true)
        assertEquals(vld([0]), false)
        assertEquals(vld(['', '']), true)
        assertEquals(vld(['', 0]), false)
        assertEquals(vld([0, '']), false)
        assertEquals(vld([0, 0]), false)
    }
})
Deno.test({
    name: 'elems 0',
    fn() {
        const vld = elems()
        assertEquals(vld([]), true)
        assertEquals(vld(['']), false)
        assertEquals(vld([0]), false)
        assertEquals(vld(['', '']), false)
        assertEquals(vld(['', 0]), false)
        assertEquals(vld([0, '']), false)
        assertEquals(vld([0, 0]), false)
    }
})
Deno.test({
    name: 'elems 1',
    fn() {
        const vld = elems(isString)
        assertEquals(vld([]), false)
        assertEquals(vld(['']), true)
        assertEquals(vld([0]), false)
        assertEquals(vld(['', '']), false)
        assertEquals(vld(['', 0]), false)
        assertEquals(vld([0, '']), false)
        assertEquals(vld([0, 0]), false)
    }
})
Deno.test({
    name: 'elems 2',
    fn() {
        const vld = elems(isString, isString)
        assertEquals(vld([]), false)
        assertEquals(vld(['']), false)
        assertEquals(vld([0]), false)
        assertEquals(vld(['', '']), true)
        assertEquals(vld(['', 0]), false)
        assertEquals(vld([0, '']), false)
        assertEquals(vld([0, 0]), false)
    }
})
Deno.test({
    name: 'allProps',
    fn() {
        const vld = allProps(isString)
        assertEquals(vld({}), true)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), true)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), true)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), true)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), true)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'allPropsStr',
    fn() {
        const vld = allPropsStr(isString)
        assertEquals(vld({}), true)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'allPropsSym',
    fn() {
        const vld = allPropsSym(isString)
        assertEquals(vld({}), true)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), true)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), true)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'hasSchema 0',
    fn() {
        const vld = hasSchema({})
        assertEquals(vld({}), true)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), true)
        assertEquals(vld({ [symA]: '' }), true)
        assertEquals(vld({ [symA]: 0 }), true)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), true)
        assertEquals(vld({ a: 0, b: '' }), true)
        assertEquals(vld({ a: 0, b: 0 }), true)
        assertEquals(vld({ a: '', [symB]: '' }), true)
        assertEquals(vld({ a: '', [symB]: 0 }), true)
        assertEquals(vld({ a: 0, [symB]: '' }), true)
        assertEquals(vld({ a: 0, [symB]: 0 }), true)
        assertEquals(vld({ [symA]: '', b: '' }), true)
        assertEquals(vld({ [symA]: '', b: 0 }), true)
        assertEquals(vld({ [symA]: 0, b: '' }), true)
        assertEquals(vld({ [symA]: 0, b: 0 }), true)
        assertEquals(vld({ [symA]: '', [symB]: '' }), true)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), true)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), true)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), true)
    }
})
Deno.test({
    name: 'hasSchema 1 key: string',
    fn() {
        const vld = hasSchema({ a: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), true)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), true)
        assertEquals(vld({ a: '', [symB]: 0 }), true)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'hasSchema 1 key: symbol',
    fn() {
        const vld = hasSchema({ [symA]: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), true)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), true)
        assertEquals(vld({ [symA]: '', b: 0 }), true)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), true)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), true)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'hasSchema 2 key: string - string',
    fn() {
        const vld = hasSchema({ a: isString, b: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'hasSchema 2 key: symbol - symbol',
    fn() {
        const vld = hasSchema({ [symA]: isString, [symB]: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), true)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'hasSchema 2 key: string - symbol',
    fn() {
        const vld = hasSchema({ a: isString, [symB]: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), true)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'hasSchema opt key: string',
    fn() {
        const vld = hasSchema({ a: isString, b: isString }, ['b'])
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), true)
        assertEquals(vld({ a: '', [symB]: 0 }), true)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'hasSchema opt key: symbol',
    fn() {
        const vld = hasSchema({ a: isString, [symB]: isString }, [symB])
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), true)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), true)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'schema 0',
    fn() {
        const vld = schema({})
        assertEquals(vld({}), true)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'schema 1 key: string',
    fn() {
        const vld = schema({ a: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'schema 1 key: symbol',
    fn() {
        const vld = schema({ [symA]: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), true)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'schema 2 key: string - string',
    fn() {
        const vld = schema({ a: isString, b: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'schema 2 key: symbol - symbol',
    fn() {
        const vld = schema({ [symA]: isString, [symB]: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), true)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'schema 2 key: string - symbol',
    fn() {
        const vld = schema({ a: isString, [symB]: isString })
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), false)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), true)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'schema opt key: string',
    fn() {
        const vld = schema({ a: isString, b: isString }, ['b'])
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), true)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), false)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
Deno.test({
    name: 'schema opt key: symbol',
    fn() {
        const vld = schema({ a: isString, [symB]: isString }, [symB])
        assertEquals(vld({}), false)
        assertEquals(vld({ a: '' }), true)
        assertEquals(vld({ a: 0 }), false)
        assertEquals(vld({ [symA]: '' }), false)
        assertEquals(vld({ [symA]: 0 }), false)
        assertEquals(vld({ a: '', b: '' }), false)
        assertEquals(vld({ a: '', b: 0 }), false)
        assertEquals(vld({ a: 0, b: '' }), false)
        assertEquals(vld({ a: 0, b: 0 }), false)
        assertEquals(vld({ a: '', [symB]: '' }), true)
        assertEquals(vld({ a: '', [symB]: 0 }), false)
        assertEquals(vld({ a: 0, [symB]: '' }), false)
        assertEquals(vld({ a: 0, [symB]: 0 }), false)
        assertEquals(vld({ [symA]: '', b: '' }), false)
        assertEquals(vld({ [symA]: '', b: 0 }), false)
        assertEquals(vld({ [symA]: 0, b: '' }), false)
        assertEquals(vld({ [symA]: 0, b: 0 }), false)
        assertEquals(vld({ [symA]: '', [symB]: '' }), false)
        assertEquals(vld({ [symA]: '', [symB]: 0 }), false)
        assertEquals(vld({ [symA]: 0, [symB]: '' }), false)
        assertEquals(vld({ [symA]: 0, [symB]: 0 }), false)
    }
})
