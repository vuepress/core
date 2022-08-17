import { describe, expect, it } from 'vitest'
import { isLinkFtp } from '../src/index.js'

const testCases: [string, ReturnType<typeof isLinkFtp>][] = [
  ['ftp://foobar.com', true],
  ['https://foobar.com', false],
  ['http://foobar.com', false],
  ['//foobar.com', false],
  ['foobar.com', false],
  ['/foo/bar', false],
]

describe('shared > isLinkFtp', () => {
  describe('should determine ftp link correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`link: ${source}`, () => {
        expect(isLinkFtp(source)).toBe(expected)
      })
    })
  })
})
