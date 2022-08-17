import { describe, expect, it } from 'vitest'
import { resolveAppEnv, resolveAppOptions } from '../../src/index.js'

const source = '/foo'

const testCases: [
  Parameters<typeof resolveAppEnv>,
  ReturnType<typeof resolveAppEnv>
][] = [
  [
    [
      resolveAppOptions({
        source,
        theme: { name: 'test' },
        bundler: {} as any,
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
        source,
        theme: { name: 'test' },
        bundler: {} as any,
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
        source,
        theme: { name: 'test' },
        bundler: {} as any,
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
    testCases.forEach(([params, expected], i) => {
      it(`case ${i}`, () => {
        expect(resolveAppEnv(...params)).toEqual(expected)
      })
    })
  })
})
