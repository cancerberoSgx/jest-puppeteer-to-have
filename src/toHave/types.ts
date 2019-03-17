export interface ToHaveOptions extends TextCompareOptions, ElementSelectorOptions, AttributeOptions, TreeOptions {
  /** call `page.waitFor` before selecting. if a string that selector will be used on the call, and "selector" otherwise. If isNot then we wait for the elements matching selector to be hidden. */
  waitForSelector?: boolean | string
}

type TextCompareMode = 'toContain' | 'toBeContainedBy' | 'equals' | 'startsWith' | 'endsWith'

export type ExtractAs = 'innerHTML' | 'outerHTML' | 'textContent' | 'innerText'

/** this apply not only to Text content but also to attribute values and any textual value */
export interface TextCompareOptions {
  text?: string
  caseInsensitive?: boolean
  textCompareMode?: TextCompareMode // WIP
  matchPattern?: RegExp //TODO
  asCode?: boolean
  extractAs?: ExtractAs
}

type Multiplicity = 'anyOf' | 'allOf'

interface ElementSelectorOptions {
  /** parent.querySelectorAll() or use document if not given */
  parent?: string
  selector: string
  matchElementCount?(n: number): boolean
  matchElementCountDescription?: string
  /** default is anyOf. Note that you can resolve "noneOf" using not() */
  selectorMultiplicity?: Multiplicity // TODO
}

interface AttributeOptions {
  attributesNamed?: string[] //TODO
  attributes?: {
    name: string
    value: string
  }[] //TODO
  attributesValued?: string[] //TODO
  /** default is anyOf */
  attributesMultiplicity?: Multiplicity //TODO
}

/** TODO: */
interface TreeOptions {
  // parent?: ToHaveOptions // TODO
  children?: ToHaveOptions // TODO
  sibling?: ToHaveOptions // TODO
  descendant?: ToHaveOptions // TODO
  ancestor?: ToHaveOptions // TODO
}
