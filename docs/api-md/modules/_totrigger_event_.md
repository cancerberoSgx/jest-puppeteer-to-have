[jest-puppeteer-to-have](../README.md) > ["toTrigger/event"](../modules/_totrigger_event_.md)

# External module: "toTrigger/event"

## Index

### Interfaces

* [EventTool](../interfaces/_totrigger_event_.eventtool.md)

### Type aliases

* [FireEventNames](_totrigger_event_.md#fireeventnames)

### Variables

* [eventAuxFunctions](_totrigger_event_.md#eventauxfunctions)

### Functions

* [asArray](_totrigger_event_.md#asarray)
* [eventTools](_totrigger_event_.md#eventtools)

---

## Type aliases

<a id="fireeventnames"></a>

###  FireEventNames

**Ƭ FireEventNames**: *"mousedown" \| "mouseup" \| "click" \| "focus" \| "change" \| "blur" \| "select" \| "input"*

*Defined in [toTrigger/event.ts:5](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/d35cf7c/src/toTrigger/event.ts#L5)*

___

## Variables

<a id="eventauxfunctions"></a>

### `<Const>` eventAuxFunctions

**● eventAuxFunctions**: *`string`* =  `
(
${eventTools.toString()}
)()
`

*Defined in [toTrigger/event.ts:100](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/d35cf7c/src/toTrigger/event.ts#L100)*

___

## Functions

<a id="asarray"></a>

###  asArray

▸ **asArray**<`T`>(selectors: *`T` \| `T`[]*): `T`[]

*Defined in [toTrigger/event.ts:1](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/d35cf7c/src/toTrigger/event.ts#L1)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| selectors | `T` \| `T`[] |

**Returns:** `T`[]

___
<a id="eventtools"></a>

###  eventTools

▸ **eventTools**(): `object`

*Defined in [toTrigger/event.ts:7](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/d35cf7c/src/toTrigger/event.ts#L7)*

**Returns:** `object`

___

