import type { VldMap } from './_util.ts'
export type Vld<Tgt, Ok extends Tgt> = (tgt: Tgt) => tgt is Ok
export type TgtType<V extends Vld<any, any>> = V extends Vld<infer Tgt, any> ? Tgt : never
export type OkType<V extends Vld<any, any>> = V extends Vld<any, infer Ok> ? Ok : never
export function extend<A, B extends A, C extends B>(baseVld: Vld<A, B>, vld: Vld<B, C>) {
    return (tgt: A): tgt is C => baseVld(tgt) && vld(tgt)
}
export function union<Tgt, Ok extends Tgt, Oks extends Tgt[]>(baseVld: Vld<Tgt, Ok>, ...vlds: VldMap<Tgt, Oks>) {
    return (tgt: Tgt): tgt is Ok | Oks[number] => {
        if (baseVld(tgt)) return true
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
