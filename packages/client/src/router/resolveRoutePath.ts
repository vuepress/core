import { normalizeRoutePath } from '@vuepress/shared'
import { redirects, routes } from '../internal/routes.js'

/**
 * Resolve route path with given raw path
 */
export const resolveRoutePath = (
  pathname: string,
  currentPath?: string,
): string => {
  // normalized path
  const normalizedRoutePath = normalizeRoutePath(pathname, currentPath)

  // check if the normalized path is in routes
  if (routes.value[normalizedRoutePath]) return normalizedRoutePath

  // check encoded path
  const encodedRoutePath = encodeURI(normalizedRoutePath)

  if (routes.value[encodedRoutePath]) {
    return encodedRoutePath
  }

  // check redirected path with normalized path and encoded path
  const redirectedRoutePath =
    redirects.value[normalizedRoutePath] || redirects.value[encodedRoutePath]

  if (redirectedRoutePath) {
    return redirectedRoutePath
  }

  // default to normalized route path
  return normalizedRoutePath
}
