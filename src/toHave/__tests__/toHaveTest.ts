import '../..'
import '../../toEdit/toEdit'

describe('toHave', () => {
  beforeAll(async () => {
    const url = `file://${process.cwd()}/assets/static1/index.html`
    await page.goto(url)
  })

  beforeEach(async () => {
    await expect(page).toEdit({
      selector: 'body',
      innerHTML: '',
    })
  })

  it('should get title', async () => {
    expect(await page.title()).toBe('test1')
  })

  describe('selectors', () => {
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
      await expect(page).toHave({selector: '#t2', text: 'world', waitFor: true})
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
      await expect(page).not.toHave({selector: '[data-id="foo"]', text: 'seba', waitFor: true})
      await expect(page).not.toHave({selector: '[data-id="foo"]', text: 'seba'})
    })
  })
})
