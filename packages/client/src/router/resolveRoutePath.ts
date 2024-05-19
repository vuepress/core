import { normalizeRoutePath, resolveRoutePathname } from '@vuepress/shared'
import { redirects, routes } from '../internal/routes.js'

/**
 * Resolve route path with given raw path
 */
export const resolveRoutePath = (
  path: string,
  currentPath?: string,
): string => {
  // normalized path
  const normalizedPath = normalizeRoutePath(path, currentPath)
  const normalizedPathname = resolveRoutePathname(normalizedPath)
  if (routes.value[normalizedPathname]) return normalizedPath
  // encoded path
  const encodedPathname = encodeURI(normalizedPathname)
  if (routes.value[encodedPathname]) return encodeURI(normalizedPath)

  // redirected path or fallback to the normalized path
  return (
    redirects.value[normalizedPathname] ||
    redirects.value[encodedPathname] ||
    normalizedPath
  )
}
