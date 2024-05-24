import { normalizeRoutePath } from '@vuepress/shared'
import { redirects, routes } from '../internal/routes.js'

/**
 * Resolve route path with given raw path
 */
export const resolveRouteKey = (
  pathname: string,
  currentPath?: string,
): string => {
  // normalized path
  const routePath = normalizeRoutePath(pathname, currentPath)

  // check if the normalized path is in routes
  if (routes.value[routePath]) return routePath

  // check encoded path
  const encodedRoutePath = encodeURI(routePath)

  if (routes.value[encodedRoutePath]) {
    return encodedRoutePath
  }

  // check redirected path with normalized path and encoded path
  const redirectedRoutePath =
    redirects.value[routePath] || redirects.value[encodedRoutePath]

  if (redirectedRoutePath) {
    return redirectedRoutePath
  }

  // default to normalized route path
  return routePath
}
