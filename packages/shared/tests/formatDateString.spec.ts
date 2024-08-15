import { describe, expect, it } from 'vitest'
import { formatDateString } from '../src/index.js'

const TEST_CASES = [
  ['2020-1-1', '2020-01-01'],
  ['2020-1-01', '2020-01-01'],
  ['2020-01-1', '2020-01-01'],
  ['2020-01-01', '2020-01-01'],
]

const TEST_CASES_FALLBACK = [
  ['202-1-1', '1970-01-01'],
  ['2020-111-1', '1970-01-01'],
  ['2020-01-001', '1970-01-01'],
  ['202-1-1', '0000-00-00'],
  ['2020-111-1', '0000-00-00'],
  ['2020-01-001', '0000-00-00'],
]

describe('should format date string correctly', () => {
  TEST_CASES.forEach(([source, expected]) => {
    it(source, () => {
      expect(formatDateString(source)).toBe(expected)
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
