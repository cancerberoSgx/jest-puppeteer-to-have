# jest-puppeteer-to-have

DOM selection rule-them-all, jest-puppeteer custom matcher. 

## Motivation

* have a rule-them-all matcher to assert on DOM so we can build more abstract/semantic matchers based on it
* A general HTML element query utility with emphasis on asserting on text, DOM, hierarchy with flexible API to define verbs, modes, mutiplicity, etc
* Has options to configure element selection and text extraction and value comparison. 
* The only required configuration property is "selector".
* Passed on this other more-meaningful expects can be easily built, so is not an objective to have a simple/clear API but to be flexible enough for implement most cases with a single call

## TODO / IDEAS / QUESTIONS

 * should we support events (i.e expect(page).toClick()...)