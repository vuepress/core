import { describe, expect, it } from 'vitest'
import { resolveRoutePathname } from '../src/index.js'

const testCases = [
  ['/a/b/c/', '/a/b/c/'],
  ['/a/b/c/?a=1', '/a/b/c/'],
  ['/a/b/c/#b', '/a/b/c/'],
  ['/a/b/c/?a=1#b', '/a/b/c/'],
  ['a/index.html', 'a/index.html'],
  ['/a/index.html?a=1', '/a/index.html'],
  ['/a/index.html#a', '/a/index.html'],
  ['/a/index.html?a=1#b', '/a/index.html'],
]

describe('should resolve route pathname correctly', () => {
  testCases.forEach(([source, expected]) => {
    it(`${source} -> ${expected}`, () => {
      expect(resolveRoutePathname(source)).toBe(expected)
    })
  })
})
