import { resolveRouteFullPath } from '@vuepress/shared'
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
  const routePath = resolveRoutePath(path, currentPath)
  const [pathname] = resolveRouteFullPath(routePath)
  const route = routes.value[pathname] ?? {
    ...routes.value['/404.html'],
    notFound: true,
  }

  return {
    path: routePath,
    notFound: false,
    ...route,
  } as ResolvedRoute<T>
}
