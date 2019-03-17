# jest-puppeteer-to-have

WIP

DOM selection rule-them-all, jest-puppeteer custom matcher. 

Currently has two main tools: 

 * toHave for selection
 * toEdit for modifications

## Motivation

* have a rule-them-all matcher to assert on DOM so we can build more abstract/semantic matchers based on it
* A general HTML element query utility with emphasis on asserting on text, DOM, hierarchy with flexible API to define verbs, modes, mutiplicity, etc
* Has options to configure element selection and text extraction and value comparison. 
* The only required configuration property is "selector".
* Passed on this other more-meaningful expects can be easily built, so is not an objective to have a simple/clear API but to be flexible enough for implement most cases with a single call

## Usage

```sh
npm install -D jest-puppeteer-to-have
```

Of course, you also need `jest`, `puppeteer`, `jest-puppeteer` installed and configured.


(very simple)

```ts
import 'jest-puppeteer-to-have'

describe('test', ()=>{
  beforeAll(async () => {
    await page.goto('http://localhost:8080')
  })
  it('should get title', async () => {
    await expect(page).not.toHave({
      selector: 'body', 
      text: 'bar'
    })
    await expect(page).toEdit({
      selector: 'body',
      innerHTML: '<p id="foo">bar</p>',
    })
    await expect(page).toHave({
      selector: 'body', 
      text: 'bar'
    })
  })
})
```

## API

 * [ToHaveOptions](https://cancerberosgx.github.io/jest-puppeteer-to-have/api/interfaces/_tohave_types_.tohaveoptions.html)
 * [ToEditOptions](https://cancerberosgx.github.io/jest-puppeteer-to-have/api/interfaces/_toedit_types_.toeditoptions.html)
 

## TODO / IDEAS / QUESTIONS

 * should we support events (i.e expect(page).toClick()...)