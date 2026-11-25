import { describe, expect, it } from 'vitest'

import { inferRoutePath } from '../../src/index.js'

const TEST_CASES = [
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

  // markdown extension should be case-insensitive
  ['/README.MD', '/'],
  ['README.MD', 'index.html'],
  ['/foo/README.MD', '/foo/'],
  ['foo/README.MD', 'foo/'],
  ['Dir/README.MD', 'Dir/'],
  ['/foo.MD', '/foo.html'],
  ['foo.MD', 'foo.html'],
  ['/foo/bar.MD', '/foo/bar.html'],
  ['foo/bar.MD', 'foo/bar.html'],
  ['/foo/Bar.MD', '/foo/Bar.html'],
  ['.MD', '.html'],
  ['/foo/.MD', '/foo/.html'],

  // only the trailing extension is recognized, so hash and query
  // are kept as is, the same as their lowercase counterparts
  ['foo.MD#anchor', 'foo.MD#anchor.html'],
  ['foo.MD?x=1', 'foo.MD?x=1.html'],
  ['foo.md#anchor', 'foo.md#anchor.html'],
  ['foo.md?x=1', 'foo.md?x=1.html'],

  // unexpected corner cases
  ['', ''],
  ['.md', '.html'],
  ['foo/.md', 'foo/.html'],
  ['/.md', '/.html'],
  ['/foo/.md', '/foo/.html'],
]

describe('should normalize clean paths correctly', () => {
  TEST_CASES.forEach(([path, expected]) => {
    it(`"${path}" -> "${expected}"`, () => {
      expect(inferRoutePath(path)).toBe(expected)
    })
  })
})
