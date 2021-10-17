import type { OkTypeMap } from './_util.ts'
export type TgVld<Tgt, Ok extends Tgt> = (tgt: Tgt) => tgt is Ok
export type TgtType<V> = V extends TgVld<infer Tgt, any> ? Tgt : never
export type OkType<V, Tgt = any> = V extends TgVld<any, infer Ok> ? Ok extends Tgt ? Ok : never : never
export function extend<A, B extends A, C extends B>(baseVld: TgVld<A, B>, ...vlds: TgVld<B, C>[]): TgVld<A, C>
export function extend<Ok>(...vlds: TgVld<unknown, Ok>[]): TgVld<unknown, Ok>
export function extend(...vlds: TgVld<unknown, any>[]) {
    return (tgt: unknown) => {
        for (const vld of vlds) if (!vld(tgt)) return false
        return true
    }
}
export function union<Tgt, Ok extends Tgt, Vlds extends TgVld<Tgt, any>[]>(baseVld: TgVld<Tgt, Ok>, ...vlds: Vlds): TgVld<Tgt, Ok | OkTypeMap<Vlds, Tgt>[number]>
export function union<Vlds extends TgVld<unknown, any>[]>(...vlds: Vlds): TgVld<unknown, OkTypeMap<Vlds>[number]>
export function union(...vlds: TgVld<unknown, any>[]) {
    return (tgt: unknown) => {
        for (const vld of vlds) if (vld(tgt)) return true
        return false
    }
}
export function lazy<Args extends unknown[], Tgt, Ok extends Tgt>(vldGet: (...args: Args) => TgVld<Tgt, Ok>, ...args: Args) {
    let cacheVld: TgVld<Tgt, Ok> | null = null
    return (tgt: Tgt): tgt is Ok => {
        if (cacheVld === null) cacheVld = vldGet(...args)
        return cacheVld(tgt)
    }
}
