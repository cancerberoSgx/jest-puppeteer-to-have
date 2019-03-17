import '../../toHave/toHave'
import '../toEdit'

describe('toHave selectors', () => {
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

  it('not.toHave and toHave and to(action:"have"', async () => {
    await expect(page).not.toHave({selector: 'div p.foo'})
    await expect(page).not.toHave({selector: 'div p.foo', text: 'foo'})
    await expect(page).toEdit({
      create: true,
      tagName: 'p',
      attrs: {id: 'foo'},
      innerHTML: `<div><p class="foo"><i>foo</i></p></div>`,
    })
    await expect(page).toHave({selector: 'p'})
    await expect(page).toHave({selector: 'div p.foo'})
    await expect(page).toHave({selector: 'div p.foo', text: 'foo'})
  })
})
