import { splitPath } from '@vuepress/shared'
import { routes } from '../internal/routes.js'
import type { Route, RouteMeta } from '../types/index.js'
import { resolveRoutePath } from './resolveRoutePath.js'

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
  const routePath = resolveRoutePath(pathname, currentPath)
  const routeFullPath = routePath + hashAndQueries

  // the route not found
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unsafe indexed access
  if (!routes.value[routePath]) {
    return {
      ...routes.value['/404.html'],
      path: routeFullPath,
      notFound: true,
    } as ResolvedRoute<T>
  }

  return {
    ...routes.value[routePath],
    path: routeFullPath,
    notFound: false,
  } as ResolvedRoute<T>
}
