import {Page} from 'puppeteer'
import {ToHave} from '../toHave/toHave'
import {ToOptions, ToEditOptions} from './types'

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
    // toHave
    // if (options.action === 'have') {
    //   const toHave = new ToHave(this)
    //   const selector = options.selector
    //   if (!selector) {
    //     throw 'have action requires selector option'
    //   }
    //   return toHave.toHave(page, {...options, selector})
    // }

    // // toEdit
    // else if (options.action === 'edit') {
    // toEdit create
    // if (options.edit === 'create') {
    // const opts = {tagName: options.tagName || 'div', parent: options.parent || 'body', attrs: options.attrs || {}, innerHTML: options.innerHTML||''}
    // const r = await page.evaluate(opts => {
    //   try {
    //     const d = document.createElement(opts.tagName)
    //     d.innerHTML = opts.innerHTML
    //     Object.entries(opts.attrs).forEach(a => d.setAttribute(a[0], a[1]))
    //     document.querySelector(opts.parent).appendChild(d)
    //   } catch (error) {
    //     return error + ''
    //   }
    //   return undefined
    // }, opts)
    // return {
    //   pass: this.isNot ? !!r : !r,
    //   message: `expected page ${this.isNot ? 'not ' : ''}to create element ${JSON.stringify(options)}`,
    // }
    // }

    // toEdit change
    // else  if (options.edit === 'change') {
    const selector = options.selector
    if (!selector && !options.create) {
      throw 'toEdit requires selector option if create is false'
    }
    const changeOpts = {
      selector: selector || 'body',
      parent: options.parent || null,
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
          // d.innerHTML = opts.innerHTML
          // Object.entries(opts.attrs).forEach(a => d!.setAttribute(a[0], a[1]))
          // document.querySelector(opts.parent)!.appendChild(d)
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
  // else {
  // throw `edit mode ${options.edit} not impl yet`
  // }
  // }

  // // toChange
  // if (options.edit === 'change') {
  //   throw `edit mode ${options.edit} not impl yet`
  // } else if (options.action === 'trigger') {
  //   throw `action trigger not impl yet`
  // } else {
  //   throw `action ${options.action} invalid`
  // }
  // },
})
