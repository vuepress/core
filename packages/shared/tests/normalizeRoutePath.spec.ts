import { expect, it } from 'vitest'
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

  // index with hash
  ['/#abc', '/#abc'],
  ['/README.md#abc', '/#abc'],
  ['/readme.md#abc', '/#abc'],
  ['/index.md#abc', '/#abc'],
  ['/index.html#abc', '/#abc'],
  ['/index#abc', '/#abc'],
  ['/foo/#abc', '/foo/#abc'],
  ['/foo/README.md#abc', '/foo/#abc'],
  ['/foo/readme.md#abc', '/foo/#abc'],
  ['/foo/index.md#abc', '/foo/#abc'],
  ['/foo/index.html#abc', '/foo/#abc'],
  ['/foo/index#abc', '/foo/#abc'],
  ['#abc', '#abc'],
  ['README.md#abc', 'index.html#abc'],
  ['readme.md#abc', 'index.html#abc'],
  ['index.md#abc', 'index.html#abc'],
  ['index.html#abc', 'index.html#abc'],
  ['index#abc', 'index.html#abc'],
  ['foo/#abc', 'foo/#abc'],
  ['foo/README.md#abc', 'foo/#abc'],
  ['foo/readme.md#abc', 'foo/#abc'],
  ['foo/index.md#abc', 'foo/#abc'],
  ['foo/index.html#abc', 'foo/#abc'],
  ['foo/index#abc', 'foo/#abc'],

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

  // non-index with hash
  ['/foo#abc', '/foo.html#abc'],
  ['/foo.md#abc', '/foo.html#abc'],
  ['/foo.html#abc', '/foo.html#abc'],
  ['/foo/bar#abc', '/foo/bar.html#abc'],
  ['/foo/bar.md#abc', '/foo/bar.html#abc'],
  ['/foo/bar.html#abc', '/foo/bar.html#abc'],
  ['foo#abc', 'foo.html#abc'],
  ['foo.md#abc', 'foo.html#abc'],
  ['foo.html#abc', 'foo.html#abc'],
  ['foo/bar#abc', 'foo/bar.html#abc'],
  ['foo/bar.md#abc', 'foo/bar.html#abc'],
  ['foo/bar.html#abc', 'foo/bar.html#abc'],

  // unexpected corner cases
  ['.md', '.html'],
  ['foo/.md', 'foo/.html'],
  ['/.md', '/.html'],
  ['/foo/.md', '/foo/.html'],
]

testCases.forEach(([path, expected]) =>
  it(`should normalize "${path}" to "${expected}"`, () => {
    expect(normalizeRoutePath(path)).toBe(expected)
  }),
)
