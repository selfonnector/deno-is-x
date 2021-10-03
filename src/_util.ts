import type { Vld } from './core.ts'
export type VldMap<Tgt, Oks> = {
    [P in keyof Oks]: Oks[P] extends Tgt ? Vld<Tgt, Oks[P]> : never
}
