export type Validation<T extends TARGET, TARGET = any> = (target: TARGET) => target is T
export type ValidType<V extends Validation<any>> = V extends Validation<infer T> ? T : never
