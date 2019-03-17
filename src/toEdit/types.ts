export interface ToEditOptions extends ElementOptions {
  appendChildren?: ElementOptions[]
  remove?: true
  appendToParent?: string
  create?: boolean
}

interface ElementOptions {
  selector?: string
  tagName?: string
  parent?: string
  innerHTML?: string
  attrs?: {
    [a: string]: string
  }
}
