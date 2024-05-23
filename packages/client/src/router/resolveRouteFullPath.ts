import { splitPath } from '@vuepress/shared'
import { resolveRoutePath } from './resolveRoutePath.js'

/**
 * Resolve route full path with given raw path
 */
export const resolveRouteFullPath = (
  path: string,
  currentPath?: string,
): string => {
  const { pathname, hashAndQueries } = splitPath(path)
  return resolveRoutePath(pathname, currentPath) + hashAndQueries
}
