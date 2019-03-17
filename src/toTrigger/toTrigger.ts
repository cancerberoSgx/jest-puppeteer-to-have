import {Page} from 'puppeteer'
import {ToTriggerOptions} from './types'
import {eventAuxFunctions, EventTool} from './event'

export class ToTrigger {
  constructor(protected context: jest.MatcherUtils) {}

  async toTrigger(page: Page, options: ToTriggerOptions) {
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

      return {
        pass: !r,
        message: () => `expect page to check element "${options.selector}" ${r ? `thrown "${r}"` : ''}`,
      }
    }
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

      return {
        pass: !r,
        message: () =>
          `expect page to fire event ${options.event} on element "${options.selector}" ${r ? `thrown "${r}"` : ''}`,
      }
    }
    return {
      pass: true,
      message: () => `not implemented yet`,
    }
  }
}
