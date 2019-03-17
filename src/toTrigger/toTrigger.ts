import {Page} from 'puppeteer'
import {ToTriggerOptions} from './types'
import {eventAuxFunctions, EventTool} from './event'

export class ToTrigger {
  constructor(protected context: jest.MatcherUtils) {}

  async toTrigger(page: Page, options: ToTriggerOptions) {
    let r: jest.CustomMatcherResult | undefined

    r = await this.event(options)
    if (r) {
      return r
    }

    r = await this.check(options)
    if (r) {
      return r
    }

    r = await this.selectAllText(options)
    if (r) {
      return r
    }

    r = await this.clearAllText(options)
    if (r) {
      return r
    }

    r = await this.enterText(options)
    if (r) {
      return r
    }

    return {
      pass: true,
      message: () => `not implemented yet`,
    }
  }

  async selectAllText(options: ToTriggerOptions): Promise<jest.CustomMatcherResult | undefined> {
    if (options.selectAllText) {
      try {
        await expect(page).toClick(options.selector)
        await page.keyboard.down('Control')
        await page.keyboard.press('a')
        await page.keyboard.up('Control')
      } catch (e) {
        return {
          pass: false,
          message: () =>
            `expect page to select all text of element "${options.selector}" without error but thrown "${e}"`,
        }
      }
    }
  }

  async clearAllText(options: ToTriggerOptions): Promise<jest.CustomMatcherResult | undefined> {
    if (options.clearAllText) {
      try {
        const r = await this.selectAllText(options)
        if (r) {
          return r
        }
        await page.keyboard.press('Backspace')
      } catch (e) {
        return {
          pass: false,
          message: () =>
            `expect page to clear all text of element "${options.selector}" without error but thrown "${e}"`,
        }
      }
    }
  }
  async enterText(options: ToTriggerOptions): Promise<jest.CustomMatcherResult | undefined> {
    if (options.enterText) {
      try {
        await expect(page).toClick(options.selector)
        await Promise.all(
          options.enterText.split('').map(async c => {
            return await page.keyboard.press(c, {delay: 100})
          }),
        )
      } catch (e) {
        return {
          pass: false,
          message: () =>
            `expect page to enter text "${options.enterText} on element "${
              options.selector
            }" without error but thrown "${e}"`,
        }
      }
    }
  }

  async check(options: ToTriggerOptions): Promise<jest.CustomMatcherResult | undefined> {
    if (typeof options.check !== 'undefined') {
      const eventOptions = {
        selector: options.selector,
        check: options.check!,
      }
      const r = await page.evaluate(
        (opts: typeof eventOptions, auxFns) => {
          try {
            const tool: EventTool = eval(auxFns)
            const el = document.querySelector<HTMLInputElement>(opts.selector)!
            tool.check(el, opts.check)
          } catch (error) {
            return error + ''
          }
        },
        eventOptions,
        eventAuxFunctions,
      )
      if (r) {
        return {
          pass: false,
          message: () => `expect page to check element "${options.selector}" ${r ? `thrown "${r}"` : ''}`,
        }
      }
    }
  }

  async event(options: ToTriggerOptions): Promise<jest.CustomMatcherResult | undefined> {
    if (options.event) {
      const eventOptions = {
        selector: options.selector,
        event: options.event!,
      }
      const r = await page.evaluate(
        (opts: typeof eventOptions, auxFns) => {
          try {
            const tool: EventTool = eval(auxFns)
            tool.fireEvent(document.querySelector(opts.selector)!, opts.event)
          } catch (error) {
            return error + ''
          }
        },
        eventOptions,
        eventAuxFunctions,
      )

      if (r) {
        return {
          pass: false,
          message: () =>
            `expect page to fire event ${options.event} on element "${options.selector}" ${r ? `thrown "${r}"` : ''}`,
        }
      }
    }
  }
}
