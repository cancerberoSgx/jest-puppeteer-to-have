import { Page } from 'puppeteer'
import { shorter } from '../util'
import { ToHaveOptions, TextCompareOptions, ExtractAs } from './types'

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

function buildValue(text: string, options: TextCompareOptions) {
  if (options.caseInsensitive) {
    text = text.toLowerCase()
  }
  if (options.asCode) {
    text = text.replace(/\s+/g, ' ').trim()
  }
  return text
}
export class ToHave {
  constructor(protected context: jest.MatcherUtils) {}

  async toHave(page: Page, options: ToHaveOptions) {
    if (options.waitFor) {
      const waitForSelector = typeof options.waitFor === 'string' ? options.waitFor : options.selector
      try {
        await page.waitFor(waitForSelector, { hidden: this.context.isNot })
      } catch (error) {
        return {
          pass: false,
          message: () =>
            this.context.isNot
              ? `expected page to no longer have elements matching "${waitForSelector}" after waiting for"`
              : `expected page to contain element matching "${waitForSelector}" after waiting for"`,
        }
      }
    }

    // EVALUATE - element information extraction
    const r = await page.evaluate(
      (selector: string, extractAs: ExtractAs) => {
        const els = document.querySelectorAll(selector)
        const matched = Array.from(els).map(e => {
          let text: string | undefined = undefined
          if (extractAs === 'innerHTML') {
            text = e.innerHTML
          } else if (extractAs === 'outerHTML') {
            text = e.outerHTML
          } else if (extractAs === 'textContent') {
            text = e.textContent || ''
          } else if (extractAs === 'innerText') {
            text = (e as HTMLElement).innerText
          }
          return {
            text,
            tagName: e.tagName,
            attrs: Array.from(e.attributes).map(a => ({
              name: a.name,
              value: a.value + '',
            })),
          }
        })
        return matched
      },
      options.selector,
      options.extractAs || 'outerHTML',
    )

    // basic undefined and element count matching
    if (!r || (!r.length && !options.matchElementCount)) {
      return {
        pass: false,
        message: () => `expected page to have element that matches "${options.selector}"`,
      }
    }
    if (options.matchElementCount && !options.matchElementCount(r.length)) {
      return {
        pass: false,
        message: () =>
          `expected page to have ${options.matchElementCountDescription ||
            shorter(options.matchElementCount!.toString(), 50)} elements matching "${options.selector}" but ${
            r.length
          } found`,
      }
    }

    // attribute comparision - WIP - only anyOf and exact - case insentitive comparission supported
    if (options.toHaveAttributes) {
      const pass = r.find(
        e =>
          !!e.attrs.find(
            a =>
              !!options.toHaveAttributes!.find(
                expected =>
                  a.name.toLowerCase() === expected.name.toLowerCase() &&
                  a.value.toLowerCase() === expected.value.toLowerCase(),
              ),
          ),
      )
      if (!pass) {
        return {
          pass: false,
          message: () =>
            `expected page to have an element "${options.selector}" containing any attributes of ${JSON.stringify(
              options.toHaveAttributes!,
            )}" but instead " ${JSON.stringify(r.map(e => e.attrs))}" were found`,
        }
      }
    }

    // text comparison
    if (options.text) {
      let expected = buildValue(options.text, options)
      // TODO. join several elements test configuration ?
      const actual = buildValue(r.map(e => e.text).join(' '), options) //TODO: support multiplicity - we are not supporting nothing with this!

      if (options.textCompareMode === 'equals') {
        if (expected != actual) {
          return {
            pass: false,
            message: () =>
              `expected page to have an element "${
                options.selector
              }" with text equals to "${expected}" but "${actual}" was found instead`,
          }
        } else {
          return {
            pass: true,
            message: () =>
              `expected page not to have an element "${options.selector}" with text equals to "${expected}"`,
          }
        }
      } else if (!options.textCompareMode || options.textCompareMode === 'toContain') {
        if (!actual.includes(expected)) {
          return {
            pass: false,
            message: () =>
              `expected page to have an element "${
                options.selector
              }" text including "${expected}" but "${actual}" was found instead `,
          }
        } else {
          return {
            pass: true,
            message: () =>
              `expected page not to have an element "${options.selector}" with text including "${expected}"`,
          }
        }
      } else {
        return {
          pass: false,
          message: () => `Matcher toHave() implementation is not finished yet`,
        }
      }
    } else {
      return {
        pass: true,
        message: () => `expected page not to have element that matches "${options.selector}"`,
      }
    }
  }
}
