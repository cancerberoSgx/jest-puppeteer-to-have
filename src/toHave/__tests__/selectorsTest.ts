import '../toHave'
import '../../to/to'

describe('toHave', () => {
  beforeAll(async () => {
    const url = `file://${process.cwd()}/assets/static1/index.html`
    await page.goto(url)
  })
  it('should get title', async () => {
    expect(await page.title()).toBe('test1')
  })
  beforeEach(async () => {
    await expect(page).to({
      selector: 'body',
      innerHTML: '',
    })
  })

  describe('selectors', () => {
    it('not.toHave and toHave', async () => {
      await expect(page).not.toHave({selector: 'p'})
      await expect(page).not.toHave({selector: 'p', text: 'hello'})
      await expect(page).to({
        create: true,
        parent: 'body',
        tagName: 'p',
        attrs: {id: 'foo'},
        innerHTML: 'hello',
      })
      await expect(page).toHave({selector: 'p'})
      await expect(page).toHave({selector: 'p', text: 'hello'})
    })
  })

  describe('waitFor', () => {
    it('should wait for element', async () => {
      await expect(page).not.toHave({selector: '#t2', text: 'world'})
      setTimeout(async () => {
        await expect(page).to({
          create: true,
          tagName: 'p',
          attrs: {id: 't2'},
          innerHTML: 'world',
          parent: 'body',
        })
      }, 100)
      await expect(page).not.toHave({selector: '#t2', text: 'world'})
      await expect(page).toHave({selector: '#t2', text: 'world', waitFor: true})
    })
  })
})
