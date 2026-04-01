import { DEFAULT_IGNORE_PATTERNS } from '@vuepress/core'

interface ProcessedPatterns {
  matchPatterns: string[]
  ignorePatterns: string[]
}

/**
 * Process page patterns into match and ignore patterns.
 *
 * - Separates negated patterns (prefixed with `!`) from positive patterns.
 * - Merges `DEFAULT_IGNORE_PATTERNS` into ignore patterns.
 * - Expands directory patterns with `/**` suffix for picomatch compatibility,
 *   since picomatch does not auto-expand like tinyglobby's `expandDirectories`.
 */
export const processPagePatterns = (
  pagePatterns: string[],
): ProcessedPatterns => {
  const matchPatterns: string[] = []
  const ignorePatterns: string[] = [...DEFAULT_IGNORE_PATTERNS]

  for (const pattern of pagePatterns) {
    // negated patterns (e.g. `!.vuepress`) are treated as ignore patterns,
    // but extglob negations like `!(foo)` should be treated as match patterns
    if (pattern.startsWith('!') && pattern[1] !== '(') {
      ignorePatterns.push(pattern.slice(1))
    } else {
      matchPatterns.push(pattern)
    }
  }

  // expand directory patterns with `/**` suffix for picomatch compatibility:
  // - `**/node_modules` matches the directory itself (for directory exclusion)
  // - `**/node_modules/**` matches files inside (for file-level filtering)
  const expandedIgnorePatterns = ignorePatterns.flatMap((p) => {
    // pattern like `dist/**` needs the base `dist` for directory exclusion
    if (p.endsWith('/**')) {
      return [p.slice(0, -3), p]
    }
    return p.endsWith('**') ? [p] : [p, `${p}/**`]
  })

  return {
    matchPatterns,
    ignorePatterns: expandedIgnorePatterns,
  }
}
