import { describe, expect, it } from 'vitest'

import { decodeRoutePath } from '../../src/utils/decodeRoutePath.js'

describe('decodeRoutePath', () => {
  it('should decode encoded route path', () => {
    expect(decodeRoutePath('/%E4%B8%AD%E6%96%87/index.html')).toBe(
      '/中文/index.html',
    )
  })

  it('should keep unencoded route path unchanged', () => {
    expect(decodeRoutePath('/中文/index.html')).toBe('/中文/index.html')
  })

  it('should fallback to the original route path with malformed URI sequences', () => {
    expect(decodeRoutePath('/100%.html')).toBe('/100%.html')
    expect(decodeRoutePath('/100%')).toBe('/100%')
    expect(decodeRoutePath('/%E4')).toBe('/%E4')
  })
})
