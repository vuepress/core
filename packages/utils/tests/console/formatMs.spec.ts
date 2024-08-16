import { expect, it } from 'vitest'
import { formatMs } from '../../src/index.js'

const TEST_CASES: [source: number, expected: string][] = [
  [0, '0ms'],
  [999, '999ms'],
  [1000, '1.00s'],
  [1001, '1.00s'],
  [1999, '2.00s'],
  [2000, '2.00s'],
  [2001, '2.00s'],
]

TEST_CASES.forEach(([source, expected]) => {
  it(`${source} -> ${expected}`, () => {
    expect(formatMs(source)).toBe(expected)
  })
})
