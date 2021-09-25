export function gt(refVal: number) {
    return (target: number): target is number => target > refVal
}
export function lt(refVal: number) {
    return (target: number): target is number => target < refVal
}
export function ge(refVal: number) {
    return (target: number): target is number => target >= refVal
}
export function le(refVal: number) {
    return (target: number): target is number => target <= refVal
}
export function range(min: number, max: number) {
    return (target: number): target is number => target >= min && target <= max
}
