import { describe, expect, it } from 'vitest'
import { isLinkMailto } from '../src/index.js'

const testCases: [string, boolean][] = [
  ['https://foobar.com', false],
  ['http://foobar.com', false],
  ['//foobar.com', false],
  ['foobar.com', false],
  ['/foo/bar', false],
  ['mailto:foobar', true],
  ['tel:foobar', false],
  ['../foo/bar', false],
]

describe('shared > isLinkMailto', () => {
  describe('should determine mailto link correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`link: ${source}`, () => {
        expect(isLinkMailto(source)).toBe(expected)
      })
    })
  })
})
