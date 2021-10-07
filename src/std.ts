import { VldMap, OkTypeMap, Ord, Tuple, Assoc, Dict, Album, Opt, protoChain, ownKeys, ownStringKeys, ownSymbolKeys, hasOwnKey } from './_util.ts'
import { Vld, union } from './core.ts'
export function isUnknown(_tgt: unknown): _tgt is unknown {
    return true
}
export function isNever(_tgt: unknown): _tgt is never {
    return false
}
export function isString(tgt: unknown): tgt is string {
    return typeof tgt === 'string'
}
export function isNumber(tgt: unknown): tgt is number {
    return typeof tgt === 'number'
}
export function isInt(tgt: unknown): tgt is number {
    return Number.isInteger(tgt)
}
export function isBigInt(tgt: unknown): tgt is bigint {
    return typeof tgt === 'bigint'
}
export function isBoolean(tgt: unknown): tgt is boolean {
    return typeof tgt === 'boolean'
}
export function isSymbol(tgt: unknown): tgt is symbol {
    return typeof tgt === 'symbol'
}
export function isNull(tgt: unknown): tgt is null {
    return tgt === null
}
export function isUndefined(tgt: unknown): tgt is undefined {
    return typeof tgt === 'undefined'
}
export function isObject(tgt: unknown): tgt is object {
    return typeof tgt === 'object' && tgt !== null
}
export function isArray(tgt: unknown): tgt is unknown[] {
    return Array.isArray(tgt)
}
export function proto<T extends object>(vld: Vld<object | null, T>) {
    return (tgt: object): tgt is T => vld(Object.getPrototypeOf(tgt))
}
export function eq<T extends string | number | bigint | boolean>(base: T): Vld<unknown, T> // For literal type inference
export function eq<T>(base: T): Vld<unknown, T>
export function eq(base: unknown) {
    return (tgt: unknown) => tgt === base
}
export function gt(base: Ord) {
    return <T extends Ord>(tgt: T): tgt is T => tgt > base
}
export function lt(base: Ord) {
    return <T extends Ord>(tgt: T): tgt is T => tgt < base
}
export function ge(base: Ord) {
    return <T extends Ord>(tgt: T): tgt is T => tgt >= base
}
export function le(base: Ord) {
    return <T extends Ord>(tgt: T): tgt is T => tgt <= base
}
export function len<Length extends number>(vld: Vld<number ,Length>) {
    return <T extends string | unknown[], E extends T extends (infer E)[] ? E : unknown>(tgt: T | (T extends any[] ? Tuple<E, Length> : T)): tgt is T extends any[] ? Tuple<E, Length> : T => {
        return vld((<T>tgt).length)
    }
}
export function all<Tgt, Ok extends Tgt>(vld: Vld<Tgt, Ok>) {
    return (tgt: Tgt[]): tgt is Ok[] => {
        for (const e of tgt) if (!vld(e)) return false
        return true
    }
}
export function tuple<Tgt, Ok extends Tgt, Vlds extends Vld<Tgt, any>[]>(headVld: Vld<Tgt, Ok>, ...tailVlds: Vlds): Vld<Tgt[], [Ok, ...OkTypeMap<Vlds, Tgt>]>
export function tuple<Vlds extends Vld<unknown, any>[]>(...vlds: Vlds): Vld<unknown[], OkTypeMap<Vlds>>
export function tuple(...vlds: Vld<unknown, any>[]) {
    return (tgt: unknown[]) => {
        if (tgt.length !== vlds.length) return false
        for (let i = 0; i < tgt.length; i++) if (!vlds[i](tgt[i])) return false
        return true
    }
}
export function interf<OkSchema extends Assoc<unknown>>(vldSchema: VldMap<unknown, OkSchema>): Vld<object, OkSchema & Assoc<unknown>>
export function interf<OkSchema extends Assoc<unknown>, OptKey extends keyof OkSchema = never>(vldSchema: VldMap<unknown, OkSchema>, optionalKeys?: OptKey[]): Vld<object, Opt<OkSchema, OptKey> & Assoc<unknown>>
export function interf(vldSchema: Assoc<Vld<unknown, any>>, optionalKeys?: (string | symbol)[]) {
    const optKeys = optionalKeys ? optionalKeys : []
    const vlds = { ...vldSchema }
    for (const key of optKeys) vlds[key] = union(vlds[key], isUndefined)
    return (tgt: object) => {
        for (const key of ownKeys(vlds)) {
            if (key in tgt) {
                if (!vlds[key](tgt[key as keyof object])) return false
            } else {
                if (optKeys.includes(key)) continue
                return false
            }
        }
        return true
    }
}
export function struct<OkSchema extends Assoc<unknown>>(vldSchema: VldMap<unknown, OkSchema>): Vld<object, OkSchema>
export function struct<OkSchema extends Assoc<unknown>, OptKey extends keyof OkSchema = never>(vldSchema: VldMap<unknown, OkSchema>, optionalKeys?: OptKey[]): Vld<object, Opt<OkSchema, OptKey>>
export function struct(vldSchema: Assoc<Vld<unknown, any>>, optionalKeys?: (string | symbol)[]) {
    const vld = interf(vldSchema, optionalKeys as any)
    return (tgt: object) => {
        if (!vld(tgt)) return false
        return protoChain((tgt: object) => {
            for (const key of ownKeys(tgt)) if (!hasOwnKey(vldSchema, key)) return false
            return true
        }, tgt)
    }
}
export function assoc<Ok>(vld: Vld<unknown, Ok>) {
    return (tgt: object): tgt is Assoc<Ok> => {
        return protoChain((tgt: object) => {
            for (const key of ownKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}
export function dict<Ok>(vld: Vld<unknown, Ok>) {
    return (tgt: object): tgt is Dict<Ok> => {
        return protoChain((tgt: object) => {
            if (ownSymbolKeys(tgt).length > 0) return false
            for (const key of ownStringKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}
export function album<Ok>(vld: Vld<unknown, Ok>) {
    return (tgt: object): tgt is Album<Ok> => {
        return protoChain((tgt: object) => {
            if (ownStringKeys(tgt).length > 0) return false
            for (const key of ownSymbolKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}

// TODO
export function _tuple<As extends unknown[]>(baseVld: Vld<unknown[], As>) {
    return {
        vld: baseVld,
        req<B>(vld: Vld<unknown, B>) {
            return _tuple((tgt: unknown[]): tgt is [...As, B] => {
                if (tgt.length === 0) return false
                const i = tgt.length - 1
                return this.vld(tgt.slice(0, i)) && vld(tgt[i])
            })
        },
        opt<B>(vld: Vld<unknown, B>) {
            return _tuple((tgt: unknown[]): tgt is [...As, B?] => {
                if (this.vld(tgt)) return true
                const optVld = union(vld, isUndefined)
                const i = tgt.length - 1
                return this.vld(tgt.slice(0, i)) && optVld(tgt[i])
            })
        },
        link<Bs extends unknown[]>(vld: Vld<unknown[], Bs>) {
            return _tuple((tgt: unknown[]): tgt is [...As, ...Bs] => {
                for (let i = 0; i < tgt.length; i++) {
                    if (this.vld(tgt.slice(0, i)) && vld(tgt.slice(i, tgt.length))) return true
                }
                return false
            })
        }
    }
}
export function isAssoc_<E>(elemVld: Vld<unknown, E>) {
    return (tgt: unknown): tgt is Assoc<E> => {
        if (!isPlaneObject(tgt)) return false
        for (const key of ownKeys(tgt)) if (!elemVld(tgt[key])) return false
        return true
    }
}
export function isDict_<E>(elemVld: Vld<unknown, E>) {
    return (tgt: unknown): tgt is Dict<E> => {
        if (!isPlaneObject(tgt)) return false
        if (Object.getOwnPropertySymbols(tgt).length > 0) return false
        for (const key of ownKeys(tgt)) if (!elemVld(tgt[key])) return false
        return true
    }
}
export function isAlbum_<E>(elemVld: Vld<unknown, E>) {
    return (tgt: unknown): tgt is Album<E> => {
        if (!isPlaneObject(tgt)) return false
        if (Object.getOwnPropertyNames(tgt).length > 0) return false
        for (const key of ownKeys(tgt)) if (!elemVld(tgt[key])) return false
        return true
    }
}
export function isStruct_<Schema extends Assoc<unknown>>(vldSchema: _VldMap<Schema>): Vld<unknown, Schema>
export function isStruct_<Schema extends Assoc<unknown>, OptKey extends Exclude<keyof Schema, keyof Object>>(vldSchema: _VldMap<Schema>, optionalKeys?: OptKey[]): Vld<unknown, Optionally<Schema, OptKey>>
export function isStruct_<Schema extends Assoc<unknown>, OptKey extends Exclude<keyof Schema, keyof Object> = never>(vldSchema: _VldMap<Schema>, optionalKeys?: OptKey[]) {
    const hasStruct = hasStruct_(vldSchema, optionalKeys)
    return (tgt: unknown) => {
        if (!hasStruct(tgt)) return false
        for (const key of ownKeys(tgt)) if (!hasOwnKey(vldSchema, key)) return false
        return true
    }
}
export function hasStruct_<Schema extends Assoc<unknown>>(vldSchema: _VldMap<Schema>): Vld<unknown, Schema & Assoc<unknown>>
export function hasStruct_<Schema extends Assoc<unknown>, OptKey extends Exclude<keyof Schema, keyof Object>>(vldSchema: _VldMap<Schema>, optionalKeys?: OptKey[]): Vld<unknown, Optionally<Schema, OptKey> & Assoc<unknown>>
export function hasStruct_<Schema extends Assoc<unknown>, OptKey extends Exclude<keyof Schema, keyof Object> = never>(vldSchema: _VldMap<Schema>, optionalKeys?: OptKey[]) {
    const vlds: Assoc<Vld<unknown, unknown>> = { ...vldSchema }
    const optKeys = optionalKeys ? optionalKeys as (keyof typeof vlds)[] : []
    for (const key of optKeys) vlds[key] = union(vlds[key], isUndefined)
    return (tgt: unknown) => {
        if (!isPlaneObject(tgt)) return false
        for (const key of ownKeys(vlds)) {
            if (hasOwnKey(tgt, key)) {
                if (!vlds[key](tgt[key])) return false
            } else {
                if (optKeys.includes(key)) continue
                return false
            }
        }
        return true
    }
}
type _VldMap<Valid> = {
    [P in keyof Valid]: Vld<unknown, Valid[P]>
}
type Optionally<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
function isPlaneObject(tgt: unknown): tgt is object {
    return isObject(tgt) && Object.getPrototypeOf(tgt) === Object.prototype
}
