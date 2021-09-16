export type Validation<T> = (target: any) => target is T
export type ValidType<V extends Validation<any>> = V extends Validation<infer T> ? T : never
