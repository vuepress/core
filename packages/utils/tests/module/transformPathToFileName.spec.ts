import { describe, expect, it } from 'vitest'

import { transformPathToFileName } from '../../src/index.js'

describe('should transform path to file name correctly', () => {
  const testCases: [string, string][] = [
    ['foo.html', 'foo.html'],
    ['foo/bar.html', 'foo_bar.html'],
    ['foo\\bar.html', 'foo_bar.html'],
    ['/foo/bar/', '_foo_bar_'],
    ['a/../b.html', 'a_.._b.html'],
    ['..', '_'],
    ['.', '_'],
    ['../x.html', '.._x.html'],
    ['C:\\foo\\bar.html', 'C__foo_bar.html'],
    // leading underscores are preserved
    ['_foo.html', '_foo.html'],
    ['__foo', '__foo'],
  ]

  testCases.forEach(([input, expected]) => {
    it(`input: ${JSON.stringify(input)}`, () => {
      expect(transformPathToFileName(input)).toEqual(expected)
    })
  })
})
