import {Page} from 'puppeteer'
import {ToEditOptions} from './types'
import {ToEdit} from './toEdit'
let install = 1
declare global {
  namespace jest {
    interface Matchers<R> {
      toEdit(options: ToEditOptions): R
    }
  }
}
expect.extend({
  async toEdit(page: Page, options: ToEditOptions) {
    const toEdit = new ToEdit(this)
    return toEdit.toEdit(page, options)
  },
})
