import { OkTypeMap, Tuple, Assoc, Album, Dict, Opt } from './_util.ts'
import { Vld, TgVld, extend } from './core.ts'
import { isInt, isObject, isArray, proto, eq, ge, len, allElems, elems, allProps, allPropsStr, allPropsSym, hasSchema, schema } from './std.ts'
export const isNonnegInt = extend(isInt, ge(0))
export function array<E, Length extends number>(elemVld: TgVld<unknown, E>, lenVld: TgVld<number, Length>): TgVld<unknown, Tuple<E, Length>>
export function array<E>(elemVld: TgVld<unknown, E>, lenVld?: Vld<number>): TgVld<unknown, E[]>
export function array<Length extends number>(elemVld: Vld<unknown>, lenVld: TgVld<number, Length>): TgVld<unknown, Tuple<unknown, Length>>
export function array(elemVld: Vld<unknown>, lenVld?: Vld<number>): TgVld<unknown, unknown[]>
export function array(elemVld: Vld<unknown>, lenVld?: Vld<number>) {
    const vld = extend(isArray, extend(proto(eq(Array.prototype)), allElems(elemVld)))
    return lenVld ? extend(vld, len(lenVld)) : vld
}
export function tuple<Vlds extends Vld<unknown>[]>(...elemVlds: Vlds) {
    return extend(isArray, extend(proto(eq(Array.prototype)), elems(...elemVlds)))
}
export function assoc<E>(elemVld: TgVld<unknown, E>): TgVld<unknown, Assoc<E>>
export function assoc(elemVld: Vld<unknown>): Vld<unknown>
export function assoc(elemVld: Vld<unknown>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allProps(elemVld)))
}
export function dict<E>(elemVld: TgVld<unknown, E>): TgVld<unknown, Dict<E>>
export function dict(elemVld: Vld<unknown>): Vld<unknown>
export function dict(elemVld: Vld<unknown>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allPropsStr(elemVld)))
}
export function album<E>(elemVld: TgVld<unknown, E>): TgVld<unknown, Album<E>>
export function album(elemVld: Vld<unknown>): Vld<unknown>
export function album(elemVld: Vld<unknown>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allPropsSym(elemVld)))
}
export function interf<Vlds extends Assoc<Vld<unknown>>>(vldSchema: Vlds): TgVld<unknown, OkTypeMap<Vlds> & Assoc<unknown>>
export function interf<Vlds extends Assoc<Vld<unknown>>, OptKey extends keyof Vlds = never>(vldSchema: Vlds, optionalKeys?: OptKey[]): TgVld<unknown, Opt<OkTypeMap<Vlds>, OptKey> & Assoc<unknown>>
export function interf(vldSchema: Assoc<Vld<unknown>>, optionalKeys?: (string | symbol)[]) {
    return extend(isObject, extend(proto(eq(Object.prototype)), hasSchema(vldSchema, optionalKeys)))
}
export function struct<Vlds extends Assoc<Vld<unknown>>>(vldSchema: Vlds): TgVld<unknown, OkTypeMap<Vlds>>
export function struct<Vlds extends Assoc<Vld<unknown>>, OptKey extends keyof Vlds = never>(vldSchema: Vlds, optionalKeys?: OptKey[]): TgVld<unknown, Opt<OkTypeMap<Vlds>, OptKey>>
export function struct(vldSchema: Assoc<Vld<unknown>>, optionalKeys?: (string | symbol)[]) {
    return extend(isObject, extend(proto(eq(Object.prototype)), schema(vldSchema, optionalKeys)))
}
