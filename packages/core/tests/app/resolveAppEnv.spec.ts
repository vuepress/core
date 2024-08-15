import { describe, expect, it } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { resolveAppEnv, resolveAppOptions } from '../../src/index.js'

const TEST_CASES: [
  Parameters<typeof resolveAppEnv>,
  ReturnType<typeof resolveAppEnv>,
][] = [
  [
    [
      resolveAppOptions({
        source: '/foo',
        theme: { name: 'test' },
        bundler: {} as Bundler,
      }),
      false,
    ],
    {
      isBuild: false,
      isDev: true,
      isDebug: false,
    },
  ],
  [
    [
      resolveAppOptions({
        source: '/foo',
        theme: { name: 'test' },
        bundler: {} as Bundler,
        debug: true,
      }),
      false,
    ],
    {
      isBuild: false,
      isDev: true,
      isDebug: true,
    },
  ],
  [
    [
      resolveAppOptions({
        source: '/foo',
        theme: { name: 'test' },
        bundler: {} as Bundler,
      }),
      true,
    ],
    {
      isBuild: true,
      isDev: false,
      isDebug: false,
    },
  ],
]

describe('core > app > resolveAppEnv', () => {
  describe('should create app env correctly', () => {
    TEST_CASES.forEach(([params, expected], i) => {
      it(`case ${i}`, () => {
        expect(resolveAppEnv(...params)).toEqual(expected)
      })
    })
  })
})
