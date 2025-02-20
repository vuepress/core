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
  ['README.md', 'index'],
  ['readme.md', 'index'],
  ['index.md', 'index'],
  ['index.html', 'index'],
  ['index', 'index'],

  // absolute non-index
  ['/foo', '/foo'],
  ['/foo.md', '/foo'],
  ['/foo.html', '/foo'],
  ['/foo/bar', '/foo/bar'],
  ['/foo/bar.md', '/foo/bar'],
  ['/foo/bar.html', '/foo/bar'],

  // relative index without current
  ['foo/', 'foo/'],
  ['foo/README.md', 'foo/'],
  ['foo/readme.md', 'foo/'],
  ['foo/index.md', 'foo/'],
  ['foo/index.html', 'foo/'],
  ['foo/index', 'foo/'],

  // relative non index without current
  ['foo', 'foo'],
  ['foo.md', 'foo'],
  ['foo.html', 'foo'],
  ['foo/bar', 'foo/bar'],
  ['foo/bar.md', 'foo/bar'],
  ['foo/bar.html', 'foo/bar'],

  // unexpected corner cases
  ['', ''],
  ['.md', ''],
  ['foo/.md', 'foo/'],
  ['/.md', '/'],
  ['/foo/.md', '/foo/'],
]

describe('should normalize clean paths correctly', () => {
  TEST_CASES.forEach(([path, expected]) => {
    it(`"${path}" -> "${expected}"`, () => {
      expect(inferRoutePath(path)).toBe(expected)
    })
  })
})
