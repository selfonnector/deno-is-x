import { VldMap, OkTypeMap, Ord, Tuple, Assoc, Dict, Album, Opt, protoChain, ownKeys, ownStringKeys, ownSymbolKeys, hasOwnKey } from './_util.ts'
import { Vld, union } from './core.ts'
export function isAny<T>(_tgt: T): _tgt is T {
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
export function gt<T extends Ord>(base: T) {
    return (tgt: Ord<T>): tgt is Ord<T> => tgt > base
}
export function lt<T extends Ord>(base: T) {
    return (tgt: Ord<T>): tgt is Ord<T> => tgt < base
}
export function ge<T extends Ord>(base: T) {
    return (tgt: Ord<T>): tgt is Ord<T> => tgt >= base
}
export function le<T extends Ord>(base: T) {
    return (tgt: Ord<T>): tgt is Ord<T> => tgt <= base
}
export function len<Length extends number>(vld: Vld<number, Length>) {
    return <T extends string | unknown[], E extends T extends (infer E)[] ? E : unknown>(tgt: T | (T extends any[] ? Tuple<E, Length> : T)): tgt is T extends any[] ? Tuple<E, Length> : T => {
        return vld((<T>tgt).length)
    }
}
export function allElems<Tgt, Ok extends Tgt>(vld: Vld<Tgt, Ok>) {
    return (tgt: Tgt[]): tgt is Ok[] => {
        for (const e of tgt) if (!vld(e)) return false
        return true
    }
}
export function elems<Tgt, Ok extends Tgt, Vlds extends Vld<Tgt, any>[]>(headVld: Vld<Tgt, Ok>, ...tailVlds: Vlds): Vld<Tgt[], [Ok, ...OkTypeMap<Vlds, Tgt>]>
export function elems<Vlds extends Vld<unknown, any>[]>(...vlds: Vlds): Vld<unknown[], OkTypeMap<Vlds>>
export function elems(...vlds: Vld<unknown, any>[]) {
    return (tgt: unknown[]) => {
        if (tgt.length !== vlds.length) return false
        for (let i = 0; i < tgt.length; i++) if (!vlds[i](tgt[i])) return false
        return true
    }
}
export function allProps<Ok>(vld: Vld<unknown, Ok>) {
    return (tgt: object): tgt is Assoc<Ok> => {
        return protoChain((tgt: object) => {
            for (const key of ownKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}
export function allPropsStr<Ok>(vld: Vld<unknown, Ok>) {
    return (tgt: object): tgt is Dict<Ok> => {
        return protoChain((tgt: object) => {
            if (ownSymbolKeys(tgt).length > 0) return false
            for (const key of ownStringKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}
export function allPropsSym<Ok>(vld: Vld<unknown, Ok>) {
    return (tgt: object): tgt is Album<Ok> => {
        return protoChain((tgt: object) => {
            if (ownStringKeys(tgt).length > 0) return false
            for (const key of ownSymbolKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}
export function hasSchema<OkSchema extends Assoc<unknown>>(vldSchema: VldMap<unknown, OkSchema>): Vld<object, OkSchema & Assoc<unknown>>
export function hasSchema<OkSchema extends Assoc<unknown>, OptKey extends keyof OkSchema = never>(vldSchema: VldMap<unknown, OkSchema>, optionalKeys?: OptKey[]): Vld<object, Opt<OkSchema, OptKey> & Assoc<unknown>>
export function hasSchema(vldSchema: Assoc<Vld<unknown, any>>, optionalKeys?: (string | symbol)[]) {
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
export function schema<OkSchema extends Assoc<unknown>>(vldSchema: VldMap<unknown, OkSchema>): Vld<object, OkSchema>
export function schema<OkSchema extends Assoc<unknown>, OptKey extends keyof OkSchema = never>(vldSchema: VldMap<unknown, OkSchema>, optionalKeys?: OptKey[]): Vld<object, Opt<OkSchema, OptKey>>
export function schema(vldSchema: Assoc<Vld<unknown, any>>, optionalKeys?: (string | symbol)[]) {
    const vld = hasSchema(vldSchema, optionalKeys as any)
    return (tgt: object) => {
        if (!vld(tgt)) return false
        return protoChain((tgt: object) => {
            for (const key of ownKeys(tgt)) if (!hasOwnKey(vldSchema, key)) return false
            return true
        }, tgt)
    }
}
