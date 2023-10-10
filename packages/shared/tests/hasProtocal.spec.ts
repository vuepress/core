import { describe, expect, it } from 'vitest'
import { hasProtocol } from '../src/index.js'

const testCases: [string, ReturnType<typeof hasProtocol>][] = [
  ['ftp://foobar.com', true],
  ['mailto:foobar', true],
  ['tel:foobar', true],
  ['https://foobar.com', true],
  ['http://foobar.com', true],
  ['foobar.com', false],
  ['/foo/bar', false],
  ['../foo/bar', false],
  ['//foobar.com', false],
]

describe('shared > hasProtocol', () => {
  describe('should determine link with protocol correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`link: ${source}`, () => {
        expect(hasProtocol(source)).toBe(expected)
      })
    })
  })
})
