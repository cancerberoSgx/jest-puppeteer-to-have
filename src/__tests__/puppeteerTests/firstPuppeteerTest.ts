import { wait } from '../testUtil';

const TIMEOUT = 15000
describe('puppeteer', () => {

  beforeAll(async () => {
    page.setDefaultNavigationTimeout(TIMEOUT)
    jest.setTimeout(TIMEOUT)
    await page.setViewport({width: 1300, height: 900})
    await page.goto('http://localhost:8080/static1/index.html');
    // await wait(500)
  });

  it('should get title', async () => {
    expect(await page.title()).toBe('test1')
  })
})
