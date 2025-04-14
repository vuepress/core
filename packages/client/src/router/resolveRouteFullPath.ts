import { resolveRoutePathWithExt, splitPath } from '@vuepress/shared'
import { resolveRouteCleanPath } from './resolveRouteCleanPath.js'

/**
 * Resolve route full path with given raw path
 */
export const resolveRouteFullPath = (
  path: string,
  currentPath?: string,
): string => {
  const { pathname, hashAndQueries } = splitPath(path)
  const routeCleanPath = resolveRouteCleanPath(pathname, currentPath)

  return (
    (__VUEPRESS_CLEAN_URL__
      ? routeCleanPath
      : resolveRoutePathWithExt(routeCleanPath)) + hashAndQueries
  )
}
