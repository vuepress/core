import { normalizeRoutePath } from '@vuepress/shared'
import { redirects, routes } from '../internal/routes.js'

/**
 * Resolve route path with given raw path
 */
export const resolveRoutePath = (path: string): string => {
  // normalized path
  const normalizedPath = normalizeRoutePath(path)
  if (routes.value[normalizedPath]) return normalizedPath

  // encoded path
  const encodedPath = encodeURI(normalizedPath)
  if (routes.value[encodedPath]) return encodedPath

  // redirected path or fallback to the normalized path
  return (
    redirects.value[normalizedPath] ||
    redirects.value[encodedPath] ||
    normalizedPath
  )
}
