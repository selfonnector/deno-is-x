import { OkTypeMap, Ord, Tuple, Assoc, Dict, Album, Opt, protoChain, ownKeys, ownStringKeys, ownSymbolKeys, hasOwnKey } from './_util.ts'
import { Vld, TgVld, union } from './core.ts'
export function isAny(_tgt: unknown) {
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
export function nodupElems<E>(valGet: (e: E) => unknown = e => e) {
    return (tgt: E[]) => {
        const scanned: unknown[] = []
        for (const e of tgt) {
            const val = valGet(e)
            if (scanned.includes(val)) return false
            scanned.push(val)
        }
        return true
    }
}
export function eqAllElems<E>(valGet: (e: E) => unknown = e => e) {
    return (tgt: E[]) => {
        if (tgt.length === 0) return true
        const base = valGet(tgt[0])
        for (let i = 1; i < tgt.length; i++) if (valGet(tgt[i]) !== base) return false
        return true
    }
}
export function proto<T extends object>(vld: TgVld<object | null, T>): TgVld<object, T>
export function proto(vld: Vld<object | null>): Vld<object>
export function proto(vld: Vld<object | null>) {
    return (tgt: object) => vld(Object.getPrototypeOf(tgt))
}
export function eq<T extends string | number | bigint | boolean>(base: T): TgVld<unknown, T> // For literal type inference
export function eq<T>(base: T): TgVld<unknown, T>
export function eq(base: unknown) {
    return (tgt: unknown) => tgt === base
}
export function gt<T extends Ord>(base: T) {
    return (tgt: Ord<T>) => tgt > base
}
export function lt<T extends Ord>(base: T) {
    return (tgt: Ord<T>) => tgt < base
}
export function ge<T extends Ord>(base: T) {
    return (tgt: Ord<T>) => tgt >= base
}
export function le<T extends Ord>(base: T) {
    return (tgt: Ord<T>) => tgt <= base
}
export function len<Length extends number>(vld: TgVld<number, Length>): <T extends string | unknown[], E extends T extends (infer E)[] ? E : unknown>(tgt: T) => tgt is T extends any[] ? Tuple<E, Length> extends T ? Tuple<E, Length> : T : T
export function len(vld: Vld<number>): Vld<string | unknown[]>
export function len(vld: Vld<number>) {
    return (tgt: string | unknown[]) => {
        return vld(tgt.length)
    }
}
export function allElems<Tgt, Ok extends Tgt>(vld: TgVld<Tgt, Ok>): TgVld<Tgt[], Ok[]>
export function allElems<Tgt>(vld: Vld<Tgt>): Vld<Tgt[]>
export function allElems(vld: Vld<unknown>) {
    return (tgt: unknown[])=> {
        for (const e of tgt) if (!vld(e)) return false
        return true
    }
}
export function elems<Tgt, Ok extends Tgt, Vlds extends Vld<Tgt>[]>(headVld: TgVld<Tgt, Ok>, ...tailVlds: Vlds): TgVld<Tgt[], [Ok, ...OkTypeMap<Vlds, Tgt>]>
export function elems<Tgt, Vlds extends Vld<Tgt>[]>(headVld: Vld<Tgt>, ...tailVlds: Vlds): TgVld<Tgt[], [Tgt, ...OkTypeMap<Vlds, Tgt>]>
export function elems<Vlds extends Vld<unknown>[]>(...vlds: Vlds): TgVld<unknown[], OkTypeMap<Vlds>>
export function elems(...vlds: Vld<unknown>[]) {
    return (tgt: unknown[]) => {
        if (tgt.length !== vlds.length) return false
        for (let i = 0; i < tgt.length; i++) if (!vlds[i](tgt[i])) return false
        return true
    }
}
export function allProps<Ok>(vld: TgVld<unknown, Ok>): TgVld<object, Assoc<Ok>>
export function allProps(vld: Vld<unknown>): Vld<object>
export function allProps(vld: Vld<unknown>) {
    return (tgt: object) => {
        return protoChain((tgt: object) => {
            for (const key of ownKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}
export function allPropsStr<Ok>(vld: TgVld<unknown, Ok>): TgVld<object, Dict<Ok>>
export function allPropsStr(vld: Vld<unknown>): Vld<object>
export function allPropsStr(vld: Vld<unknown>) {
    return (tgt: object) => {
        return protoChain((tgt: object) => {
            if (ownSymbolKeys(tgt).length > 0) return false
            for (const key of ownStringKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}
export function allPropsSym<Ok>(vld: TgVld<unknown, Ok>): TgVld<object, Album<Ok>>
export function allPropsSym(vld: Vld<unknown>): Vld<object>
export function allPropsSym(vld: Vld<unknown>) {
    return (tgt: object) => {
        return protoChain((tgt: object) => {
            if (ownStringKeys(tgt).length > 0) return false
            for (const key of ownSymbolKeys(tgt)) if (!vld(tgt[key])) return false
            return true
        }, tgt)
    }
}
export function hasSchema<Vlds extends Assoc<Vld<unknown>>>(vldSchema: Vlds): TgVld<unknown, OkTypeMap<Vlds> & Assoc<unknown>>
export function hasSchema<Vlds extends Assoc<Vld<unknown>>, OptKey extends keyof Vlds = never>(vldSchema: Vlds, optionalKeys?: OptKey[]): TgVld<unknown, Opt<OkTypeMap<Vlds>, OptKey> & Assoc<unknown>>
export function hasSchema(vldSchema: Assoc<Vld<unknown>>, optionalKeys?: (string | symbol)[]) {
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
export function schema<Vlds extends Assoc<Vld<unknown>>>(vldSchema: Vlds): TgVld<unknown, OkTypeMap<Vlds>>
export function schema<Vlds extends Assoc<Vld<unknown>>, OptKey extends keyof Vlds = never>(vldSchema: Vlds, optionalKeys?: OptKey[]): TgVld<unknown, Opt<OkTypeMap<Vlds>, OptKey>>
export function schema(vldSchema: Assoc<Vld<unknown>>, optionalKeys?: (string | symbol)[]) {
    const vld = hasSchema(vldSchema, optionalKeys)
    return (tgt: object) => {
        if (!vld(tgt)) return false
        return protoChain((tgt: object) => {
            for (const key of ownKeys(tgt)) if (!hasOwnKey(vldSchema, key)) return false
            return true
        }, tgt)
    }
}
