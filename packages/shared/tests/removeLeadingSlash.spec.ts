import { expect, it } from 'vitest'
import { removeLeadingSlash } from '../src/index.js'

const TEST_CASES = [
  ['foo/bar', 'foo/bar'],
  ['foo/bar/', 'foo/bar/'],
  ['/foo/bar', 'foo/bar'],
  ['/foo/bar/', 'foo/bar/'],
  ['foo/bar.html', 'foo/bar.html'],
  ['/foo/bar.html', 'foo/bar.html'],
]

TEST_CASES.forEach(([source, expected]) => {
  it(source, () => {
    expect(removeLeadingSlash(source)).toBe(expected)
  })
})
