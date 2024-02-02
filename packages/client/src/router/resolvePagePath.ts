import { normalizePath } from '@vuepress/shared'
import { pagesMap, redirectsMap } from './pagesMap.js'

/**
 * Resolve page path with given raw path
 */
export const resolvePagePath = (path: string): string => {
  // normalized path
  const normalizedPath = normalizePath(path)
  if (pagesMap.value[normalizedPath]) return normalizedPath

  // encoded path
  const encodedPath = encodeURI(normalizedPath)
  if (pagesMap.value[encodedPath]) return encodedPath

  // redirected path or fallback to the normalized path
  return redirectsMap.value[normalizedPath] || normalizedPath
}
