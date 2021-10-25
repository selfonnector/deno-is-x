import type { Vld, TgVld, OkType } from './core.ts'
export type VldType<Tgt, Ok extends Tgt> = Tgt extends Ok ? Vld<Tgt> : TgVld<Tgt, Ok>
export type OkTypeMap<Vlds, Tgt = any> = {
    [P in keyof Vlds]: OkType<Vlds[P], Tgt>
}
export type Ord<T extends Ord = any> = T extends string ? string : T extends number ? number : bigint
export type Tuple<T, Length extends number, Base extends unknown[] = []> =  Length extends Base['length'] ? Base : number extends Length ? [...Base, ...T[]] : Tuple<T, Length, [...Base, T]>
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
