[jest-puppeteer-to-have](../README.md) > ["toHave/types"](../modules/_tohave_types_.md) > [ElementSelectorOptions](../interfaces/_tohave_types_.elementselectoroptions.md)

# Interface: ElementSelectorOptions

## Hierarchy

**ElementSelectorOptions**

↳  [ToHaveOptions](_tohave_types_.tohaveoptions.md)

## Index

### Properties

* [matchElementCountDescription](_tohave_types_.elementselectoroptions.md#matchelementcountdescription)
* [parent](_tohave_types_.elementselectoroptions.md#parent)
* [selector](_tohave_types_.elementselectoroptions.md#selector)
* [selectorMultiplicity](_tohave_types_.elementselectoroptions.md#selectormultiplicity)

### Methods

* [matchElementCount](_tohave_types_.elementselectoroptions.md#matchelementcount)

---

## Properties

<a id="matchelementcountdescription"></a>

### `<Optional>` matchElementCountDescription

**● matchElementCountDescription**: *`undefined` \| `string`*

*Defined in [toHave/types.ts:27](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/a7ee247/src/toHave/types.ts#L27)*

___
<a id="parent"></a>

### `<Optional>` parent

**● parent**: *`undefined` \| `string`*

*Defined in [toHave/types.ts:24](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/a7ee247/src/toHave/types.ts#L24)*

parent.querySelectorAll() or use document if not given

___
<a id="selector"></a>

###  selector

**● selector**: *`string`*

*Defined in [toHave/types.ts:25](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/a7ee247/src/toHave/types.ts#L25)*

___
<a id="selectormultiplicity"></a>

### `<Optional>` selectorMultiplicity

**● selectorMultiplicity**: *[Multiplicity](../modules/_tohave_types_.md#multiplicity)*

*Defined in [toHave/types.ts:29](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/a7ee247/src/toHave/types.ts#L29)*

default is anyOf. Note that you can resolve "noneOf" using not()

___

## Methods

<a id="matchelementcount"></a>

### `<Optional>` matchElementCount

▸ **matchElementCount**(n: *`number`*): `boolean`

*Defined in [toHave/types.ts:26](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/a7ee247/src/toHave/types.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `boolean`

___

