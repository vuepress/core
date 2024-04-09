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

  // only hash and query
  ['', ''],

  // relative non index
  ['foo', '/foo.html', '/'],
  ['foo', '/foo.html', '/a.html'],
  ['foo', '/foo.html', '/index.html'],
  ['foo', '/a/foo.html', '/a/'],
  ['foo', '/a/foo.html', '/a/index.html'],
  ['foo', '/a/foo.html', '/a/b.html'],
  ['foo.md', '/foo.html', '/'],
  ['foo.md', '/foo.html', '/a.html'],
  ['foo.md', '/foo.html', '/index.html'],
  ['foo.md', '/a/foo.html', '/a/'],
  ['foo.md', '/a/foo.html', '/a/index.html'],
  ['foo.md', '/a/foo.html', '/a/b.html'],
  ['foo.html', '/foo.html', '/'],
  ['foo.html', '/foo.html', '/a.html'],
  ['foo.html', '/foo.html', '/index.html'],
  ['foo.html', '/a/foo.html', '/a/'],
  ['foo.html', '/a/foo.html', '/a/index.html'],
  ['foo.html', '/a/foo.html', '/a/b.html'],
  ['foo/bar', '/foo/bar.html', '/'],
  ['foo/bar', '/foo/bar.html', '/a.html'],
  ['foo/bar', '/foo/bar.html', '/index.html'],
  ['foo/bar', '/a/foo/bar.html', '/a/'],
  ['foo/bar', '/a/foo/bar.html', '/a/index.html'],
  ['foo/bar', '/a/foo/bar.html', '/a/b.html'],
  ['foo/bar.md', '/foo/bar.html', '/'],
  ['foo/bar.md', '/foo/bar.html', '/a.html'],
  ['foo/bar.md', '/foo/bar.html', '/index.html'],
  ['foo/bar.md', '/a/foo/bar.html', '/a/'],
  ['foo/bar.md', '/a/foo/bar.html', '/a/index.html'],
  ['foo/bar.md', '/a/foo/bar.html', '/a/b.html'],
  ['foo/bar.html', '/foo/bar.html', '/'],
  ['foo/bar.html', '/foo/bar.html', '/a.html'],
  ['foo/bar.html', '/foo/bar.html', '/index.html'],
  ['foo/bar.html', '/a/foo/bar.html', '/a/'],
  ['foo/bar.html', '/a/foo/bar.html', '/a/index.html'],
  ['foo/bar.html', '/a/foo/bar.html', '/a/b.html'],
  ['./foo', '/foo.html', '/'],
  ['./foo', '/foo.html', '/a.html'],
  ['./foo', '/foo.html', '/index.html'],
  ['./foo', '/a/foo.html', '/a/'],
  ['./foo', '/a/foo.html', '/a/index.html'],
  ['./foo', '/a/foo.html', '/a/b.html'],
  ['./foo.md', '/foo.html', '/'],
  ['./foo.md', '/foo.html', '/a.html'],
  ['./foo.md', '/foo.html', '/index.html'],
  ['./foo.md', '/a/foo.html', '/a/'],
  ['./foo.md', '/a/foo.html', '/a/index.html'],
  ['./foo.md', '/a/foo.html', '/a/b.html'],
  ['./foo.html', '/foo.html', '/'],
  ['./foo.html', '/foo.html', '/a.html'],
  ['./foo.html', '/foo.html', '/index.html'],
  ['./foo.html', '/a/foo.html', '/a/'],
  ['./foo.html', '/a/foo.html', '/a/index.html'],
  ['./foo.html', '/a/foo.html', '/a/b.html'],
  ['./foo/bar', '/foo/bar.html', '/'],
  ['./foo/bar', '/foo/bar.html', '/a.html'],
  ['./foo/bar', '/foo/bar.html', '/index.html'],
  ['./foo/bar', '/a/foo/bar.html', '/a/'],
  ['./foo/bar', '/a/foo/bar.html', '/a/index.html'],
  ['./foo/bar', '/a/foo/bar.html', '/a/b.html'],
  ['./foo/bar.md', '/foo/bar.html', '/'],
  ['./foo/bar.md', '/foo/bar.html', '/a.html'],
  ['./foo/bar.md', '/foo/bar.html', '/index.html'],
  ['./foo/bar.md', '/a/foo/bar.html', '/a/'],
  ['./foo/bar.md', '/a/foo/bar.html', '/a/index.html'],
  ['./foo/bar.md', '/a/foo/bar.html', '/a/b.html'],
  ['./foo/bar.html', '/foo/bar.html', '/'],
  ['./foo/bar.html', '/foo/bar.html', '/a.html'],
  ['./foo/bar.html', '/foo/bar.html', '/index.html'],
  ['./foo/bar.html', '/a/foo/bar.html', '/a/'],
  ['./foo/bar.html', '/a/foo/bar.html', '/a/index.html'],
  ['./foo/bar.html', '/a/foo/bar.html', '/a/b.html'],
  ['../foo', '/foo.html', '/a/'],
  ['../foo', '/foo.html', '/a/index.html'],
  ['../foo', '/foo.html', '/a/b.html'],
  ['../foo.md', '/foo.html', '/a/'],
  ['../foo.md', '/foo.html', '/a/index.html'],
  ['../foo.md', '/foo.html', '/a/b.html'],
  ['../foo.html', '/foo.html', '/a/'],
  ['../foo.html', '/foo.html', '/a/index.html'],
  ['../foo.html', '/foo.html', '/a/b.html'],
  ['../foo/bar', '/foo/bar.html', '/a/'],
  ['../foo/bar', '/foo/bar.html', '/a/index.html'],
  ['../foo/bar', '/foo/bar.html', '/a/b.html'],
  ['../foo/bar.md', '/foo/bar.html', '/a/'],
  ['../foo/bar.md', '/foo/bar.html', '/a/index.html'],
  ['../foo/bar.md', '/foo/bar.html', '/a/b.html'],
  ['../foo/bar.html', '/foo/bar.html', '/a/'],
  ['../foo/bar.html', '/foo/bar.html', '/a/index.html'],
  ['../foo/bar.html', '/foo/bar.html', '/a/b.html'],

  // absolute non index
  ['/foo', '/foo.html', '/'],
  ['/foo', '/foo.html', '/a.html'],
  ['/foo', '/foo.html', '/index.html'],
  ['/foo', '/foo.html', '/a/'],
  ['/foo', '/foo.html', '/a/index.html'],
  ['/foo', '/foo.html', '/a/b.html'],
  ['/foo.md', '/foo.html', '/'],
  ['/foo.md', '/foo.html', '/a.html'],
  ['/foo.md', '/foo.html', '/index.html'],
  ['/foo.md', '/foo.html', '/a/'],
  ['/foo.md', '/foo.html', '/a/index.html'],
  ['/foo.md', '/foo.html', '/a/b.html'],
  ['/foo.html', '/foo.html', '/'],
  ['/foo.html', '/foo.html', '/a.html'],
  ['/foo.html', '/foo.html', '/index.html'],
  ['/foo.html', '/foo.html', '/a/'],
  ['/foo.html', '/foo.html', '/a/index.html'],
  ['/foo.html', '/foo.html', '/a/b.html'],
  ['/foo/bar', '/foo/bar.html', '/'],
  ['/foo/bar', '/foo/bar.html', '/a.html'],
  ['/foo/bar', '/foo/bar.html', '/index.html'],
  ['/foo/bar', '/foo/bar.html', '/a/'],
  ['/foo/bar', '/foo/bar.html', '/a/index.html'],
  ['/foo/bar', '/foo/bar.html', '/a/b.html'],
  ['/foo/bar.md', '/foo/bar.html', '/'],
  ['/foo/bar.md', '/foo/bar.html', '/a.html'],
  ['/foo/bar.md', '/foo/bar.html', '/index.html'],
  ['/foo/bar.md', '/foo/bar.html', '/a/'],
  ['/foo/bar.md', '/foo/bar.html', '/a/index.html'],
  ['/foo/bar.md', '/foo/bar.html', '/a/b.html'],
  ['/foo/bar.html', '/foo/bar.html', '/'],
  ['/foo/bar.html', '/foo/bar.html', '/a.html'],
  ['/foo/bar.html', '/foo/bar.html', '/index.html'],
  ['/foo/bar.html', '/foo/bar.html', '/a/'],
  ['/foo/bar.html', '/foo/bar.html', '/a/index.html'],
  ['/foo/bar.html', '/foo/bar.html', '/a/b.html'],

  // unexpected corner cases
  ['.md', '.html'],
  ['foo/.md', 'foo/.html'],
  ['/.md', '/.html'],
  ['/foo/.md', '/foo/.html'],
]

describe('should normalize clean paths correctly', () => {
  testCases.forEach(([path, expected, current]) =>
    it(`${current ? `"${current}"-` : ''}"${path}" -> "${expected}"`, () => {
      expect(normalizeRoutePath(path, current)).toBe(expected)
    }),
  )
})

describe('should normalize paths with query correctly', () => {
  testCases
    .map(([path, expected, current]) => [
      `${path}?foo=bar`,
      `${expected}?foo=bar`,
      current,
    ])
    .forEach(([path, expected, current]) =>
      it(`${current ? `"${current}"-` : ''}"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path, current)).toBe(expected)
      }),
    )
})

describe('should normalize paths with hash correctly', () => {
  testCases
    .map(([path, expected, current]) => [
      `${path}#foobar`,
      `${expected}#foobar`,
      current,
    ])
    .forEach(([path, expected, current]) =>
      it(`${current ? `"${current}"-` : ''}"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path, current)).toBe(expected)
      }),
    )
})

describe('should normalize paths with query and hash correctly', () => {
  testCases
    .map(([path, expected, current]) => [
      `${path}?foo=1&bar=2#foobar`,
      `${expected}?foo=1&bar=2#foobar`,
      current,
    ])
    .forEach(([path, expected, current]) =>
      it(`${current ? `"${current}"-` : ''}"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path, current)).toBe(expected)
      }),
    )
})
