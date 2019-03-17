import '../..'
import {beforeEachDefault} from '../../util'

describe('toHave', () => {
  beforeAll(async () => {
    const url = `file://${process.cwd()}/assets/static1/index.html`
    await page.goto(url)
  })
  beforeEachDefault()

  it('should get title', async () => {
    expect(await page.title()).toBe('test1')
  })

  describe('selectors', () => {
    beforeEachDefault()
    it('not.toHave and toHave', async () => {
      await expect(page).not.toHave({selector: 'p'})
      await expect(page).not.toHave({selector: 'p', text: 'hello'})
      await expect(page).toEdit({
        create: true,
        tagName: 'p',
        attrs: {id: 'foo'},
        innerHTML: 'hello',
      })
      await expect(page).toHave({selector: 'p'})
      await expect(page).toHave({selector: 'p', text: 'hello'})
      await expect(page).not.toHave({selector: 'p', text: 'hello2'})
      await expect(page).not.toHave({selector: 'span'})
    })
  })

  describe('waitFor', () => {
    beforeEachDefault()

    it('should wait for element', async () => {
      await expect(page).not.toHave({selector: '#t2', text: 'world'})
      setTimeout(async () => {
        await expect(page).toEdit({
          create: true,
          tagName: 'p',
          attrs: {id: 't2'},
          innerHTML: 'world',
        })
      }, 100)
      await expect(page).not.toHave({selector: '#t2', text: 'world'})
      await expect(page).toHave({selector: '#t2', text: 'world', waitForSelector: true})
      await expect(page).toHave({selector: '#t2', text: 'world'})
    })

    it('should wait for element to be hidden if using with .not', async () => {
      await expect(page).not.toHave({selector: '[data-id="foo"]', text: 'seba'})
      await expect(page).toEdit({
        create: true,
        tagName: 'span',
        attrs: {'data-id': 'foo'},
        innerHTML: 'seba',
      })
      await expect(page).toHave({selector: '[data-id="foo"]', text: 'seba'})
      setTimeout(async () => {
        await expect(page).toEdit({
          selector: '[data-id="foo"]',
          remove: true,
        })
      }, 100)
      async function f() {
        await expect(page).not.toHave({selector: '[data-id="foo"]', text: 'seba'})
      }
      await expect(page).toHave({selector: '[data-id="foo"]', text: 'seba'})
      await expect(page).not.toHave({selector: '[data-id="foo"]', text: 'seba', waitForSelector: true})
      await expect(page).not.toHave({selector: '[data-id="foo"]', text: 'seba'})
    })
  })

  describe('attributes', () => {
    beforeEachDefault()
    it('should assert on attribute', async () => {
      await expect(page).toEdit({
        create: true,
        innerHTML: `<p id="i1">`,
      })
      await expect(page).not.toHave({
        selector: '#i1',
        attributes: [[{name: 'foo', value: 'i1'}]],
      })
      await expect(page).not.toHave({
        selector: '#i1',
        attributes: [[{name: 'id', value: 'foo'}]],
      })
      await expect(page).toHave({
        selector: '#i1',
        attributes: [[{name: 'id', value: 'i1'}]],
      })
    })
    it('should assert on named attribute', async () => {
      await expect(page).toEdit({
        create: true,
        innerHTML: `<p id="i2">`,
      })
      await expect(page).not.toHave({
        selector: '#i2',
        attributesNamed: [['foo']],
      })
      await expect(page).toHave({
        selector: '#i2',
        attributesNamed: [['id']],
      })
    })
  })
})
