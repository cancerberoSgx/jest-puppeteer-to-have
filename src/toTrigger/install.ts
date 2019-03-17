import {Page} from 'puppeteer'
import {ToTriggerOptions} from './types'
import {ToTrigger} from './toTrigger'
declare global {
  namespace jest {
    interface Matchers<R> {
      toTrigger(options: ToTriggerOptions): R
    }
  }
}
expect.extend({
  async toTrigger(page: Page, options: ToTriggerOptions) {
    const toTrigger = new ToTrigger(this)
    return toTrigger.toTrigger(page, options)
  },
})
