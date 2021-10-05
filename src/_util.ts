import type { Vld } from './core.ts'
export type VldMap<Tgt, Oks> = {
    [P in keyof Oks]: Oks[P] extends Tgt ? Vld<Tgt, Oks[P]> : never
}
export type Ord = string | number | bigint | object
export type Tuple<T, Length extends number, Base extends unknown[] = []> = Base['length'] extends Length ? Length extends Base['length'] ? Base : [...Base, ...T[]] : Tuple<T, Length, [...Base, T]>
export type Assoc<E> = {
    [key: string | symbol]: E
}
export type Opt<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
