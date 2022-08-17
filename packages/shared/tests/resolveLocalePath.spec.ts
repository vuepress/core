import { describe, expect, it } from 'vitest'
import { resolveLocalePath } from '../src/index.js'
import type { LocaleConfig } from '../src/index.js'

const locales: LocaleConfig = {
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

const testCases: [string, string][] = [
  ['/', '/'],
  ['/foo/', '/foo/'],
  ['/foo/foo/', '/foo/'],
  ['/foo/bar/', '/foo/bar/'],
  ['/foo/bar/baz', '/foo/bar/'],
  ['/foo-baz/', '/foo-baz/'],
  ['/foo-baz/foobar', '/foo-baz/'],
]

describe('shared > resolveLocalePath', () => {
  describe('should resolve locale path correctly', () => {
    testCases.forEach(([routePath, expected]) => {
      it(routePath, () => {
        expect(resolveLocalePath(locales, routePath)).toEqual(expected)
      })
    })
  })
})
