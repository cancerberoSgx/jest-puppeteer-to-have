import {ToHaveOptions, TextCompareOptions} from './types'

function buildText(text: string, options: TextCompareOptions) {
  if (options.caseInsensitive) {
    text = text.toLowerCase()
  }
  if (options.asCode) {
    text = text.replace(/\s+/g, ' ').trim()
  }
  return text
}

export function compareText(
  actual: string | undefined,
  expected: string | undefined,
  options: ToHaveOptions,
  isNot: boolean,
) {
  if ((actual === undefined && expected !== undefined) || (actual !== undefined && expected === undefined)) {
    return false
  }
  if (actual === expected) {
    return true
  }
  actual = buildText(actual!, options)
  expected = buildText(expected!, options)
  if (!options.textCompareMode || options.textCompareMode === 'toContain') {
    return actual.includes(expected)
  } else if (options.textCompareMode === 'equals') {
    return actual === expected
  } else if (options.textCompareMode === 'toBeContainedBy') {
    return expected.includes(actual)
  } else if (options.textCompareMode === 'endsWith') {
    return actual.endsWith(expected)
  } else if (options.textCompareMode === 'startsWith') {
    return actual.startsWith(expected)
  } else {
    return false
  }
}

export function compareWithMultiplicity<T>(
  actual: (T | undefined)[] | undefined,
  expected: (T | undefined)[] | undefined,
  predicate: (actual: T | undefined, expected: T | undefined, options: ToHaveOptions, isNot: boolean) => boolean,
  options: ToHaveOptions,
  isNot: boolean,
) {
  if ((actual === undefined && expected !== undefined) || (actual !== undefined && expected === undefined)) {
    return false
  }
  if (actual === expected) {
    return true
  }
  if (!options.selectorMultiplicity || options.selectorMultiplicity === 'anyOf') {
    const r = !!actual!.find(a => !!expected!.find(e => predicate(a, e, options, isNot)))
    return r
  } else if (options.selectorMultiplicity === 'allOf') {
    const r = !!actual!.find(a => !!expected!.find(e => !predicate(a, e, options, isNot)))
    return r
  } else {
    return false
  }
}
