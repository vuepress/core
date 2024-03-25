import { routes } from '../internal/routes.js'
import type { Route, RouteMeta } from '../types/index.js'
import { resolveRoutePath } from './resolveRoutePath.js'

interface ResolvedRoute<T extends RouteMeta = RouteMeta> extends Route<T> {
  path: string
  notFound: boolean
}

const FAKE_HOST = 'http://.'

/**
 * Resolve route with given path
 */
export const resolveRouteInfo = <T extends RouteMeta = RouteMeta>(
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

/**
 * Resolve route with given path
 */
export const resolveRoute = <T extends RouteMeta = RouteMeta>(
  path: string,
  current?: string,
): ResolvedRoute<T> => {
  if (current) {
    const loc = current.slice(0, current.lastIndexOf('/'))

    const routePath = new URL(`${loc}/${encodeURI(path)}`, FAKE_HOST).pathname

    return resolveRouteInfo(routePath)
  }

  return resolveRouteInfo(path)
}
