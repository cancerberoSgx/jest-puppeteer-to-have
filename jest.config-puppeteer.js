module.exports = {
  "preset": "jest-puppeteer",
  "globalSetup": "jest-environment-puppeteer/setup",
  "globalTeardown": "jest-environment-puppeteer/teardown",
  "testEnvironment": "jest-environment-puppeteer",
  "testRegex": "__tests__/.*Test\.ts$",
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ]

}