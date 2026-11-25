import { describe, expect, it } from 'vitest'

import { resolvePagePath } from '../../src/index.js'

const TEST_CASES: [
  Parameters<typeof resolvePagePath>,
  ReturnType<typeof resolvePagePath>,
][] = [
  // clean url disabled: append `.html` unless the route key ends with a slash
  [
    [
      {
        routeKey: '/foo',
        cleanUrl: false,
      },
    ],
    '/foo.html',
  ],
  [
    [
      {
        routeKey: '/foo/bar/',
        cleanUrl: false,
      },
    ],
    '/foo/bar/',
  ],
  // clean url enabled: keep the clean route key
  [
    [
      {
        routeKey: '/foo',
        cleanUrl: true,
      },
    ],
    '/foo',
  ],
  [
    [
      {
        routeKey: '/foo/',
        cleanUrl: true,
      },
    ],
    '/foo/',
  ],
]

describe('should resolve page path correctly', () => {
  TEST_CASES.forEach(([input, expected]) => {
    it(`input: ${JSON.stringify(input)}`, () => {
      expect(resolvePagePath(...input)).toEqual(expected)
    })
  })
})
