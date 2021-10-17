import { TgVldMap, Tuple, Assoc, Opt } from './_util.ts'
import { TgVld, extend } from './core.ts'
import { isObject, isArray, proto, eq, len, allElems, elems, allProps, allPropsStr, allPropsSym, hasSchema, schema } from './std.ts'
export function array<E, Length extends number>(elemVld: TgVld<unknown, E>, lenVld?: TgVld<number, Length>): TgVld<unknown, Tuple<E, Length>>
export function array(elemVld: TgVld<unknown, any>, lenVld?: TgVld<number, any>) {
    const vld = extend(isArray, extend(proto(eq(Array.prototype)), allElems(elemVld)))
    return lenVld ? extend(vld, len(lenVld)) : vld
}
export function tuple<Vlds extends TgVld<unknown, any>[]>(...elemVlds: Vlds) {
    return extend(isArray, extend(proto(eq(Array.prototype)), elems(...elemVlds)))
}
export function assoc<E>(elemVld: TgVld<unknown, E>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allProps(elemVld)))
}
export function dict<E>(elemVld: TgVld<unknown, E>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allPropsStr(elemVld)))
}
export function album<E>(elemVld: TgVld<unknown, E>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allPropsSym(elemVld)))
}
export function interf<OkSchema extends Assoc<unknown>>(vldSchema: TgVldMap<unknown, OkSchema>): TgVld<unknown, OkSchema & Assoc<unknown>>
export function interf<OkSchema extends Assoc<unknown>, OptKey extends keyof OkSchema = never>(vldSchema: TgVldMap<unknown, OkSchema>, optionalKeys?: OptKey[]): TgVld<unknown, Opt<OkSchema, OptKey> & Assoc<unknown>>
export function interf(vldSchema: Assoc<TgVld<unknown, any>>, optionalKeys?: (string | symbol)[]) {
    return extend(isObject, extend(proto(eq(Object.prototype)), hasSchema(vldSchema, optionalKeys as any)))
}
export function struct<OkSchema extends Assoc<unknown>>(vldSchema: TgVldMap<unknown, OkSchema>): TgVld<unknown, OkSchema>
export function struct<OkSchema extends Assoc<unknown>, OptKey extends keyof OkSchema = never>(vldSchema: TgVldMap<unknown, OkSchema>, optionalKeys?: OptKey[]): TgVld<unknown, Opt<OkSchema, OptKey>>
export function struct(vldSchema: Assoc<TgVld<unknown, any>>, optionalKeys?: (string | symbol)[]) {
    return extend(isObject, extend(proto(eq(Object.prototype)), schema(vldSchema, optionalKeys as any)))
}
