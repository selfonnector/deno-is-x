export type Validation<T extends Target, Target = any> = (target: Target) => target is T
export type ValidType<V extends Validation<any>> = V extends Validation<infer T> ? T : never
