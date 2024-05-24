import { resolveRoutePathWithExt } from '@vuepress/shared'
import { resolveRouteKey } from './resolveRouteKey.js'

/**
 * Resolve route path with given raw path
 */
export const resolveRoutePath = (
  pathname: string,
  currentPath?: string,
): string => {
  // clean route path format used as key in routes
  const routeKey = resolveRouteKey(pathname, currentPath)

  return __VUEPRESS_CLEAN_URL__ ? routeKey : resolveRoutePathWithExt(routeKey)
}
