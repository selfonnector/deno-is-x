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
export function isArray_<E>(elemVld: Validation<E>) {
    return (target: any): target is E[] => {
        if (!isPlaneArray(target)) return false
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
export function isAssoc_<E>(elemVld: Validation<E>) {
    return (target: any): target is Assoc<E> => {
        if (!isPlaneObject(target)) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isDict_<E>(elemVld: Validation<E>) {
    return (target: any): target is Dict<E> => {
        if (!isPlaneObject(target)) return false
        if (Object.getOwnPropertySymbols(target).length > 0) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isAlbum_<E>(elemVld: Validation<E>) {
    return (target: any): target is Album<E> => {
        if (!isPlaneObject(target)) return false
        if (Object.getOwnPropertyNames(target).length > 0) return false
        for (const key of ownKeys(target)) if (!elemVld(target[key])) return false
        return true
    }
}
export function isStruct_<SCHEMA extends Assoc<any>>(vldSchema: ValidationMap<SCHEMA>): Validation<SCHEMA>
export function isStruct_<SCHEMA extends Assoc<any>, OPT_KEY extends Exclude<keyof SCHEMA, keyof Object>>(vldSchema: ValidationMap<SCHEMA>, optionalKeys?: OPT_KEY[]): Validation<Optionally<SCHEMA, OPT_KEY>>
export function isStruct_<SCHEMA extends Assoc<any>, OPT_KEY extends Exclude<keyof SCHEMA, keyof Object> = never>(vldSchema: ValidationMap<SCHEMA>, optionalKeys?: OPT_KEY[]) {
    const hasStruct = hasStruct_(vldSchema, optionalKeys)
    return (target: any) => {
        if (!hasStruct(target)) return false
        for (const key of ownKeys(target)) if (!hasOwnKey(vldSchema, key)) return false
        return true
    }
}
export function hasStruct_<SCHEMA extends Assoc<any> = {}>(vldSchema: ValidationMap<SCHEMA>): Validation<SCHEMA & Assoc<any>>
export function hasStruct_<SCHEMA extends Assoc<any>, OPT_KEY extends Exclude<keyof SCHEMA, keyof Object>>(vldSchema: ValidationMap<SCHEMA>, optionalKeys?: OPT_KEY[]): Validation<Optionally<SCHEMA, OPT_KEY> & Assoc<any>>
export function hasStruct_<SCHEMA extends Assoc<any>, OPT_KEY extends Exclude<keyof SCHEMA, keyof Object> = never>(vldSchema: ValidationMap<SCHEMA>, optionalKeys?: OPT_KEY[]) {
    const vlds: Assoc<Validation<any>> = { ...vldSchema }
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
export function isUnion_<CASES extends any[]>(...caseVlds: ValidationMap<CASES>) {
    return (target: any): target is CASES[number] => {
        for (const caseVld of caseVlds) if (caseVld(target)) return true
        return false
    }
}
export function ref<A extends (string | number | bigint | boolean | symbol)[], T>(vldGet: (...args: A) => Validation<T>, ...args: A): Validation<T>
export function ref<A extends any[], T>(vldGet: (...args: A) => Validation<T>, ...args: A): Validation<T>
export function ref<A extends any[], T>(vldGet: (...args: A) => Validation<T>, ...args: A) {
    let cacheVld: Validation<T> | null = null
    return (target: any) => {
        if (cacheVld === null) cacheVld = vldGet(...args)
        return cacheVld(target)
    }
}
type ValidationMap<T> = {
    [P in keyof T]: Validation<T[P]>
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
