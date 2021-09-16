# Deno is_x module
[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/is_x)

## About
- value => value is x
- x = You can decide. Assist it.

## Example
```typescript
import { isString, is, isTuple_, isStruct_, isUnion_ }
from 'https://deno.land/x/is_x/mod.ts'

const isResult = isUnion_(
    isStruct_({
        kind: is('ok'),
        data: isTuple_(isString, isString)
    }),
    isStruct_({
        kind: is('ng'),
        message: isString
    }, ['message'])
)

const value = JSON.parse('{ "kind": "ok", "data": ["a", "b"] }')
if (isResult(value)) {
    /* Type of value is
      { kind: "ok"; data: [string, string]; }
    | { kind: "ng"; message?: string; } */
}
```
