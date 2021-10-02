export type Vld<Tgt, Ok extends Tgt> = (tgt: Tgt) => tgt is Ok
export type TgtType<V extends Vld<any, unknown>> = V extends Vld<infer Tgt, any> ? Tgt : never
export type OkType<V extends Vld<any, unknown>> = V extends Vld<any, infer Ok> ? Ok : never
export function extend<A, B extends A>(baseVld: Vld<A, B>) {
    return {
        vld: baseVld,
        and<C extends B>(vld: Vld<B, C>) {
            return extend((tgt: A): tgt is C => this.vld(tgt) && vld(tgt))
        }
    }
}
export function union<A, B extends A>(baseVld: Vld<A, B>) {
    return {
        vld: baseVld,
        or<C extends A>(vld: Vld<A, C>) { 
            return union((tgt: A): tgt is B | C => this.vld(tgt) || vld(tgt))
        }
    }
}
export function ref<Args extends unknown[], Tgt, Ok extends Tgt>(vldGet: (...args: Args) => Vld<Tgt, Ok>, ...args: Args) {
    let cacheVld: Vld<Tgt, Ok> | null = null
    return (tgt: Tgt): tgt is Ok => {
        if (cacheVld === null) cacheVld = vldGet(...args)
        return cacheVld(tgt)
    }
}
