import { assertEquals } from 'https://deno.land/std@0.110.0/testing/asserts.ts'
import { Vld, extend, union, lazy } from './core.ts'
import { isString, len, allElems, eq, elems } from './std.ts'
import { struct } from './pre.ts'
type LoopNest = { a?: LoopNest }
function loopNest(): Vld<unknown, LoopNest> {
    return struct({
        a: lazy(loopNest)
    }, ['a'])
}
const isLoopNest = loopNest()
Deno.test({
    name: 'extend',
    fn() {
        const vld = extend(allElems(isString), len(eq(1)))
        assertEquals(vld(['0']), true)
        assertEquals(vld(['0', '0']), false)
        assertEquals(vld([0]), false)
        assertEquals(vld([0, 0]), false)
    }
})
Deno.test({
    name: 'union',
    fn() {
        const vld = union(allElems(isString), len(eq(1)), elems())
        assertEquals(vld([]), true)
        assertEquals(vld(['0']), true)
        assertEquals(vld(['0', '0']), true)
        assertEquals(vld([0]), true)
        assertEquals(vld([0, 0]), false)
    }
})
Deno.test({
    name: 'lazy',
    fn() {
        assertEquals(isLoopNest({}), true)
        assertEquals(isLoopNest({ a: {} }), true)
        assertEquals(isLoopNest({ a: { a: {} } }), true)
        assertEquals(isLoopNest({ a: { b: {} } }), false)
    }
})
