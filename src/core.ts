export type Validation<Target, Valid extends Target> = (target: Target) => target is Valid
export type ValidType<V extends Validation<any, any>> = V extends Validation<any, infer Valid> ? Valid : never
