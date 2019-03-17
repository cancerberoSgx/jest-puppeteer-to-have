export interface ToHaveOptions extends TextCompareOptions, ElementSelectorOptions, AttributeOptions, TreeOptions {
  /** call `page.waitFor` before selecting. if a string that selector will be used on the call, and "selector" otherwise. If isNot then we wait for the elements matching selector to be hidden. */
  waitFor?: boolean | string;
}


type Verb = 'toContain' | 'toBeContainedBy' | 'equals' | 'startsWith' | 'endsWith';

export type ExtractAs = 'innerHTML' | 'outerHTML' | 'textContent' | 'innerText';

/** this apply not only to Text content but also to attribute values and any textual value */
export interface TextCompareOptions {
  text?: string;
  caseInsensitive?: boolean;
  textCompareMode?: Verb; // WIP
  matchPattern?: RegExp; //TODO
  asCode?: boolean;
  extractAs?: ExtractAs;
}

interface ElementSelectorOptions {
  selector: string;
  matchElementCount?(n: number): boolean;
  matchElementCountDescription?: string;
  /** default is anyOf. Note that you can resolve "noneOf" using not() */
  selectorMultiplicity?: 'anyOf' | 'allOf'; // TODO
}

interface AttributeOptions {
  toHaveAttributesNamed?: string[]; //TODO
  toHaveAttributes?: {
    name: string;
    value: string;
  }[]; //TODO
  toHaveAttributesValued?: string[]; //TODO
  /** default is anyOf */
  toHaveAttributesMultiplicity?: 'anyOf' | 'allOf'; //TODO
}

/** TODO: */
interface TreeOptions {
  toHaveParent?: ToHaveOptions; // TODO
  toHaveChildren?: ToHaveOptions; // TODO
  toHaveSibling?: ToHaveOptions; // TODO
  toHaveDescendant?: ToHaveOptions; // TODO
  toHaveAncestor?: ToHaveOptions; // TODO
}
