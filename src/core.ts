export type Validation<Target, Valid extends Target> = (target: Target) => target is Valid
export type TargetType<V extends Validation<any, unknown>> = V extends Validation<infer Target, any> ? Target : never
export type ValidType<V extends Validation<any, unknown>> = V extends Validation<any, infer Valid> ? Valid : never
export type Appender<A, B extends A> = {
    x: Validation<A, B>,
    and<C extends B>(y: Validation<B, C>) : Appender<A, C>
}
export function append<A, B extends A>(x: Validation<A, B>): Appender<A, B>
export function append<A, B extends A, C extends B>(x: Validation<A, B>, y: Validation<B, C>): Validation<A, C>
export function append<A, B extends A, C extends B>(x: Validation<A, B>, y?: Validation<B, C>) {
    return y ? (target: A) => x(target) && y(target) : {
        x: x,
        and<C extends B>(y: Validation<B, C>) { 
            return append(append(x, y))
        }
    }
}
export type Expander<A, B extends A> = {
    x: Validation<A, B>,
    or<C extends A>(y: Validation<A, C>) : Expander<A, B | C>
}
export function expand<A, B extends A>(x: Validation<A, B>): Expander<A, B>
export function expand<A, B extends A, C extends A>(x: Validation<A, B>, y: Validation<A, C>): Validation<A, B | C>
export function expand<A, B extends A, C extends A>(x: Validation<A, B>, y?: Validation<A, C>) {
    return y ? (target: A) => x(target) || y(target) : {
        x: x,
        or<C extends B>(y: Validation<B, C>) { 
            return expand(expand(x, y))
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
