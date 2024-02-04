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
