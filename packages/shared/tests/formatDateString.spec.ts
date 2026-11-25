import { describe, expect, it } from 'vitest'

import { formatDateString } from '../src/index.js'

// valid dates should be normalized to `yyyy-MM-dd`
const TEST_CASES = [
  ['2020-1-1', '2020-01-01'],
  ['2020-1-01', '2020-01-01'],
  ['2020-01-1', '2020-01-01'],
  ['2020-01-01', '2020-01-01'],
  ['2020-2-9', '2020-02-09'],
  ['2020-02-29', '2020-02-29'],
  ['2019-02-28', '2019-02-28'],
  ['2024-12-31', '2024-12-31'],
  ['2000-02-29', '2000-02-29'],
]

const TEST_CASES_FALLBACK = [
  ['202-1-1', '1970-01-01'],
  ['2020-111-1', '1970-01-01'],
  ['2020-01-001', '1970-01-01'],
  ['202-1-1', '0000-00-00'],
  ['2020-111-1', '0000-00-00'],
  ['2020-01-001', '0000-00-00'],
]

// dates that match the `yyyy-(M)M-(d)d` pattern but are not real calendar
// dates should fall back instead of being passed through
const TEST_CASES_INVALID = [
  // February 30th / 31st never exist
  '2020-02-30',
  '2020-02-31',
  // 2019 is not a leap year, 1900 is not a leap year either
  '2019-02-29',
  '1900-02-29',
  // month out of range
  '2020-13-01',
  '2020-00-10',
  // day out of range
  '2020-01-32',
  '2020-04-31',
  // the "no date" sentinel
  '0000-00-00',
]

describe('should format date string correctly', () => {
  TEST_CASES.forEach(([source, expected]) => {
    it(source, () => {
      expect(formatDateString(source)).toBe(expected)
    })
  })
})

describe('should keep the formatted output a real calendar date', () => {
  TEST_CASES.forEach(([, expected]) => {
    it(expected, () => {
      expect(new Date(expected).toISOString().slice(0, 10)).toBe(expected)
    })
  })
})

describe('should fallback to default date string', () => {
  TEST_CASES_FALLBACK.forEach(([source, expected]) => {
    it(source, () => {
      expect(formatDateString(source, expected)).toBe(expected)
    })
  })
})

describe('should fallback to default date string for invalid dates', () => {
  TEST_CASES_INVALID.forEach((source) => {
    it(`${source} falls back to empty string`, () => {
      expect(formatDateString(source)).toBe('')
    })

    it(`${source} falls back to the given default`, () => {
      expect(formatDateString(source, '0000-00-00')).toBe('0000-00-00')
    })
  })
})
