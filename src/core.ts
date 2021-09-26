export type Validation<Target, Valid extends Target> = (target: Target) => target is Valid
export type TargetType<V extends Validation<any, unknown>> = V extends Validation<infer Target, any> ? Target : never
export type ValidType<V extends Validation<any, unknown>> = V extends Validation<any, infer Valid> ? Valid : never
export function ref<Args extends unknown[], Target, Valid extends Target>(vldGet: (...args: Args) => Validation<Target, Valid>, ...args: Args) {
    let cacheVld: Validation<Target, Valid> | null = null
    return (target: Target): target is Valid => {
        if (cacheVld === null) cacheVld = vldGet(...args)
        return cacheVld(target)
    }
}
