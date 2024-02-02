import { expect, it } from 'vitest'
import { normalizePath } from '../src/index.js'

const testCases = [
  ['/', '/'],
  ['/README.md', '/'],
  ['/index.md', '/'],
  ['/index.html', '/'],
  ['/foo', '/foo.html'],
  ['/foo.md', '/foo.html'],
  ['/foo/', '/foo/'],
  ['/foo/README.md', '/foo/'],
  ['/foo/index.md', '/foo/'],
  ['/foo/index.html', '/foo/'],
  ['/foo/bar', '/foo/bar.html'],
  ['/foo/bar/', '/foo/bar/'],
  ['/foo/bar/README.md', '/foo/bar/'],
  ['/foo/bar/index.md', '/foo/bar/'],
  ['/foo/bar/index.html', '/foo/bar/'],
  ['/foo/bar.md', '/foo/bar.html'],
  ['/foo/bar.html', '/foo/bar.html'],
]

testCases.forEach(([path, expected]) =>
  it(`should normalize "${path}" to "${expected}"`, () => {
    expect(normalizePath(path)).toBe(expected)
  }),
)
