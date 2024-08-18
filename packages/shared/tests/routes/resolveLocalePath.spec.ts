import { expect, it } from 'vitest'
import type { LocaleConfig } from '../../src/index.js'
import { resolveLocalePath } from '../../src/index.js'

const LOCALES: LocaleConfig = {
  '/': {
    lang: 'en-US',
  },
  '/foo/': {
    lang: 'foo',
  },
  '/foo/bar/': {
    lang: 'foo-bar',
  },
  '/foo-baz/': {
    lang: 'foo-baz',
  },
}

const TEST_CASES: [string, string][] = [
  ['/', '/'],
  ['/foo/', '/foo/'],
  ['/foo/foo/', '/foo/'],
  ['/foo/bar/', '/foo/bar/'],
  ['/foo/bar/baz', '/foo/bar/'],
  ['/foo-baz/', '/foo-baz/'],
  ['/foo-baz/foobar', '/foo-baz/'],
]

TEST_CASES.forEach(([routePath, expected]) => {
  it(routePath, () => {
    expect(resolveLocalePath(LOCALES, routePath)).toEqual(expected)
  })
})
