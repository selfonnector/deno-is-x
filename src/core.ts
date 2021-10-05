import type { OkTypeMap } from './_util.ts'
export type Vld<Tgt, Ok extends Tgt> = (tgt: Tgt) => tgt is Ok
export type TgtType<V> = V extends Vld<infer Tgt, any> ? Tgt : never
export type OkType<V, Tgt = any> = V extends Vld<any, infer Ok> ? Ok extends Tgt ? Ok : never : never
export function extend<A, B extends A, C extends B>(baseVld: Vld<A, B>, vld: Vld<B, C>) {
    return (tgt: A): tgt is C => baseVld(tgt) && vld(tgt)
}
export function union<Tgt, Ok extends Tgt, Vlds extends Vld<Tgt, any>[]>(baseVld: Vld<Tgt, Ok>, ...vlds: Vlds): Vld<Tgt, Ok | OkTypeMap<Vlds, Tgt>[number]>
export function union<Vlds extends Vld<unknown, any>[]>(...vlds: Vlds): Vld<unknown, OkTypeMap<Vlds>[number]>
export function union(...vlds: Vld<unknown, any>[]) {
    return (tgt: unknown) => {
        for (const vld of vlds) if (vld(tgt)) return true
        return false
    }
}
export function ref<Args extends unknown[], Tgt, Ok extends Tgt>(vldGet: (...args: Args) => Vld<Tgt, Ok>, ...args: Args) {
    let cacheVld: Vld<Tgt, Ok> | null = null
    return (tgt: Tgt): tgt is Ok => {
        if (cacheVld === null) cacheVld = vldGet(...args)
        return cacheVld(tgt)
    }
}
