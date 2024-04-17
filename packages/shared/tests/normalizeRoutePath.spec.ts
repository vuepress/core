import { describe, expect, it } from 'vitest'
import { normalizeRoutePath } from '../src/index.js'

const testCases = [
  // absolute index
  [['/'], '/'],
  [['/README.md'], '/'],
  [['/readme.md'], '/'],
  [['/index.md'], '/'],
  [['/index.html'], '/'],
  [['/index'], '/'],
  [['/foo/'], '/foo/'],
  [['/foo/README.md'], '/foo/'],
  [['/foo/readme.md'], '/foo/'],
  [['/foo/index.md'], '/foo/'],
  [['/foo/index.html'], '/foo/'],
  [['/foo/index'], '/foo/'],
  [['README.md'], 'index.html'],
  [['readme.md'], 'index.html'],
  [['index.md'], 'index.html'],
  [['index.html'], 'index.html'],
  [['index'], 'index.html'],

  // absolute non-index
  [['/foo'], '/foo.html'],
  [['/foo.md'], '/foo.html'],
  [['/foo.html'], '/foo.html'],
  [['/foo/bar'], '/foo/bar.html'],
  [['/foo/bar.md'], '/foo/bar.html'],
  [['/foo/bar.html'], '/foo/bar.html'],

  // relative index without current
  [['foo/'], 'foo/'],
  [['foo/README.md'], 'foo/'],
  [['foo/readme.md'], 'foo/'],
  [['foo/index.md'], 'foo/'],
  [['foo/index.html'], 'foo/'],
  [['foo/index'], 'foo/'],

  // relative non index without current
  [['foo'], 'foo.html'],
  [['foo.md'], 'foo.html'],
  [['foo.html'], 'foo.html'],
  [['foo/bar'], 'foo/bar.html'],
  [['foo/bar.md'], 'foo/bar.html'],
  [['foo/bar.html'], 'foo/bar.html'],

  // relative non index with current
  [['foo', '/'], '/foo.html'],
  [['foo', '/a.html'], '/foo.html'],
  [['foo', '/index.html'], '/foo.html'],
  [['foo', '/a/'], '/a/foo.html'],
  [['foo', '/a/index.html'], '/a/foo.html'],
  [['foo', '/a/b.html'], '/a/foo.html'],
  [['foo.md', '/'], '/foo.html'],
  [['foo.md', '/a.html'], '/foo.html'],
  [['foo.md', '/index.html'], '/foo.html'],
  [['foo.md', '/a/'], '/a/foo.html'],
  [['foo.md', '/a/index.html'], '/a/foo.html'],
  [['foo.md', '/a/b.html'], '/a/foo.html'],
  [['foo.html', '/'], '/foo.html'],
  [['foo.html', '/a.html'], '/foo.html'],
  [['foo.html', '/index.html'], '/foo.html'],
  [['foo.html', '/a/'], '/a/foo.html'],
  [['foo.html', '/a/index.html'], '/a/foo.html'],
  [['foo.html', '/a/b.html'], '/a/foo.html'],
  [['foo/bar', '/'], '/foo/bar.html'],
  [['foo/bar', '/a.html'], '/foo/bar.html'],
  [['foo/bar', '/index.html'], '/foo/bar.html'],
  [['foo/bar', '/a/'], '/a/foo/bar.html'],
  [['foo/bar', '/a/index.html'], '/a/foo/bar.html'],
  [['foo/bar', '/a/b.html'], '/a/foo/bar.html'],
  [['foo/bar.md', '/'], '/foo/bar.html'],
  [['foo/bar.md', '/a.html'], '/foo/bar.html'],
  [['foo/bar.md', '/index.html'], '/foo/bar.html'],
  [['foo/bar.md', '/a/'], '/a/foo/bar.html'],
  [['foo/bar.md', '/a/index.html'], '/a/foo/bar.html'],
  [['foo/bar.md', '/a/b.html'], '/a/foo/bar.html'],
  [['foo/bar.html', '/'], '/foo/bar.html'],
  [['foo/bar.html', '/a.html'], '/foo/bar.html'],
  [['foo/bar.html', '/index.html'], '/foo/bar.html'],
  [['foo/bar.html', '/a/'], '/a/foo/bar.html'],
  [['foo/bar.html', '/a/index.html'], '/a/foo/bar.html'],
  [['foo/bar.html', '/a/b.html'], '/a/foo/bar.html'],
  [['./foo', '/'], '/foo.html'],
  [['./foo', '/a.html'], '/foo.html'],
  [['./foo', '/index.html'], '/foo.html'],
  [['./foo', '/a/'], '/a/foo.html'],
  [['./foo', '/a/index.html'], '/a/foo.html'],
  [['./foo', '/a/b.html'], '/a/foo.html'],
  [['./foo.md', '/'], '/foo.html'],
  [['./foo.md', '/a.html'], '/foo.html'],
  [['./foo.md', '/index.html'], '/foo.html'],
  [['./foo.md', '/a/'], '/a/foo.html'],
  [['./foo.md', '/a/index.html'], '/a/foo.html'],
  [['./foo.md', '/a/b.html'], '/a/foo.html'],
  [['./foo.html', '/'], '/foo.html'],
  [['./foo.html', '/a.html'], '/foo.html'],
  [['./foo.html', '/index.html'], '/foo.html'],
  [['./foo.html', '/a/'], '/a/foo.html'],
  [['./foo.html', '/a/index.html'], '/a/foo.html'],
  [['./foo.html', '/a/b.html'], '/a/foo.html'],
  [['./foo/bar', '/'], '/foo/bar.html'],
  [['./foo/bar', '/a.html'], '/foo/bar.html'],
  [['./foo/bar', '/index.html'], '/foo/bar.html'],
  [['./foo/bar', '/a/'], '/a/foo/bar.html'],
  [['./foo/bar', '/a/index.html'], '/a/foo/bar.html'],
  [['./foo/bar', '/a/b.html'], '/a/foo/bar.html'],
  [['./foo/bar.md', '/'], '/foo/bar.html'],
  [['./foo/bar.md', '/a.html'], '/foo/bar.html'],
  [['./foo/bar.md', '/index.html'], '/foo/bar.html'],
  [['./foo/bar.md', '/a/'], '/a/foo/bar.html'],
  [['./foo/bar.md', '/a/index.html'], '/a/foo/bar.html'],
  [['./foo/bar.md', '/a/b.html'], '/a/foo/bar.html'],
  [['./foo/bar.html', '/'], '/foo/bar.html'],
  [['./foo/bar.html', '/a.html'], '/foo/bar.html'],
  [['./foo/bar.html', '/index.html'], '/foo/bar.html'],
  [['./foo/bar.html', '/a/'], '/a/foo/bar.html'],
  [['./foo/bar.html', '/a/index.html'], '/a/foo/bar.html'],
  [['./foo/bar.html', '/a/b.html'], '/a/foo/bar.html'],
  [['../foo', '/a/'], '/foo.html'],
  [['../foo', '/a/index.html'], '/foo.html'],
  [['../foo', '/a/b.html'], '/foo.html'],
  [['../foo.md', '/a/'], '/foo.html'],
  [['../foo.md', '/a/index.html'], '/foo.html'],
  [['../foo.md', '/a/b.html'], '/foo.html'],
  [['../foo.html', '/a/'], '/foo.html'],
  [['../foo.html', '/a/index.html'], '/foo.html'],
  [['../foo.html', '/a/b.html'], '/foo.html'],
  [['../foo/bar', '/a/'], '/foo/bar.html'],
  [['../foo/bar', '/a/index.html'], '/foo/bar.html'],
  [['../foo/bar', '/a/b.html'], '/foo/bar.html'],
  [['../foo/bar.md', '/a/'], '/foo/bar.html'],
  [['../foo/bar.md', '/a/index.html'], '/foo/bar.html'],
  [['../foo/bar.md', '/a/b.html'], '/foo/bar.html'],
  [['../foo/bar.html', '/a/'], '/foo/bar.html'],
  [['../foo/bar.html', '/a/index.html'], '/foo/bar.html'],
  [['../foo/bar.html', '/a/b.html'], '/foo/bar.html'],

  // absolute non index with current
  [['/foo', '/'], '/foo.html'],
  [['/foo', '/a.html'], '/foo.html'],
  [['/foo', '/index.html'], '/foo.html'],
  [['/foo', '/a/'], '/foo.html'],
  [['/foo', '/a/index.html'], '/foo.html'],
  [['/foo', '/a/b.html'], '/foo.html'],
  [['/foo.md', '/'], '/foo.html'],
  [['/foo.md', '/a.html'], '/foo.html'],
  [['/foo.md', '/index.html'], '/foo.html'],
  [['/foo.md', '/a/'], '/foo.html'],
  [['/foo.md', '/a/index.html'], '/foo.html'],
  [['/foo.md', '/a/b.html'], '/foo.html'],
  [['/foo.html', '/'], '/foo.html'],
  [['/foo.html', '/a.html'], '/foo.html'],
  [['/foo.html', '/index.html'], '/foo.html'],
  [['/foo.html', '/a/'], '/foo.html'],
  [['/foo.html', '/a/index.html'], '/foo.html'],
  [['/foo.html', '/a/b.html'], '/foo.html'],
  [['/foo/bar', '/'], '/foo/bar.html'],
  [['/foo/bar', '/a.html'], '/foo/bar.html'],
  [['/foo/bar', '/index.html'], '/foo/bar.html'],
  [['/foo/bar', '/a/'], '/foo/bar.html'],
  [['/foo/bar', '/a/index.html'], '/foo/bar.html'],
  [['/foo/bar', '/a/b.html'], '/foo/bar.html'],
  [['/foo/bar.md', '/'], '/foo/bar.html'],
  [['/foo/bar.md', '/a.html'], '/foo/bar.html'],
  [['/foo/bar.md', '/index.html'], '/foo/bar.html'],
  [['/foo/bar.md', '/a/'], '/foo/bar.html'],
  [['/foo/bar.md', '/a/index.html'], '/foo/bar.html'],
  [['/foo/bar.md', '/a/b.html'], '/foo/bar.html'],
  [['/foo/bar.html', '/'], '/foo/bar.html'],
  [['/foo/bar.html', '/a.html'], '/foo/bar.html'],
  [['/foo/bar.html', '/index.html'], '/foo/bar.html'],
  [['/foo/bar.html', '/a/'], '/foo/bar.html'],
  [['/foo/bar.html', '/a/index.html'], '/foo/bar.html'],
  [['/foo/bar.html', '/a/b.html'], '/foo/bar.html'],

  // only hash and query
  [[''], ''],

  // unexpected corner cases
  [['.md'], '.html'],
  [['foo/.md'], 'foo/.html'],
  [['/.md'], '/.html'],
  [['/foo/.md'], '/foo/.html'],
]

describe('should normalize clean paths correctly', () => {
  testCases.forEach(([[path, current], expected]) =>
    it(`${current ? `"${current}"-` : ''}"${path}" -> "${expected}"`, () => {
      expect(normalizeRoutePath(path, current)).toBe(expected)
    }),
  )
})

describe('should normalize paths with query correctly', () => {
  testCases
    .map(([[path, current], expected]) => [
      [`${path}?foo=bar`, current],
      `${expected}?foo=bar`,
    ])
    .forEach(([[path, current], expected]) =>
      it(`${current ? `"${current}"-` : ''}"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path, current)).toBe(expected)
      }),
    )
})

describe('should normalize paths with hash correctly', () => {
  testCases
    .map(([[path, current], expected]) => [
      [`${path}#foobar`, current],
      `${expected}#foobar`,
    ])
    .map(([[path, current], expected]) =>
      it(`${current ? `"${current}"-` : ''}"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path, current)).toBe(expected)
      }),
    )
})

describe('should normalize paths with query and hash correctly', () => {
  testCases
    .map(([[path, current], expected]) => [
      [`${path}?foo=1&bar=2#foobar`, current],
      `${expected}?foo=1&bar=2#foobar`,
    ])
    .map(([[path, current], expected]) =>
      it(`${current ? `"${current}"-` : ''}"${path}" -> "${expected}"`, () => {
        expect(normalizeRoutePath(path, current)).toBe(expected)
      }),
    )
})
