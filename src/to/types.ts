import { ToHaveOptions } from '../toHave/types'

export interface ToOptions extends Partial<ToHaveOptions>, Partial<ToEditOptions> {
  action: 'have' | 'edit' | 'trigger'
}

export interface ToEditOptions {
  editMode: 'create' | 'remove' | 'replace' | 'change'
  create?: {
    tagName?: string
    parent?: string
    innerHTML?: string
    attrs?: {
      [a: string]: string
    }
  }
}
