import { expect, it } from 'vitest'
import { removeLeadingSlash } from '../src/index.js'

const testCases = [
  ['foo/bar', 'foo/bar'],
  ['foo/bar/', 'foo/bar/'],
  ['/foo/bar', 'foo/bar'],
  ['/foo/bar/', 'foo/bar/'],
  ['foo/bar.html', 'foo/bar.html'],
  ['/foo/bar.html', 'foo/bar.html'],
]

testCases.forEach(([source, expected]) => {
  it(source, () => {
    expect(removeLeadingSlash(source)).toBe(expected)
  })
})
