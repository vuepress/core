import { expect, it } from 'vitest'
import { normalizePath } from '../src/index.js'

it('normalizePath', () => {
  const tests = [
    ['/', '/'],
    ['/index.html', '/'],
    ['/foo', '/foo.html'],
    ['/foo.md', '/foo.html'],
    ['/foo/', '/foo/'],
    ['/foo/README.md', '/foo/'],
    ['/foo/index.html', '/foo/'],
    ['/foo/bar', '/foo/bar.html'],
    ['/foo/bar/', '/foo/bar/'],
    ['/foo/bar/README.md', '/foo/bar/'],
    ['/foo/bar.md', '/foo/bar.html'],
    ['/foo/bar.html', '/foo/bar.html'],
  ]

  tests.forEach(([path, expected]) => {
    expect(normalizePath(path)).toBe(expected)
  })
})
