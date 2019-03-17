import {Page} from 'puppeteer'
import {ToEditOptions} from './types'

declare global {
  namespace jest {
    interface Matchers<R> {
      toEdit(options: ToEditOptions): R
    }
  }
}

/**
 * more general than toHave yet. This is mostly for testing toHave purposes - create els, trigger events, etc. Perhaps n future we can join them all to a even more generic tool
 * */
expect.extend({
  async toEdit(page: Page, options: ToEditOptions) {
    const selector = options.selector
    if (!selector && !options.create) {
      throw 'toEdit requires selector option if create is false'
    }
    const changeOpts = {
      selector: selector || null,
      parent: options.parent || options.create ? 'body' : null,
      attrs: options.attrs || {},
      innerHTML: options.innerHTML || '',
      remove: options.remove || false,
      create: options.create || false,
      tagName: options.tagName || 'div',
    }

    const r = await page.evaluate((opts: typeof changeOpts) => {
      try {
        let d: HTMLElement | undefined
        if (opts.create) {
          d = document.createElement(opts.tagName)
        }
        const els = d ? [d] : document.querySelectorAll(opts.selector!)
        Array.from(els).forEach(e => {
          if (opts.innerHTML) {
            e.innerHTML = opts.innerHTML
          }
          if (opts.remove) {
            e.remove()
          }
          if (opts.attrs) {
            Object.entries(opts.attrs).forEach(a => e.setAttribute(a[0], a[1]))
          }
          if (opts.parent) {
            document.querySelector(opts.parent)!.appendChild(e)
          }
          //TODO the rest
        })
      } catch (error) {
        return error + ''
      }
      return undefined
    }, changeOpts)

    return {
      pass: this.isNot ? !!r : !r,
      message: () =>
        `expected page ${this.isNot ? 'not ' : ''}to create element ${JSON.stringify(
          options,
        )} without errors but got "${r}"`,
    }
  },
})
