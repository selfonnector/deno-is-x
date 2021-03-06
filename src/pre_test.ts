import { assertEquals } from 'https://deno.land/std@0.110.0/testing/asserts.ts'
import { isAny, isString, eq } from './std.ts'
import { isNonnegInt, array, tuple, assoc, dict, album, interf, struct } from './pre.ts'
class UnextendedClass {}
class SubObject extends Object {}
class SubArray extends Array {}
const symA = Symbol()
const symB = Symbol()
const obj = {}
const ary = [] as []
const unextCls = new UnextendedClass
const subObj = new SubObject
const subAry = new SubArray
const nullProtoObj = Object.create(null)
Deno.test({
    name: 'isNonnegInt type test',
    fn() {
        const vld = isNonnegInt
        assertEquals(vld(''), false)
        assertEquals(vld(0), true)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(obj), false)
        assertEquals(vld(ary), false)
    }
})
Deno.test({
    name: 'isNonnegInt int test',
    fn() {
        const vld = isNonnegInt
        assertEquals(vld(0.9), false)
        assertEquals(vld(1), true)
        assertEquals(vld(1.1), false)
    }
})
Deno.test({
    name: 'isNonnegInt non-negative test',
    fn() {
        const vld = isNonnegInt
        assertEquals(vld(-1), false)
        assertEquals(vld(0), true)
        assertEquals(vld(1), true)
    }
})
Deno.test({
    name: 'array type test',
    fn() {
        const vld = array(isAny)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(obj), false)
        assertEquals(vld(ary), true)
        assertEquals(vld(unextCls), false)
        assertEquals(vld(subObj), false)
        assertEquals(vld(subAry), false)
        assertEquals(vld(nullProtoObj), false)
    }
})
Deno.test({
    name: 'array content test length: none',
    fn() {
        const vld = array(isString)
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
    name: 'array content test length: 0',
    fn() {
        const vld = array(isString, eq(0))
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
    name: 'array content test length: 1',
    fn() {
        const vld = array(isString, eq(1))
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
    name: 'array content test length: 2',
    fn() {
        const vld = array(isString, eq(2))
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
    name: 'tuple type test',
    fn() {
        const vld = tuple()
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(obj), false)
        assertEquals(vld(ary), true)
        assertEquals(vld(unextCls), false)
        assertEquals(vld(subObj), false)
        assertEquals(vld(subAry), false)
        assertEquals(vld(nullProtoObj), false)
    }
})
Deno.test({
    name: 'tuple content test 0',
    fn() {
        const vld = tuple()
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
    name: 'tuple content test 1',
    fn() {
        const vld = tuple(isString)
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
    name: 'tuple content test 2',
    fn() {
        const vld = tuple(isString, isString)
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
    name: 'assoc type test',
    fn() {
        const vld = assoc(isAny)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(obj), true)
        assertEquals(vld(ary), false)
        assertEquals(vld(unextCls), false)
        assertEquals(vld(subObj), false)
        assertEquals(vld(subAry), false)
        assertEquals(vld(nullProtoObj), false)
    }
})
Deno.test({
    name: 'assoc content test',
    fn() {
        const vld = assoc(isString)
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
    name: 'dict type test',
    fn() {
        const vld = dict(isAny)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(obj), true)
        assertEquals(vld(ary), false)
        assertEquals(vld(unextCls), false)
        assertEquals(vld(subObj), false)
        assertEquals(vld(subAry), false)
        assertEquals(vld(nullProtoObj), false)
    }
})
Deno.test({
    name: 'dict content test',
    fn() {
        const vld = dict(isString)
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
    name: 'album type test',
    fn() {
        const vld = album(isAny)
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(obj), true)
        assertEquals(vld(ary), false)
        assertEquals(vld(unextCls), false)
        assertEquals(vld(subObj), false)
        assertEquals(vld(subAry), false)
        assertEquals(vld(nullProtoObj), false)
    }
})
Deno.test({
    name: 'album content test',
    fn() {
        const vld = album(isString)
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
    name: 'interf type test',
    fn() {
        const vld = interf({})
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(obj), true)
        assertEquals(vld(ary), false)
        assertEquals(vld(unextCls), false)
        assertEquals(vld(subObj), false)
        assertEquals(vld(subAry), false)
        assertEquals(vld(nullProtoObj), false)
    }
})
Deno.test({
    name: 'interf content test 0',
    fn() {
        const vld = interf({})
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
    name: 'interf content test 1 key: string',
    fn() {
        const vld = interf({ a: isString })
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
    name: 'interf content test 1 key: symbol',
    fn() {
        const vld = interf({ [symA]: isString })
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
    name: 'interf content test 2 key: string - string',
    fn() {
        const vld = interf({ a: isString, b: isString })
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
    name: 'interf content test 2 key: symbol - symbol',
    fn() {
        const vld = interf({ [symA]: isString, [symB]: isString })
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
    name: 'interf content test 2 key: string - symbol',
    fn() {
        const vld = interf({ a: isString, [symB]: isString })
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
    name: 'interf content test opt key: string',
    fn() {
        const vld = interf({ a: isString, b: isString }, ['b'])
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
    name: 'interf content test opt key: symbol',
    fn() {
        const vld = interf({ a: isString, [symB]: isString }, [symB])
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
    name: 'struct type test',
    fn() {
        const vld = struct({})
        assertEquals(vld(''), false)
        assertEquals(vld(0), false)
        assertEquals(vld(0n), false)
        assertEquals(vld(false), false)
        assertEquals(vld(symA), false)
        assertEquals(vld(null), false)
        assertEquals(vld(undefined), false)
        assertEquals(vld(obj), true)
        assertEquals(vld(ary), false)
        assertEquals(vld(unextCls), false)
        assertEquals(vld(subObj), false)
        assertEquals(vld(subAry), false)
        assertEquals(vld(nullProtoObj), false)
    }
})
Deno.test({
    name: 'struct content test 0',
    fn() {
        const vld = struct({})
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
    name: 'struct content test 1 key: string',
    fn() {
        const vld = struct({ a: isString })
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
    name: 'struct content test 1 key: symbol',
    fn() {
        const vld = struct({ [symA]: isString })
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
    name: 'struct content test 2 key: string - string',
    fn() {
        const vld = struct({ a: isString, b: isString })
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
    name: 'struct content test 2 key: symbol - symbol',
    fn() {
        const vld = struct({ [symA]: isString, [symB]: isString })
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
    name: 'struct content test 2 key: string - symbol',
    fn() {
        const vld = struct({ a: isString, [symB]: isString })
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
    name: 'struct content test opt key: string',
    fn() {
        const vld = struct({ a: isString, b: isString }, ['b'])
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
    name: 'struct content test opt key: symbol',
    fn() {
        const vld = struct({ a: isString, [symB]: isString }, [symB])
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
