import {ToHaveOptions} from '../toHave/types'

export interface ToOptions extends Partial<ToHaveOptions>, Partial<ToEditOptions> {
  // action: 'have' | 'edit' | 'trigger'
}

export interface ToEditOptions extends toEditOptions {
  // edit: 'create' |  'change'
}

interface toEditOptions {
  tagName?: string
  parent?: string
  innerHTML?: string
  attrs?: {
    [a: string]: string
  }
  appendChildren?: toEditOptions[]
  remove?: true
  appendToParent?: string
  create?: boolean
}
