import {Page} from 'puppeteer'
import {ToHaveOptions} from './types'
import {ToHave} from './toHave'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHave(options: ToHaveOptions): R
    }
  }
}

/**
 * A general HTML element query utility with emphasis on matching text.
 *
 * Has options to configure element selection and text extraction and value comparison.
 *
 * The only required configuration property is "selector".
 *
 * Based on this other more-meaningful expects can be easily built, so is not an objective
 * to have a simple/clear API
 * but to be flexible enough for implement most cases with a single call
 * */
expect.extend({
  async toHave(page: Page, options: ToHaveOptions) {
    const toHave = new ToHave(this)
    return toHave.toHave(page, options)
  },
})
