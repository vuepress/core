import { normalizeRoutePath, resolveRouteFullPath } from '@vuepress/shared'
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
  const [normalizedPathname, queryAndHash] =
    resolveRouteFullPath(normalizedPath)

  if (routes.value[normalizedPathname]) return normalizedPath

  // encoded path
  const encodedPathname = encodeURI(normalizedPathname)
  if (routes.value[encodedPathname]) return encodeURI(normalizedPath)

  // redirected path
  const redirectPath =
    redirects.value[normalizedPathname] || redirects.value[encodedPathname]
  if (redirectPath) return redirectPath + queryAndHash

  // fallback to the normalized path
  return normalizedPath
}
