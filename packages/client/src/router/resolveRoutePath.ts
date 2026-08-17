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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unsafe indexed access
  if (routes.value[normalizedRoutePath]) return normalizedRoutePath

  // check encoded path
  const encodedRoutePath = encodeURI(normalizedRoutePath)

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unsafe indexed access
  if (routes.value[encodedRoutePath]) {
    return encodedRoutePath
  }

  // check redirected path with normalized path and encoded path
  const redirectedRoutePath =
    redirects.value[normalizedRoutePath] || redirects.value[encodedRoutePath]

  if (redirectedRoutePath) {
    return redirectedRoutePath
  }

  // fallback to the directory route
  // when the normalized path ends with `.html` but no matching `.html` route exists,
  // try to match the directory route instead, e.g. `/foo` -> `/foo.html` -> `/foo/`
  if (normalizedRoutePath.endsWith('.html')) {
    const directoryRoutePath = `${normalizedRoutePath.slice(
      0,
      -'.html'.length,
    )}/`
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unsafe indexed access
    if (routes.value[directoryRoutePath]) {
      return directoryRoutePath
    }
  }

  // default to normalized route path
  return normalizedRoutePath
}
