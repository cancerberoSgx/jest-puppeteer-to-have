import '../toHave'
import '../../to/to'

describe('toHave selectors', () => {

  beforeAll(async () => {
    const url = `file://${process.cwd()}/assets/static1/index.html`
    await page.goto(url);
  });

  it('should get title', async () => {
    expect(await page.title()).toBe('test1')
  })

  it('not.toHave and toHave', async () => {
    await expect(page).not.toHave({selector: 'p'})
    await expect(page).not.toHave({selector: 'p', text: 'hello'})
    await expect(page).to({action:'edit', editMode: 'create', create: {tagName: 'p', attrs:{id:'foo'}, innerHTML: 'hello'}})
    await expect(page).toHave({selector: 'p'})
    await expect(page).toHave({selector: 'p', text: 'hello'})
  })

})
