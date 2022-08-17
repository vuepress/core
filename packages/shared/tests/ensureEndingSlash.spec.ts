import { describe, expect, it } from 'vitest'
import { ensureEndingSlash } from '../src/index.js'

const testCases = [
  ['foo/bar', 'foo/bar/'],
  ['foo/bar/', 'foo/bar/'],
  ['/foo/bar', '/foo/bar/'],
  ['/foo/bar/', '/foo/bar/'],
  ['foo/bar.html', 'foo/bar.html'],
  ['/foo/bar.html', '/foo/bar.html'],
]

describe('shared > ensureEndingSlash', () => {
  describe('should ensure ending slash for urls', () => {
    testCases.forEach(([source, expected]) => {
      it(source, () => {
        expect(ensureEndingSlash(source)).toBe(expected)
      })
    })
  })
})
