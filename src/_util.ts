import type { Vld, TgVld, OkType } from './core.ts'
export type VldType<Tgt, Ok extends Tgt> = Tgt extends Ok ? Vld<Tgt> : TgVld<Tgt, Ok>
export type OkTypeMap<Vlds, Tgt = any> = {
    [P in keyof Vlds]: OkType<Vlds[P], Tgt>
}
export type Ord<T extends Ord = any> = T extends string ? string : T extends number ? number : bigint
export type Tuple<E, Length extends number, Base extends unknown[] = []> =  Length extends Base['length'] ? Base : number extends Length ? [...Base, ...E[]] : Tuple<E, Length, [...Base, E]>
export type ArrayNest<E> = E[] | ArrayNest<E>[]
export type ArrayNest0<E> = E | ArrayNest<E>
export type MultArray<E, Lengths extends number[]> = Lengths extends [infer HeadLength, ...infer TailLengths] ? Tuple<MultArray<E, TailLengths extends number[] ? TailLengths : number[]>, HeadLength extends number ? HeadLength : number> : Lengths extends [] ? E : ArrayNest0<E>
export type MultArray2<E, Depth extends number, Length extends number = number> = MultArray<E, Tuple<Length, Depth>>
export type Assoc<E> = {
    [key: string | symbol]: E
}
export type Dict<E> = {
    [key: string]: E
}
export type Album<E> = {
    [key: symbol]: E
}
export type Key<T = any> = keyof T & (string | symbol)
export type StringKey<T = any> = keyof T & string
export type SymbolKey<T = any> = keyof T & symbol
export type Opt<T, K extends keyof T> = Partial<T> & Omit<T, K>
export function protoChain(vld: Vld<object>, tgt: object | null): boolean {
    if (tgt === Object.prototype || tgt === null) return true
    if (!vld(tgt)) return false
    return protoChain(vld, Object.getPrototypeOf(tgt))
}
export function ownKeys<T extends object>(o: T) {
    return Reflect.ownKeys(o) as Key<T>[]
}
export function ownStringKeys<T extends object>(o: T) {
    return Object.getOwnPropertyNames(o) as StringKey<T>[]
}
export function ownSymbolKeys<T extends object>(o: T) {
    return Object.getOwnPropertySymbols(o) as SymbolKey<T>[]
}
export function hasOwnKey<T extends object>(o: T, key: Key): key is Key<T> {
    return Object.hasOwnProperty.call(o, key)
}
