import { describe, expect, it } from 'vitest'

import { resolvePageDate } from '../../src/index.js'

const TEST_CASES: [
  Parameters<typeof resolvePageDate>,
  ReturnType<typeof resolvePageDate>,
][] = [
  // `frontmatter.data` is an instance of `Date`
  [
    [
      {
        frontmatter: { date: new Date(Date.UTC(2020, 9, 4)) },
        filePathRelative: null,
      },
    ],
    '2020-10-04',
  ],
  // `frontmatter.data` is a valid date string
  [
    [
      {
        frontmatter: { date: '2020-10-04' },
        filePathRelative: null,
      },
    ],
    '2020-10-04',
  ],
  // `frontmatter.data` is a invalid date string
  [
    [
      {
        frontmatter: { date: 'foobar' },
        filePathRelative: null,
      },
    ],
    '0000-00-00',
  ],
  // `frontmatter.data` is `undefined`, and relative file path is `null`
  [
    [
      {
        frontmatter: {},
        filePathRelative: null,
      },
    ],
    '0000-00-00',
  ],
  // filename is empty
  [
    [
      {
        frontmatter: {},
        filePathRelative: '',
      },
    ],
    '0000-00-00',
  ],
  // filename without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo.md',
      },
    ],
    '0000-00-00',
  ],
  // filename with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10-04-foo.md',
      },
    ],
    '2020-10-04',
  ],
  // filename with date prefix which only has year and month
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10-foo.md',
      },
    ],
    '2020-10-01',
  ],
  // filename which is a bare date, day should not be treated as the slug
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-01-15.md',
      },
    ],
    '2020-01-15',
  ],
  // filename which is a bare date with single-digit month and day
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-1-5.md',
      },
    ],
    '2020-01-05',
  ],
  // filename with date prefix which has single-digit month and day
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-1-5-foo.md',
      },
    ],
    '2020-01-05',
  ],
  // filename with a date in the middle is not a date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'release-2020-01-01-notes.md',
      },
    ],
    '0000-00-00',
  ],
  // filename with a partial date in the middle is not a date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'post-2020-1-5.md',
      },
    ],
    '0000-00-00',
  ],
  // filename which is a bare year and month
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10.md',
      },
    ],
    '2020-10-01',
  ],
  // filename which is a bare date with a trailing separator
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-01-15-.md',
      },
    ],
    '2020-01-15',
  ],
  // filename which is a bare year and month with a trailing separator
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10-.md',
      },
    ],
    '2020-10-01',
  ],
  // filename with an invalid date prefix does not throw, and keeps the previous
  // behavior of not validating the date segments
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-13-45-foo.md',
      },
    ],
    '2020-13-45',
  ],
  // filename without date prefix, dirname with full date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020/01/15/foo.md',
      },
    ],
    '2020-01-15',
  ],
  // filename without date prefix, dirname with year and month only
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020/01/foo.md',
      },
    ],
    '2020-01-01',
  ],
  // filename without date prefix, dirname without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo/bar.md',
      },
    ],
    '0000-00-00',
  ],
  // filename with date prefix, dirname without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo/2020-10-04-bar.md',
      },
    ],
    '2020-10-04',
  ],
  // filename and dirname with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020/10/05/2020-10-04-bar.md',
      },
    ],
    '2020-10-04',
  ],
  // dirname with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020/10/05/bar.md',
      },
    ],
    '2020-10-05',
  ],
  // dirname with date prefix which only has year and month
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020/10/bar.md',
      },
    ],
    '2020-10-01',
  ],
  // for coverage purpose
  [
    [
      {
        frontmatter: {},
        filePathRelative: '/',
      },
    ],
    '0000-00-00',
  ],
]

describe('should resolve page date correctly', () => {
  TEST_CASES.forEach(([source, expected]) => {
    it(`raw: ${JSON.stringify(source)}`, () => {
      expect(resolvePageDate(...source)).toEqual(expected)
    })
  })
})
