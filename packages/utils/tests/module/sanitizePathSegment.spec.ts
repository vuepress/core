import { describe, expect, it } from 'vitest'

import { sanitizePathSegment } from '../../src/index.js'

describe('should sanitize a single path segment correctly', () => {
  const testCases: [string, string][] = [
    ['foo', 'foo'],
    ['foo.html', 'foo.html'],
    ['中文', '中文'],
    ['', ''],
    // separators can not be used inside a single segment
    ['a/b', 'a_b'],
    ['a\\b', 'a_b'],
    ['a:b', 'a_b'],
    ['C:\\foo', 'C_foo'],
    // dot segments are replaced to avoid path traversal
    ['.', '_'],
    ['..', '_'],
    ['...', '...'],
    // leading underscores are preserved, unlike `sanitizeFileName`
    ['_foo.html', '_foo.html'],
    ['__foo', '__foo'],
    // other invalid characters are replaced
    ['a?b', 'a_b'],
    ['a*b', 'a_b'],
    ['a%20b', 'a_20b'],
    ['a\u0001b', 'a_b'],
    ['a"b', 'a_b'],
    // characters which are valid in a URI are kept
    ['@-._~', '@-._~'],
    ['+', '_'],
    ['foo bar', 'foo bar'],
  ]

  testCases.forEach(([input, expected]) => {
    it(`input: ${JSON.stringify(input)}`, () => {
      expect(sanitizePathSegment(input)).toEqual(expected)
    })
  })
})
