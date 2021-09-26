export type Validation<Target, Valid extends Target> = (target: Target) => target is Valid
export type TargetType<V extends Validation<any, unknown>> = V extends Validation<infer Target, any> ? Target : never
export type ValidType<V extends Validation<any, unknown>> = V extends Validation<any, infer Valid> ? Valid : never
export function concat<A, B extends A, C extends B>(a: Validation<A, B>, b: Validation<B, C>) {
    return (target: A): target is C => a(target) && b(target)
}
export function dev<A, B extends A>(thisVld: Validation<A, B>) {
    return {
        v: thisVld,
        add<C extends B>(vld: Validation<B, C>) { 
            return dev(concat(thisVld, vld))
        }
    }
}
export function ref<Args extends unknown[], Target, Valid extends Target>(vldGet: (...args: Args) => Validation<Target, Valid>, ...args: Args) {
    let cacheVld: Validation<Target, Valid> | null = null
    return (target: Target): target is Valid => {
        if (cacheVld === null) cacheVld = vldGet(...args)
        return cacheVld(target)
    }
}
