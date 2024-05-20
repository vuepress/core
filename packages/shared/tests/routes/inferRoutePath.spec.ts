import { describe, expect, it } from 'vitest'
import { inferRoutePath } from '../../src/index.js'

const testCases = [
  // absolute index
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
  ['README.md', 'index.html'],
  ['readme.md', 'index.html'],
  ['index.md', 'index.html'],
  ['index.html', 'index.html'],
  ['index', 'index.html'],

  // absolute non-index
  ['/foo', '/foo.html'],
  ['/foo.md', '/foo.html'],
  ['/foo.html', '/foo.html'],
  ['/foo/bar', '/foo/bar.html'],
  ['/foo/bar.md', '/foo/bar.html'],
  ['/foo/bar.html', '/foo/bar.html'],

  // relative index without current
  ['foo/', 'foo/'],
  ['foo/README.md', 'foo/'],
  ['foo/readme.md', 'foo/'],
  ['foo/index.md', 'foo/'],
  ['foo/index.html', 'foo/'],
  ['foo/index', 'foo/'],

  // relative non index without current
  ['foo', 'foo.html'],
  ['foo.md', 'foo.html'],
  ['foo.html', 'foo.html'],
  ['foo/bar', 'foo/bar.html'],
  ['foo/bar.md', 'foo/bar.html'],
  ['foo/bar.html', 'foo/bar.html'],

  // unexpected corner cases
  ['', ''],
  ['.md', '.html'],
  ['foo/.md', 'foo/.html'],
  ['/.md', '/.html'],
  ['/foo/.md', '/foo/.html'],
]

describe('should normalize clean paths correctly', () => {
  testCases.forEach(([path, expected]) =>
    it(`"${path}" -> "${expected}"`, () => {
      expect(inferRoutePath(path)).toBe(expected)
    }),
  )
})
