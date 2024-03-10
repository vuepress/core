import { describe, expect, it } from 'vitest'
import { normalizeRoutePath } from '../src/index.js'

const testCases = [
  // index
  ['/', '/'],
  ['/README.md', '/'],
  ['/readme.md', '/'],
  ['/index.md', '/'],
  ['/index.html', '/'],
  ['/index', '/'],
  ['/foo/', '/foo/'],
  ['/foo/README.md', '/foo/'],
  ['/foo/readme.md', '/foo/'],
  ['/foo/index.md', '/foo/'],
  ['/foo/index.html', '/foo/'],
  ['/foo/index', '/foo/'],
  ['', ''],
  ['README.md', 'index.html'],
  ['readme.md', 'index.html'],
  ['index.md', 'index.html'],
  ['index.html', 'index.html'],
  ['index', 'index.html'],
  ['foo/', 'foo/'],
  ['foo/README.md', 'foo/'],
  ['foo/readme.md', 'foo/'],
  ['foo/index.md', 'foo/'],
  ['foo/index.html', 'foo/'],
  ['foo/index', 'foo/'],

  // non-index
  ['/foo', '/foo.html'],
  ['/foo.md', '/foo.html'],
  ['/foo.html', '/foo.html'],
  ['/foo/bar', '/foo/bar.html'],
  ['/foo/bar.md', '/foo/bar.html'],
  ['/foo/bar.html', '/foo/bar.html'],
  ['foo', 'foo.html'],
  ['foo.md', 'foo.html'],
  ['foo.html', 'foo.html'],
  ['foo/bar', 'foo/bar.html'],
  ['foo/bar.md', 'foo/bar.html'],
  ['foo/bar.html', 'foo/bar.html'],

  // hash and query
  ['/foo#bar', '/foo.html#bar'],
  ['/foo.md#bar', '/foo.html#bar'],
  ['/foo.html#bar', '/foo.html#bar'],
  ['/foo?bar=baz', '/foo.html?bar=baz'],
  ['/foo.md?bar=baz', '/foo.html?bar=baz'],
  ['/foo.html?bar=baz', '/foo.html?bar=baz'],
  ['/foo?bar=baz#qux', '/foo.html?bar=baz#qux'],
  ['/foo.md?bar=baz#qux', '/foo.html?bar=baz#qux'],
  ['/foo.html?bar=baz#qux', '/foo.html?bar=baz#qux'],
  ['foo#bar', 'foo.html#bar'],
  ['foo.md#bar', 'foo.html#bar'],
  ['foo.html#bar', 'foo.html#bar'],
  ['foo?bar=baz', 'foo.html?bar=baz'],
  ['foo.md?bar=baz', 'foo.html?bar=baz'],
  ['foo.html?bar=baz', 'foo.html?bar=baz'],
  ['foo?bar=baz#qux', 'foo.html?bar=baz#qux'],
  ['foo.md?bar=baz#qux', 'foo.html?bar=baz#qux'],
  ['foo.html?bar=baz#qux', 'foo.html?bar=baz#qux'],
  ['#bar', '#bar'],
  ['?bar=baz', '?bar=baz'],
  ['?bar=baz#qux', '?bar=baz#qux'],

  // unexpected corner cases
  ['.md', '.html'],
  ['foo/.md', 'foo/.html'],
  ['/.md', '/.html'],
  ['/foo/.md', '/foo/.html'],
]

describe('should normalize clean paths correctly', () =>
  testCases.forEach(([path, expected]) =>
    it(`"${path}" -> "${expected}"`, () => {
      expect(normalizeRoutePath(path)).toBe(expected)
    }),
  ))

describe('should normalize paths with query correctly', () =>
  testCases
    .map(([path, expected]) => [`${path}?foo=bar`, `${expected}?foo=bar`])
    .forEach(([path, expected]) =>
      it(`"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path)).toBe(expected)
      }),
    ))

describe('should normalize paths with hash correctly', () =>
  testCases
    .map(([path, expected]) => [`${path}#foobar`, `${expected}#foobar`])
    .forEach(([path, expected]) =>
      it(`"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path)).toBe(expected)
      }),
    ))

describe('should normalize paths with query and hash correctly', () =>
  testCases
    .map(([path, expected]) => [
      `${path}?foo=1&bar=2#foobar`,
      `${expected}?foo=1&bar=2#foobar`,
    ])
    .forEach(([path, expected]) =>
      it(`"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path)).toBe(expected)
      }),
    ))
