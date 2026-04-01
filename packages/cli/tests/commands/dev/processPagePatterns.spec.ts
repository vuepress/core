import { DEFAULT_IGNORE_PATTERNS } from '@vuepress/core'
import { describe, expect, it } from 'vitest'

import { processPagePatterns } from '../../../src/index.js'

describe('processPagePatterns', () => {
  it('should separate match and ignore patterns', () => {
    const result = processPagePatterns(['**/*.md', '!.vuepress'])

    expect(result.matchPatterns).toEqual(['**/*.md'])
    expect(result.ignorePatterns).toContain('.vuepress')
  })

  it('should include DEFAULT_IGNORE_PATTERNS', () => {
    const result = processPagePatterns(['**/*.md'])

    for (const pattern of DEFAULT_IGNORE_PATTERNS) {
      expect(result.ignorePatterns).toContain(pattern)
    }
  })

  it('should expand directory patterns with /** suffix', () => {
    const result = processPagePatterns(['**/*.md', '!.vuepress'])

    // user patterns should be expanded
    expect(result.ignorePatterns).toContain('.vuepress')
    expect(result.ignorePatterns).toContain('.vuepress/**')

    // DEFAULT_IGNORE_PATTERNS should be expanded
    expect(result.ignorePatterns).toContain('**/node_modules')
    expect(result.ignorePatterns).toContain('**/node_modules/**')
    expect(result.ignorePatterns).toContain('**/.git')
    expect(result.ignorePatterns).toContain('**/.git/**')
  })

  it('should include base directory pattern for patterns ending with /**', () => {
    const result = processPagePatterns(['**/*.md', '!dist/**'])

    expect(result.ignorePatterns).toContain('dist')
    expect(result.ignorePatterns.filter((p) => p === 'dist/**')).toHaveLength(1)
  })

  it('should treat extglob negation as match pattern', () => {
    const result = processPagePatterns(['**/*.md', '!(exclude).md'])

    expect(result.matchPatterns).toEqual(['**/*.md', '!(exclude).md'])
  })

  it('should handle multiple match patterns', () => {
    const result = processPagePatterns(['**/*.md', '**/*.txt'])

    expect(result.matchPatterns).toEqual(['**/*.md', '**/*.txt'])
  })

  it('should handle empty page patterns', () => {
    const result = processPagePatterns([])

    expect(result.matchPatterns).toEqual([])
    // should still include DEFAULT_IGNORE_PATTERNS
    for (const pattern of DEFAULT_IGNORE_PATTERNS) {
      expect(result.ignorePatterns).toContain(pattern)
    }
  })
})
