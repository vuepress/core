import { describe, expect, it } from 'vitest'
import { resolveRoutePathInfo } from '../../src/index.js'

const testCases: [string, [string, string]][] = [
  ['/a/b/c/', ['/a/b/c/', '']],
  ['/a/b/c/?a=1', ['/a/b/c/', '?a=1']],
  ['/a/b/c/#b', ['/a/b/c/', '#b']],
  ['/a/b/c/?a=1#b', ['/a/b/c/', '?a=1#b']],
  ['a/index.html', ['a/index.html', '']],
  ['/a/index.html?a=1', ['/a/index.html', '?a=1']],
  ['/a/index.html#a', ['/a/index.html', '#a']],
  ['/a/index.html?a=1#b', ['/a/index.html', '?a=1#b']],
]

describe('should resolve route path info correctly', () => {
  testCases.forEach(([source, expected]) => {
    it(`${source} -> ${expected}`, () => {
      expect(resolveRoutePathInfo(source)).toEqual(expected)
    })
  })
})