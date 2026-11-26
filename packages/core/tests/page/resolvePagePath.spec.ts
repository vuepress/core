import { describe, expect, it, vi } from 'vitest'

import { resolvePagePath } from '../../src/index.js'

const TEST_CASES: [
  Parameters<typeof resolvePagePath>,
  ReturnType<typeof resolvePagePath>,
][] = [
  // use options.path
  [
    [
      {
        permalink: '/permalink',
        pathInferred: '/inferred',
        options: {
          path: '/options',
        },
      },
    ],
    '/options',
  ],
  [
    [
      {
        permalink: '/permalink/',
        pathInferred: '/inferred/',
        options: {
          path: '/options/',
        },
      },
    ],
    '/options/',
  ],
  [
    [
      {
        permalink: '/permalink.html',
        pathInferred: '/inferred.html',
        options: {
          path: '/options.html',
        },
      },
    ],
    '/options.html',
  ],
  // use permalink
  [
    [
      {
        permalink: '/permalink',
        pathInferred: '/inferred',
        options: {},
      },
    ],
    '/permalink',
  ],
  [
    [
      {
        permalink: '/permalink/',
        pathInferred: '/inferred/',
        options: {},
      },
    ],
    '/permalink/',
  ],
  // user pathInferred
  [
    [
      {
        permalink: null,
        pathInferred: '/inferred',
        options: {},
      },
    ],
    '/inferred',
  ],
  [
    [
      {
        permalink: null,
        pathInferred: '/inferred/',
        options: {},
      },
    ],
    '/inferred/',
  ],
  [
    [
      {
        permalink: null,
        pathInferred: '/inferred.html',
        options: {},
      },
    ],
    '/inferred.html',
  ],
  // normalize dot segments
  [
    [
      {
        permalink: '/a/../b',
        pathInferred: null,
        options: {},
      },
    ],
    '/b',
  ],
  [
    [
      {
        permalink: '/a/./b/',
        pathInferred: null,
        options: {},
      },
    ],
    '/a/b/',
  ],
  // dot segments can not be used to escape the root
  [
    [
      {
        permalink: '/../../evil',
        pathInferred: null,
        options: {},
      },
    ],
    '/evil',
  ],
  [
    [
      {
        permalink: '/a/../..',
        pathInferred: null,
        options: {},
      },
    ],
    '/',
  ],
  [
    [
      {
        permalink: 'a/../../evil',
        pathInferred: null,
        options: {},
      },
    ],
    '_/evil',
  ],
  // leading underscores are preserved
  [
    [
      {
        permalink: '/_foo.html',
        pathInferred: null,
        options: {},
      },
    ],
    '/_foo.html',
  ],
  // separators and other invalid characters are replaced
  [
    [
      {
        permalink: '/a:b/c?d',
        pathInferred: null,
        options: {},
      },
    ],
    '/a_b/c_d',
  ],
  [
    [
      {
        permalink: null,
        pathInferred: '/a\\b',
        options: {},
      },
    ],
    '/a/b',
  ],
  // consecutive slashes are collapsed
  [
    [
      {
        permalink: '/a//b',
        pathInferred: null,
        options: {},
      },
    ],
    '/a/b',
  ],
]

describe('should resolve page path correctly', () => {
  TEST_CASES.forEach(([input, expected]) => {
    it(`input: ${JSON.stringify(input)}`, () => {
      expect(resolvePagePath(...input)).toEqual(expected)
    })
  })
})

it('should throw an error', () => {
  const consoleError = console.error
  console.error = vi.fn<typeof console.error>()

  expect(() =>
    resolvePagePath({
      permalink: null,
      pathInferred: null,
      options: {},
    }),
  ).toThrow(/page path is empty/)
  expect(console.error).toHaveBeenCalled()

  console.error = consoleError
})
