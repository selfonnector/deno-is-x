import { Validation, join } from './core.ts'
export function isUnknown(_target: unknown): _target is unknown {
    return true
}
export function isNever(_target: unknown): _target is never {
    return false
}
export function isString(target: unknown): target is string {
    return typeof target === 'string'
}
export function isNumber(target: unknown): target is number {
    return typeof target === 'number'
}
export function isInt(target: unknown): target is number {
    return Number.isInteger(target)
}
export function isBigInt(target: unknown): target is bigint {
    return typeof target === 'bigint'
}
export function isBoolean(target: unknown): target is boolean {
    return typeof target === 'boolean'
}
export function isSymbol(target: unknown): target is symbol {
    return typeof target === 'symbol'
}
export function isNull(target: unknown): target is null {
    return target === null
}
export function isUndefined(target: unknown): target is undefined {
    return typeof target === 'undefined'
}
export function eq<T extends string | number | bigint | boolean | symbol>(base: T) {
    return (target: unknown): target is T => target === base
}
export function gt(base: number) {
    return (target: number): target is number => target > base
}
export function lt(base: number) {
    return (target: number): target is number => target < base
}
export function ge(base: number) {
    return (target: number): target is number => target >= base
}
export function le(base: number) {
    return (target: number): target is number => target <= base
}
export function len<Length extends number>(vld: Validation<number ,Length>) {
    return <T extends string | unknown[], E extends T extends (infer E)[] ? E : unknown>(target: T | (T extends any[] ? Tuple<E, Length> : T)): target is T extends any[] ? Tuple<E, Length> : T => {
        return vld((<T>target).length)
    }
}
export function isArray_<E>(elemVld: Validation<unknown, E>): Validation<unknown, E[]>
export function isArray_<E, Length extends number>(elemVld: Validation<unknown, E>, length: Length): Validation<unknown, Tuple<E, Length>>
export function isArray_(elemVld: Validation<unknown, unknown>, length?: number) {
    return (target: unknown) => {
        if (!isPlaneArray(target)) return false
        if (isNumber(length) && target.length !== length) return false
        for (const tgtElem of target) if (!elemVld(tgtElem)) return false
        return true
    }
}
export function isTuple_<T extends unknown[]>(...elemVlds: ValidationMap<T>) {
    return (target: unknown): target is T => {
        if (!isPlaneArray(target)) return false
        if (target.length !== elemVlds.length) return false
        for (let i = 0; i < target.length; i++) if (!elemVlds[i](target[i])) return false
        return true
    }
}
export function isAssoc_<E>(elemVld: Validation<unknown, E>) {
    return (target: unknown): target is Assoc<E> => {
        if (!isPlaneObject(target)) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isDict_<E>(elemVld: Validation<unknown, E>) {
    return (target: unknown): target is Dict<E> => {
        if (!isPlaneObject(target)) return false
        if (Object.getOwnPropertySymbols(target).length > 0) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isAlbum_<E>(elemVld: Validation<unknown, E>) {
    return (target: unknown): target is Album<E> => {
        if (!isPlaneObject(target)) return false
        if (Object.getOwnPropertyNames(target).length > 0) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isStruct_<Schema extends Assoc<unknown>>(vldSchema: ValidationMap<Schema>): Validation<unknown, Schema>
export function isStruct_<Schema extends Assoc<unknown>, OptKey extends Exclude<keyof Schema, keyof Object>>(vldSchema: ValidationMap<Schema>, optionalKeys?: OptKey[]): Validation<unknown, Optionally<Schema, OptKey>>
export function isStruct_<Schema extends Assoc<unknown>, OptKey extends Exclude<keyof Schema, keyof Object> = never>(vldSchema: ValidationMap<Schema>, optionalKeys?: OptKey[]) {
    const hasStruct = hasStruct_(vldSchema, optionalKeys)
    return (target: unknown) => {
        if (!hasStruct(target)) return false
        for (const key of ownKeys(target)) if (!hasOwnKey(vldSchema, key)) return false
        return true
    }
}
export function hasStruct_<Schema extends Assoc<unknown>>(vldSchema: ValidationMap<Schema>): Validation<unknown, Schema & Assoc<unknown>>
export function hasStruct_<Schema extends Assoc<unknown>, OptKey extends Exclude<keyof Schema, keyof Object>>(vldSchema: ValidationMap<Schema>, optionalKeys?: OptKey[]): Validation<unknown, Optionally<Schema, OptKey> & Assoc<unknown>>
export function hasStruct_<Schema extends Assoc<unknown>, OptKey extends Exclude<keyof Schema, keyof Object> = never>(vldSchema: ValidationMap<Schema>, optionalKeys?: OptKey[]) {
    const vlds: Assoc<Validation<unknown, unknown>> = { ...vldSchema }
    const optKeys = optionalKeys ? optionalKeys as (keyof typeof vlds)[] : []
    for (const key of optKeys) vlds[key] = join(vlds[key], isUndefined)
    return (target: unknown) => {
        if (!isPlaneObject(target)) return false
        for (const key of ownKeys(vlds)) {
            if (hasOwnKey(target, key)) {
                if (!vlds[key](target[key])) return false
            } else {
                if (optKeys.includes(key)) continue
                return false
            }
        }
        return true
    }
}
type ValidationMap<Valid> = {
    [P in keyof Valid]: Validation<unknown, Valid[P]>
}
type Assoc<E> = {
    [key: string | symbol]: E
}
type Dict<E> = {
    [key: string]: E
}
type Album<E> = {
    [key: symbol]: E
}
type PropKey<T = any> = keyof T & (string | symbol)
type Optionally<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type Tuple<T, Length extends number, Base extends unknown[] = []> = Base['length'] extends Length ? Length extends Base['length'] ? Base : [...Base, ...T[]] : Tuple<T, Length, [...Base, T]>
function isObject(target: unknown): target is object {
    return typeof target === 'object' && target !== null
}
function isPlaneObject(target: unknown): target is object {
    return isObject(target) && Object.getPrototypeOf(target) === Object.prototype
}
function isPlaneArray(target: unknown): target is unknown[] {
    return Array.isArray(target) && Object.getPrototypeOf(target) === Array.prototype
}
function ownKeys<T extends object>(o: T) {
    return Reflect.ownKeys(o) as PropKey<T>[]
}
function hasOwnKey<T extends object>(o: T, key: PropKey): key is PropKey<T> {
    return Object.hasOwnProperty.call(o, key)
}
