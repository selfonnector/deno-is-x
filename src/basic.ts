import type { Validation } from './core.ts'
export function isAny(_target: any): _target is any {
    return true
}
export function isNever(_target: any): _target is never {
    return false
}
export function isString(target: any): target is string {
    return typeof target === 'string'
}
export function isNumber(target: any): target is number {
    return typeof target === 'number'
}
export function isBigInt(target: any): target is bigint {
    return typeof target === 'bigint'
}
export function isBoolean(target: any): target is boolean {
    return typeof target === 'boolean'
}
export function isSymbol(target: any): target is symbol {
    return typeof target === 'symbol'
}
export function isNull(target: any): target is null {
    return target === null
}
export function isUndefined(target: any): target is undefined {
    return typeof target === 'undefined'
}
export function is<T extends string | number | bigint | boolean | symbol>(value: T) {
    return (target: any): target is T => target === value
}
export function isArray_<E>(elemVld: Validation<any, E>): Validation<any, E[]>
export function isArray_<E, Length extends number>(elemVld: Validation<any, E>, length: Length): Validation<any, Tuple<E, Length>>
export function isArray_(elemVld: Validation<any, any>, length?: number) {
    return (target: any) => {
        if (!isPlaneArray(target)) return false
        if (isNumber(length) && target.length !== length) return false
        for (const tgtElem of target) if (!elemVld(tgtElem)) return false
        return true
    }
}
export function isTuple_<T extends any[]>(...elemVlds: ValidationMap<T>) {
    return (target: any): target is T => {
        if (!isPlaneArray(target)) return false
        if (target.length !== elemVlds.length) return false
        for (let i = 0; i < target.length; i++) if (!elemVlds[i](target[i])) return false
        return true
    }
}
export function isAssoc_<E>(elemVld: Validation<any, E>) {
    return (target: any): target is Assoc<E> => {
        if (!isPlaneObject(target)) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isDict_<E>(elemVld: Validation<any, E>) {
    return (target: any): target is Dict<E> => {
        if (!isPlaneObject(target)) return false
        if (Object.getOwnPropertySymbols(target).length > 0) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isAlbum_<E>(elemVld: Validation<any, E>) {
    return (target: any): target is Album<E> => {
        if (!isPlaneObject(target)) return false
        if (Object.getOwnPropertyNames(target).length > 0) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isStruct_<Schema extends Assoc<any>>(vldSchema: ValidationMap<Schema>): Validation<any, Schema>
export function isStruct_<Schema extends Assoc<any>, OptKey extends Exclude<keyof Schema, keyof Object>>(vldSchema: ValidationMap<Schema>, optionalKeys?: OptKey[]): Validation<any, Optionally<Schema, OptKey>>
export function isStruct_<Schema extends Assoc<any>, OptKey extends Exclude<keyof Schema, keyof Object> = never>(vldSchema: ValidationMap<Schema>, optionalKeys?: OptKey[]) {
    const hasStruct = hasStruct_(vldSchema, optionalKeys)
    return (target: any) => {
        if (!hasStruct(target)) return false
        for (const key of ownKeys(target)) if (!hasOwnKey(vldSchema, key)) return false
        return true
    }
}
export function hasStruct_<Schema extends Assoc<any>>(vldSchema: ValidationMap<Schema>): Validation<any, Schema & Assoc<any>>
export function hasStruct_<Schema extends Assoc<any>, OptKey extends Exclude<keyof Schema, keyof Object>>(vldSchema: ValidationMap<Schema>, optionalKeys?: OptKey[]): Validation<any, Optionally<Schema, OptKey> & Assoc<any>>
export function hasStruct_<Schema extends Assoc<any>, OptKey extends Exclude<keyof Schema, keyof Object> = never>(vldSchema: ValidationMap<Schema>, optionalKeys?: OptKey[]) {
    const vlds: Assoc<Validation<any, any>> = { ...vldSchema }
    const optKeys = optionalKeys ? optionalKeys as (keyof typeof vlds)[] : []
    for (const key of optKeys) vlds[key] = isUnion_(vlds[key], isUndefined)
    return (target: any) => {
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
export function isUnion_<Cases extends any[]>(...caseVlds: ValidationMap<Cases>) {
    return (target: any): target is Cases[number] => {
        for (const caseVld of caseVlds) if (caseVld(target)) return true
        return false
    }
}
export function concat<A, B extends A, C extends B>(a: Validation<A, B>, b: Validation<B, C>) {
    return (target: A): target is C => a(target) && b(target)
}
export function dev<A, B extends A>(thisVld: Validation<A, B>) {
    return {
        v: thisVld,
        add<C extends B>(vld: Validation<B, C>) { 
            return dev(concat(thisVld, vld))
        }
    }
}
export function ref<A extends (string | number | bigint | boolean | symbol)[], Target, Valid extends Target>(vldGet: (...args: A) => Validation<Target, Valid>, ...args: A): Validation<Target, Valid>
export function ref<A extends any[], Target, Valid extends Target>(vldGet: (...args: A) => Validation<Target, Valid>, ...args: A): Validation<Target, Valid>
export function ref<A extends any[], Target, Valid extends Target>(vldGet: (...args: A) => Validation<Target, Valid>, ...args: A) {
    let cacheVld: Validation<Target, Valid> | null = null
    return (target: Target) => {
        if (cacheVld === null) cacheVld = vldGet(...args)
        return cacheVld(target)
    }
}
type ValidationMap<Valid> = {
    [P in keyof Valid]: Validation<any, Valid[P]>
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
type Tuple<T, Length extends number, Base extends any[] = []> = Base['length'] extends Length ? Length extends Base['length'] ? Base : [...Base, ...T[]] : Tuple<T, Length, [...Base, T]>
function isObject(target: any): target is object {
    return typeof target === 'object' && target !== null
}
function isPlaneObject(target: any): target is Object {
    return isObject(target) && Object.getPrototypeOf(target) === Object.prototype
}
function isPlaneArray(target: any): target is any[] {
    return Array.isArray(target) && Object.getPrototypeOf(target) === Array.prototype
}
function ownKeys<T extends object>(o: T) {
    return Reflect.ownKeys(o) as PropKey<T>[]
}
function hasOwnKey<T extends object>(o: T, key: PropKey): key is PropKey<T> {
    return Object.hasOwnProperty.call(o, key)
}
