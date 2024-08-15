import { describe, expect, it } from 'vitest'
import { isPlainObject } from '../src/index.js'

describe('isPlainObject', () => {
  const TEST_CASES: [unknown, boolean][] = [
    [true, false],
    [false, false],
    ['', false],
    ['foobar', false],
    [0, false],
    [1, false],
    [[], false],
    [{}, true],
    [{ foo: 'bar' }, true],
    [Object.create(null), true],
  ]

  it('should determine plain object correctly', () => {
    TEST_CASES.forEach(([source, expected]) => {
      expect(isPlainObject(source)).toBe(expected)
    })
  })
})
