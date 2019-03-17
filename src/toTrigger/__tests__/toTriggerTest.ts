import '../../'
import { beforeEachDefault } from '../../util';

describe('toTrigger', () => {
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

  describe('click', () => {
      beforeEachDefault();

    it('should not throw', async () => {
      await expect(page).toTrigger({
        selector: 'body',
        event: 'click',
      })
    })
    it('should execute handler', async () => {
      await expect(page).toEdit({
        create: true,
        innerHTML: `<button id="b1" onclick="document.getElementById('p1').innerHTML=''">click me</button><p id="p1">hello</p>`,
      })
      await expect(page).toHave({
        selector: '#p1',
        text: 'hello',
      })
      await expect(page).toTrigger({
        selector: '#b1',
        event: 'click',
      })
      await expect(page).not.toHave({
        selector: '#p1',
        text: 'hello',
      })
    })
  })

  describe('check', () => {
      beforeEachDefault();


    it('should execute onchange handler', async () => {
      await expect(page).toEdit({
        create: true,
        innerHTML: `<input id="i1" type="checkbox"   onchange="document.getElementById('p2').innerHTML=(this.checked ? 'checked' : 'not checked')"></input><p id="p2">hello</p>`,
      })
      await expect(page).toHave({
        selector: '#p2',
        text: 'hello',
      })
      // await expect(page).not.toHave({
      //   selector: '#i1', attributesNamed: ['checked']
      // })
      await expect(page).toTrigger({
        selector: '#i1',
        check: true,
      })
      await expect(page).toHave({
        selector: '#p2',
        text: 'checked',
      })
      await expect(page).toTrigger({
        selector: '#i1',
        check: false,
      })
      await expect(page).toHave({
        selector: '#p2',
        text: 'not checked',
      })
    })

    it('should execute oninput handler', async () => {
      await expect(page).toEdit({
        create: true,
        innerHTML: `<input id="i1" type="checkbox" oninput="document.getElementById('p2').innerHTML=(this.checked ? 'checked' : 'not checked')"  ></input><p id="p2">hello</p>`,
      })
      await expect(page).toHave({
        selector: '#p2',
        text: 'hello',
      })
      await expect(page).toTrigger({
        selector: '#i1',
        check: true,
      })
      await expect(page).toHave({
        selector: '#p2',
        text: 'checked',
      })
      await expect(page).toTrigger({
        selector: '#i1',
        check: false,
      })
      await expect(page).toHave({
        selector: '#p2',
        text: 'not checked',
      })
    })
  })
})
