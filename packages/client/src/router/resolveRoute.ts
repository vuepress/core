import type { Route, RouteMeta } from '../types/index.js'
import { resolveRoutePath } from './resolveRoutePath.js'
import { routes } from './routes.js'

interface ResolvedRoute<T extends RouteMeta = RouteMeta> extends Route<T> {
  path: string
  notFound: boolean
}

/**
 * Resolve route with given path
 */
export const resolveRoute = <T extends RouteMeta = RouteMeta>(
  path: string,
): ResolvedRoute<T> => {
  const routePath = resolveRoutePath(path)
  const route = routes.value[routePath] ?? {
    ...routes.value['/404.html'],
    notFound: true,
  }

  return {
    path: routePath,
    notFound: false,
    ...route,
  } as ResolvedRoute<T>
}
