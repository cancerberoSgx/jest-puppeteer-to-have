import { Page } from 'puppeteer'
import { ToHave } from '../toHave/toHave'
import { ToOptions } from './types'

declare global {
  namespace jest {
    interface Matchers<R> {
      to(options: ToOptions): R
    }
  }
}

/**
 * more general than toHave yet. This is mostly for testing toHave purposes - create els, trigger events, etc. Perhaps n future we can join them all to a even more generic tool
 * */
expect.extend({
  async to(page: Page, options: ToOptions) {
    if (options.action === 'have') {
      const toHave = new ToHave(this)
      const selector = options.selector
      if (!selector) {
        throw 'have action requires selector option'
      }
      return toHave.toHave(page, { ...options, selector })
    } else if (options.action === 'edit') {
      if (options.editMode === 'create') {
        const createOptions = {
          ...{ tagName: 'div', parent: 'body', innerHTML: '', attrs: {} },
          ...(options.create || {}),
        }
        const r = await page.evaluate(e => {
          try {
            const d = document.createElement(e.tagName)
            d.innerHTML = e.innerHTML
            Object.entries(e.attrs).forEach(a => d.setAttribute(a[0], a[1]))
            document.querySelector(e.parent).appendChild(d)
          } catch (error) {
            return error + ''
          }
          return undefined
        }, createOptions)
        return {
          pass: this.isNot ? !!r : !r,
          message: `expected page ${this.isNot ? 'not ' : ''}to create element ${JSON.stringify(options)}`,
        }
      } else {
        throw `edit mode ${options.editMode} not impl yet`
      }
    } else if (options.action === 'trigger') {
      throw `action trigger not impl yet`
    } else {
      throw `action ${options.action} invalid`
    }
  },
})
