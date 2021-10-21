import type { VldType, OkTypeMap } from './_util.ts'
export type Vld<Tgt> = (tgt: Tgt) => boolean
export type TgVld<Tgt, Ok extends Tgt> = (tgt: Tgt) => tgt is Ok
export type TgtType<V> = V extends Vld<infer Tgt> ? Tgt : never
export type OkType<V, T = any> = V extends VldType<infer Tgt, infer Ok> ? T extends Tgt ? Ok extends T ? Ok : never : never : never
export function extend<A, B extends A, C extends B>(baseVld: TgVld<A, B>, subVld: TgVld<B, C>, ...vlds: Vld<C>[]): TgVld<A, C>
export function extend<A, B extends A>(baseVld: TgVld<A, B>, ...vlds: Vld<B>[]): TgVld<A, B>
export function extend<Tgt>(...vlds: Vld<Tgt>[]): Vld<Tgt>
export function extend(...vlds: Vld<unknown>[]) {
    return (tgt: unknown) => {
        for (const vld of vlds) if (!vld(tgt)) return false
        return true
    }
}
export function union<Tgt, Ok extends Tgt, Vlds extends TgVld<Tgt, any>[]>(baseVld: TgVld<Tgt, Ok>, ...vlds: Vlds): TgVld<Tgt, Ok | OkTypeMap<Vlds, Tgt>[number]>
export function union<Vlds extends TgVld<unknown, any>[]>(...vlds: Vlds): TgVld<unknown, OkTypeMap<Vlds>[number]>
export function union<Tgt>(...vlds: Vld<Tgt>[]): Vld<Tgt>
export function union(...vlds: Vld<unknown>[]) {
    return (tgt: unknown) => {
        for (const vld of vlds) if (vld(tgt)) return true
        return false
    }
}
export function lazy<Args extends unknown[], Tgt, Ok extends Tgt>(vldGet: (...args: Args) => TgVld<Tgt, Ok>, ...args: Args): TgVld<Tgt, Ok>
export function lazy<Args extends unknown[], Tgt>(vldGet: (...args: Args) => Vld<Tgt>, ...args: Args): Vld<Tgt>
export function lazy<Args extends unknown[]>(vldGet: (...args: Args) => Vld<unknown>, ...args: Args) {
    let cacheVld: Vld<unknown> | null = null
    return (tgt: unknown) => {
        if (cacheVld === null) cacheVld = vldGet(...args)
        return cacheVld(tgt)
    }
}
