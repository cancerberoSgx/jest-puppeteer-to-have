module.exports = {
  "testEnvironment": "jsdom",
  "testRegex": "__tests__/.*\.*JsDomTest\.[t]sx?$",
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ]
}