export type Validation<Target, Valid extends Target> = (target: Target) => target is Valid
export type TargetType<V extends Validation<any, unknown>> = V extends Validation<infer Target, any> ? Target : never
export type ValidType<V extends Validation<any, unknown>> = V extends Validation<any, infer Valid> ? Valid : never
export type Extender<A, B extends A> = {
    x: Validation<A, B>,
    and<C extends B>(y: Validation<B, C>) : Extender<A, C>
}
export function extend<A, B extends A>(x: Validation<A, B>): Extender<A, B>
export function extend<A, B extends A, C extends B>(x: Validation<A, B>, y: Validation<B, C>): Validation<A, C>
export function extend<A, B extends A, C extends B>(x: Validation<A, B>, y?: Validation<B, C>) {
    return y ? (target: A) => x(target) && y(target) : {
        x: x,
        and<C extends B>(y: Validation<B, C>) { 
            return extend(extend(x, y))
        }
    }
}
export type Joiner<A, B extends A> = {
    x: Validation<A, B>,
    or<C extends A>(y: Validation<A, C>) : Joiner<A, B | C>
}
export function join<A, B extends A>(x: Validation<A, B>): Joiner<A, B>
export function join<A, B extends A, C extends A>(x: Validation<A, B>, y: Validation<A, C>): Validation<A, B | C>
export function join<A, B extends A, C extends A>(x: Validation<A, B>, y?: Validation<A, C>) {
    return y ? (target: A) => x(target) || y(target) : {
        x: x,
        or<C extends A>(y: Validation<A, C>) { 
            return join(join(x, y))
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
