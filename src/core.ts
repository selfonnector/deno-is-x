export type Validation<Target, Valid extends Target> = (target: Target) => target is Valid
export type TargetType<V extends Validation<any, any>> = V extends Validation<infer Target, any> ? Target : never
export type ValidType<V extends Validation<any, any>> = V extends Validation<any, infer Valid> ? Valid : never
