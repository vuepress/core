import { resolveRoutePathWithExt, splitPath } from '@vuepress/shared'
import { routes } from '../internal/routes.js'
import type { Route, RouteMeta } from '../types/index.js'
import { resolveRouteKey } from './resolveRouteKey.js'

export interface ResolvedRoute<T extends RouteMeta = RouteMeta>
  extends Route<T> {
  path: string
  notFound: boolean
}

/**
 * Resolve route with given path
 */
export const resolveRoute = <T extends RouteMeta = RouteMeta>(
  path: string,
  currentPath?: string,
): ResolvedRoute<T> => {
  // get only the pathname from the path
  const { pathname, hashAndQueries } = splitPath(path)

  // resolve the route path
  const routeKey = resolveRouteKey(pathname, currentPath)
  const routeFullPath = __VUEPRESS_CLEAN_URL__
    ? routeKey
    : resolveRoutePathWithExt(routeKey) + hashAndQueries

  // the route not found
  if (!routes.value[routeKey]) {
    return {
      ...routes.value['/404'],
      path: routeFullPath,
      notFound: true,
    } as ResolvedRoute<T>
  }

  return {
    ...routes.value[routeKey],
    path: routeFullPath,
    notFound: false,
  } as ResolvedRoute<T>
}
