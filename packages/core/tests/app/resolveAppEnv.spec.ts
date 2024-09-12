import { expect, it } from 'vitest'
import type { Bundler } from '../../src/index.js'
import { resolveAppEnv, resolveAppOptions } from '../../src/index.js'

const TEST_CASES = [
  {
    name: 'should resolve app env correctly without debug flag',
    options: resolveAppOptions({
      source: '/foo',
      theme: { name: 'test' },
      bundler: {} as Bundler,
    }),
    expected: {
      isBuild: false,
      isDev: false,
      isDebug: false,
    },
  },
  {
    name: 'should resolve app env correctly with debug flag',
    options: resolveAppOptions({
      source: '/foo',
      theme: { name: 'test' },
      bundler: {} as Bundler,
      debug: true,
    }),
    expected: {
      isBuild: false,
      isDev: false,
      isDebug: true,
    },
  },
]

TEST_CASES.forEach(({ name, options, expected }) => {
  it(name, () => {
    expect(resolveAppEnv(options)).toEqual(expected)
  })
})
