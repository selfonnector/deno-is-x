import { VldMap, Tuple, Assoc, Opt } from './_util.ts'
import { Vld, extend } from './core.ts'
import { isObject, isArray, proto, eq, len, allElems, elems, allProps, allPropsStr, allPropsSym, hasSchema, schema } from './std.ts'
export function array<E, Length extends number>(elemVld: Vld<unknown, E>, lenVld?: Vld<number, Length>): Vld<unknown, Tuple<E, Length>>
export function array(elemVld: Vld<unknown, any>, lenVld?: Vld<number, any>) {
    const vld = extend(isArray, extend(proto(eq(Array.prototype)), allElems(elemVld)))
    return lenVld ? extend(vld, len(lenVld)) : vld
}
export function tuple<Vlds extends Vld<unknown, any>[]>(...elemVlds: Vlds) {
    return extend(isArray, extend(proto(eq(Array.prototype)), elems(...elemVlds)))
}
export function assoc<E>(elemVld: Vld<unknown, E>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allProps(elemVld)))
}
export function dict<E>(elemVld: Vld<unknown, E>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allPropsStr(elemVld)))
}
export function album<E>(elemVld: Vld<unknown, E>) {
    return extend(isObject, extend(proto(eq(Object.prototype)), allPropsSym(elemVld)))
}
export function interf<OkSchema extends Assoc<unknown>>(vldSchema: VldMap<unknown, OkSchema>): Vld<unknown, OkSchema & Assoc<unknown>>
export function interf<OkSchema extends Assoc<unknown>, OptKey extends keyof OkSchema = never>(vldSchema: VldMap<unknown, OkSchema>, optionalKeys?: OptKey[]): Vld<unknown, Opt<OkSchema, OptKey> & Assoc<unknown>>
export function interf(vldSchema: Assoc<Vld<unknown, any>>, optionalKeys?: (string | symbol)[]) {
    return extend(isObject, extend(proto(eq(Object.prototype)), hasSchema(vldSchema, optionalKeys as any)))
}
export function struct<OkSchema extends Assoc<unknown>>(vldSchema: VldMap<unknown, OkSchema>): Vld<unknown, OkSchema>
export function struct<OkSchema extends Assoc<unknown>, OptKey extends keyof OkSchema = never>(vldSchema: VldMap<unknown, OkSchema>, optionalKeys?: OptKey[]): Vld<unknown, Opt<OkSchema, OptKey>>
export function struct(vldSchema: Assoc<Vld<unknown, any>>, optionalKeys?: (string | symbol)[]) {
    return extend(isObject, extend(proto(eq(Object.prototype)), schema(vldSchema, optionalKeys as any)))
}
