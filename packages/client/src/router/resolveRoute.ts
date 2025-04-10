import { resolveRoutePathWithExt, splitPath } from '@vuepress/shared'
import { routes } from '../internal/routes.js'
import type { Route, RouteMeta } from '../types/index.js'
import { resolveRouteCleanPath } from './resolveRouteCleanPath.js'

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
  const cleanRoutePath = resolveRouteCleanPath(pathname, currentPath)
  const routeFullPath = __VUEPRESS_CLEAN_URL__
    ? cleanRoutePath
    : resolveRoutePathWithExt(cleanRoutePath) + hashAndQueries

  // the route not found
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unsafe indexed access
  if (!routes.value[cleanRoutePath]) {
    return {
      ...routes.value['/404'],
      path: routeFullPath,
      notFound: true,
    } as ResolvedRoute<T>
  }

  return {
    ...routes.value[cleanRoutePath],
    path: routeFullPath,
    notFound: false,
  } as ResolvedRoute<T>
}
