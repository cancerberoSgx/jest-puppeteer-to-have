import {Page} from 'puppeteer'
import {shorter} from '../util'
import {ToHaveOptions, TextCompareOptions, ExtractAs} from './types'

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
    let result: jest.CustomMatcherResult | undefined

    result = await this.waitFor(page, options)
    if (result) {
      return result
    }

    // EVALUATE - element information extraction
    const r = await this.evaluate(page, options)

    result = await this.assertEvaluateResult(page, options, r)
    if (result) {
      return result
    }

    if (typeof r === 'string') {
      throw ''
    } // just for cheat typescript

    result = await this.assertAttributes(page, options, r)
    if (result) {
      return result
    }

    result = await this.assertText(page, options, r)
    if (result) {
      return result
    }
    return {
      pass: true,
      message: () => `expected page not to have element that matches "${options.selector}"`,
    }
  }

  private async assertEvaluateResult(
    page: Page,
    options: ToHaveOptions,
    r: string | EvaluateResultElement[],
  ): Promise<jest.CustomMatcherResult | undefined> {
    if (typeof r === 'string') {
      return {
        pass: false,
        message: () =>
          `expected page ${this.context.isNot ? 'not ' : ''}to have element that matches "${
            options.selector
          }" but it thrown "${r}"`,
      }
    }
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
  }

  /** attribute comparison - WIP - only anyOf and exact - case insensitive comparison supported*/
  private async assertAttributes(
    page: Page,
    options: ToHaveOptions,
    r: EvaluateResultElement[],
  ): Promise<jest.CustomMatcherResult | undefined> {
    if (options.attributes) {
      const pass = r.find(
        e =>
          !!e.attrs.find(
            a =>
              !!options.attributes!.find(
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
              options.attributes!,
            )}" but instead " ${JSON.stringify(r.map(e => e.attrs))}" were found`,
        }
      }
    }
  }

  /**
   * Text comparison.
   * TODO. join several elements test configuration ?
   * TODO: support multiplicity - we are not supporting nothing with this!
   */
  private async assertText(
    page: Page,
    options: ToHaveOptions,
    r: EvaluateResultElement[],
  ): Promise<jest.CustomMatcherResult | undefined> {
    //
    if (options.text) {
      let expected = buildValue(options.text, options)
      const actual = buildValue(r.map(e => e.text).join(' '), options)
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
    }
  }

  private async waitFor(page: Page, options: ToHaveOptions): Promise<jest.CustomMatcherResult | undefined> {
    if (options.waitFor) {
      const waitForSelector = typeof options.waitFor === 'string' ? options.waitFor : options.selector
      try {
        await page.waitFor(waitForSelector, {hidden: this.context.isNot})
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
  }

  private async evaluate(page: Page, options: ToHaveOptions): EvaluateResult {
    return await page.evaluate(
      (selector: string, extractAs: ExtractAs, parent?: string) => {
        try {
          const els = (parent ? document.querySelector(parent) : document)!.querySelectorAll(selector)
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
        } catch (error) {
          return error + ''
        }
      },
      options.selector,
      options.extractAs || 'outerHTML',
      options.parent || null,
    )
  }
}

interface EvaluateResultElement {
  text: string | undefined
  tagName: string
  attrs: {
    name: string
    value: string
  }[]
}
type EvaluateResult = Promise<string | EvaluateResultElement[]>
