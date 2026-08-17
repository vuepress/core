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
  // when the raw path has no extension and the normalized `.html` route does not exist,
  // try to match the directory route instead, e.g. `/foo` -> `/foo.html` -> `/foo/`
  // the same-named file route is prioritized, so `/foo` will resolve to `/foo.html`
  // when `foo.md` exists, and only fallback to `/foo/` when it does not
  if (normalizedRoutePath.endsWith('.html') && !pathname.includes('.')) {
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
