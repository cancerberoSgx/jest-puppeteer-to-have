[jest-puppeteer-to-have](../README.md) > ["toHave/types"](../modules/_tohave_types_.md) > [ToHaveOptions](../interfaces/_tohave_types_.tohaveoptions.md)

# Interface: ToHaveOptions

## Hierarchy

 [TextCompareOptions](_tohave_types_.textcompareoptions.md)

 [ElementSelectorOptions](_tohave_types_.elementselectoroptions.md)

 [AttributeOptions](_tohave_types_.attributeoptions.md)

 [TreeOptions](_tohave_types_.treeoptions.md)

**↳ ToHaveOptions**

## Index

### Properties

* [ancestor](_tohave_types_.tohaveoptions.md#ancestor)
* [asCode](_tohave_types_.tohaveoptions.md#ascode)
* [attributes](_tohave_types_.tohaveoptions.md#attributes)
* [attributesMultiplicity](_tohave_types_.tohaveoptions.md#attributesmultiplicity)
* [attributesNamed](_tohave_types_.tohaveoptions.md#attributesnamed)
* [attributesValued](_tohave_types_.tohaveoptions.md#attributesvalued)
* [caseInsensitive](_tohave_types_.tohaveoptions.md#caseinsensitive)
* [children](_tohave_types_.tohaveoptions.md#children)
* [descendant](_tohave_types_.tohaveoptions.md#descendant)
* [extractAs](_tohave_types_.tohaveoptions.md#extractas)
* [matchElementCountDescription](_tohave_types_.tohaveoptions.md#matchelementcountdescription)
* [matchPattern](_tohave_types_.tohaveoptions.md#matchpattern)
* [parent](_tohave_types_.tohaveoptions.md#parent)
* [selector](_tohave_types_.tohaveoptions.md#selector)
* [selectorMultiplicity](_tohave_types_.tohaveoptions.md#selectormultiplicity)
* [sibling](_tohave_types_.tohaveoptions.md#sibling)
* [text](_tohave_types_.tohaveoptions.md#text)
* [textCompareMode](_tohave_types_.tohaveoptions.md#textcomparemode)
* [waitForSelector](_tohave_types_.tohaveoptions.md#waitforselector)

### Methods

* [matchElementCount](_tohave_types_.tohaveoptions.md#matchelementcount)

---

## Properties

<a id="ancestor"></a>

### `<Optional>` ancestor

**● ancestor**: *[ToHaveOptions](_tohave_types_.tohaveoptions.md)*

*Inherited from [TreeOptions](_tohave_types_.treeoptions.md).[ancestor](_tohave_types_.treeoptions.md#ancestor)*

*Defined in [toHave/types.ts:50](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L50)*

___
<a id="ascode"></a>

### `<Optional>` asCode

**● asCode**: *`undefined` \| `false` \| `true`*

*Inherited from [TextCompareOptions](_tohave_types_.textcompareoptions.md).[asCode](_tohave_types_.textcompareoptions.md#ascode)*

*Defined in [toHave/types.ts:16](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L16)*

___
<a id="attributes"></a>

### `<Optional>` attributes

**● attributes**: *[ToHaveAttribute](_tohave_types_.tohaveattribute.md)[][]*

*Inherited from [AttributeOptions](_tohave_types_.attributeoptions.md).[attributes](_tohave_types_.attributeoptions.md#attributes)*

*Defined in [toHave/types.ts:38](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L38)*

___
<a id="attributesmultiplicity"></a>

### `<Optional>` attributesMultiplicity

**● attributesMultiplicity**: *[Multiplicity](../modules/_tohave_types_.md#multiplicity)*

*Inherited from [AttributeOptions](_tohave_types_.attributeoptions.md).[attributesMultiplicity](_tohave_types_.attributeoptions.md#attributesmultiplicity)*

*Defined in [toHave/types.ts:41](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L41)*

default is anyOf

___
<a id="attributesnamed"></a>

### `<Optional>` attributesNamed

**● attributesNamed**: *`string`[][]*

*Inherited from [AttributeOptions](_tohave_types_.attributeoptions.md).[attributesNamed](_tohave_types_.attributeoptions.md#attributesnamed)*

*Defined in [toHave/types.ts:37](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L37)*

___
<a id="attributesvalued"></a>

### `<Optional>` attributesValued

**● attributesValued**: *`string`[]*

*Inherited from [AttributeOptions](_tohave_types_.attributeoptions.md).[attributesValued](_tohave_types_.attributeoptions.md#attributesvalued)*

*Defined in [toHave/types.ts:39](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L39)*

___
<a id="caseinsensitive"></a>

### `<Optional>` caseInsensitive

**● caseInsensitive**: *`undefined` \| `false` \| `true`*

*Inherited from [TextCompareOptions](_tohave_types_.textcompareoptions.md).[caseInsensitive](_tohave_types_.textcompareoptions.md#caseinsensitive)*

*Defined in [toHave/types.ts:13](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L13)*

___
<a id="children"></a>

### `<Optional>` children

**● children**: *[ToHaveOptions](_tohave_types_.tohaveoptions.md)*

*Inherited from [TreeOptions](_tohave_types_.treeoptions.md).[children](_tohave_types_.treeoptions.md#children)*

*Defined in [toHave/types.ts:47](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L47)*

___
<a id="descendant"></a>

### `<Optional>` descendant

**● descendant**: *[ToHaveOptions](_tohave_types_.tohaveoptions.md)*

*Inherited from [TreeOptions](_tohave_types_.treeoptions.md).[descendant](_tohave_types_.treeoptions.md#descendant)*

*Defined in [toHave/types.ts:49](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L49)*

___
<a id="extractas"></a>

### `<Optional>` extractAs

**● extractAs**: *[ExtractAs](../modules/_tohave_types_.md#extractas)*

*Inherited from [TextCompareOptions](_tohave_types_.textcompareoptions.md).[extractAs](_tohave_types_.textcompareoptions.md#extractas)*

*Defined in [toHave/types.ts:17](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L17)*

___
<a id="matchelementcountdescription"></a>

### `<Optional>` matchElementCountDescription

**● matchElementCountDescription**: *`undefined` \| `string`*

*Inherited from [ElementSelectorOptions](_tohave_types_.elementselectoroptions.md).[matchElementCountDescription](_tohave_types_.elementselectoroptions.md#matchelementcountdescription)*

*Defined in [toHave/types.ts:27](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L27)*

___
<a id="matchpattern"></a>

### `<Optional>` matchPattern

**● matchPattern**: *`RegExp`*

*Inherited from [TextCompareOptions](_tohave_types_.textcompareoptions.md).[matchPattern](_tohave_types_.textcompareoptions.md#matchpattern)*

*Defined in [toHave/types.ts:15](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L15)*

___
<a id="parent"></a>

### `<Optional>` parent

**● parent**: *`undefined` \| `string`*

*Inherited from [ElementSelectorOptions](_tohave_types_.elementselectoroptions.md).[parent](_tohave_types_.elementselectoroptions.md#parent)*

*Defined in [toHave/types.ts:24](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L24)*

parent.querySelectorAll() or use document if not given

___
<a id="selector"></a>

###  selector

**● selector**: *`string`*

*Inherited from [ElementSelectorOptions](_tohave_types_.elementselectoroptions.md).[selector](_tohave_types_.elementselectoroptions.md#selector)*

*Defined in [toHave/types.ts:25](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L25)*

___
<a id="selectormultiplicity"></a>

### `<Optional>` selectorMultiplicity

**● selectorMultiplicity**: *[Multiplicity](../modules/_tohave_types_.md#multiplicity)*

*Inherited from [ElementSelectorOptions](_tohave_types_.elementselectoroptions.md).[selectorMultiplicity](_tohave_types_.elementselectoroptions.md#selectormultiplicity)*

*Defined in [toHave/types.ts:29](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L29)*

default is anyOf. Note that you can resolve "noneOf" using not()

___
<a id="sibling"></a>

### `<Optional>` sibling

**● sibling**: *[ToHaveOptions](_tohave_types_.tohaveoptions.md)*

*Inherited from [TreeOptions](_tohave_types_.treeoptions.md).[sibling](_tohave_types_.treeoptions.md#sibling)*

*Defined in [toHave/types.ts:48](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L48)*

___
<a id="text"></a>

### `<Optional>` text

**● text**: *`undefined` \| `string`*

*Inherited from [TextCompareOptions](_tohave_types_.textcompareoptions.md).[text](_tohave_types_.textcompareoptions.md#text)*

*Defined in [toHave/types.ts:12](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L12)*

___
<a id="textcomparemode"></a>

### `<Optional>` textCompareMode

**● textCompareMode**: *[TextCompareMode](../modules/_tohave_types_.md#textcomparemode)*

*Inherited from [TextCompareOptions](_tohave_types_.textcompareoptions.md).[textCompareMode](_tohave_types_.textcompareoptions.md#textcomparemode)*

*Defined in [toHave/types.ts:14](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L14)*

___
<a id="waitforselector"></a>

### `<Optional>` waitForSelector

**● waitForSelector**: *`boolean` \| `string`*

*Defined in [toHave/types.ts:3](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L3)*

call `page.waitFor` before selecting. if a string that selector will be used on the call, and "selector" otherwise. If isNot then we wait for the elements matching selector to be hidden.

___

## Methods

<a id="matchelementcount"></a>

### `<Optional>` matchElementCount

▸ **matchElementCount**(n: *`number`*): `boolean`

*Inherited from [ElementSelectorOptions](_tohave_types_.elementselectoroptions.md).[matchElementCount](_tohave_types_.elementselectoroptions.md#matchelementcount)*

*Defined in [toHave/types.ts:26](https://github.com/cancerberoSgx/jest-puppeteer-to-have/blob/b64ec82/src/toHave/types.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `boolean`

___

