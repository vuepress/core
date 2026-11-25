import { describe, expect, it } from 'vitest'

import { resolvePageSlug } from '../../src/index.js'

const TEST_CASES: [string | null, string][] = [
  // relative file path is `null`
  [null, ''],
  // filename without date prefix, extension is removed
  ['foo-bar.html', 'foo-bar'],
  // filename with date prefix
  ['2020-10-07-foo-bar.html', 'foo-bar'],
  // filename with date prefix which only has year and month
  ['2020-10-foo.md', 'foo'],
  // filename which is a bare date, the whole filename is the date prefix
  ['2020-01-15.md', ''],
  // filename which is a bare date with single-digit month and day
  ['2020-1-5.md', ''],
  // filename with date prefix which has single-digit month and day
  ['2020-1-5-foo.md', 'foo'],
  // filename which is a bare year and month
  ['2020-10.md', ''],
  // filename which is a bare date with a trailing separator
  ['2020-01-15-.md', ''],
  // filename which is a bare year and month with a trailing separator
  ['2020-10-.md', ''],
  // a date in the middle of the filename is not a date prefix, so it is kept
  ['release-2020-01-01-notes.md', 'release-2020-01-01-notes'],
  ['post-2020-1-5.md', 'post-2020-1-5'],
]

describe('should resolve page slug correctly', () => {
  TEST_CASES.forEach(([filePathRelative, expected]) => {
    it(`raw: ${JSON.stringify(filePathRelative)}`, () => {
      expect(resolvePageSlug({ filePathRelative })).toBe(expected)
    })
  })
})
