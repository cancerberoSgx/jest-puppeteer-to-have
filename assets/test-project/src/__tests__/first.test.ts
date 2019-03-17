import { resolve } from "path";
import 'jest-puppeteer-to-have'

describe('test', ()=>{
  beforeAll(async () => {
    const url = `file://${resolve(`${process.cwd()}/../static1/index.html`)}`
    await page.goto(url)
  })

  it('should get title', async () => {
    expect(await page.title()).toBe('test1')
  })

  it('should get title', async () => {
    await expect(page).not.toHave({
      selector: 'body', text: 'bar'
    })
    await expect(page).toEdit({
      selector: 'body',
      innerHTML: '<p id="foo">bar</p>',
    })
    await expect(page).toHave({
      selector: 'body', text: 'bar'
    })
  })
  
})