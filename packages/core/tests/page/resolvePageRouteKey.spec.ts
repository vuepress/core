import { describe, expect, it, vi } from 'vitest'

import { resolvePageRouteKey } from '../../src/index.js'

const TEST_CASES: [
  Parameters<typeof resolvePageRouteKey>,
  ReturnType<typeof resolvePageRouteKey>,
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
    '/options',
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
    '/inferred',
  ],
]

describe('should resolve page route key correctly', () => {
  TEST_CASES.forEach(([input, expected]) => {
    it(`input: ${JSON.stringify(input)}`, () => {
      expect(resolvePageRouteKey(...input)).toEqual(expected)
    })
  })
})

it('should throw an error', () => {
  const consoleError = console.error
  console.error = vi.fn()

  expect(() =>
    resolvePageRouteKey({
      permalink: null,
      pathInferred: null,
      options: {},
    }),
  ).toThrow()
  expect(console.error).toHaveBeenCalled()

  console.error = consoleError
})
