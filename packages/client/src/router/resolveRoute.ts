import { resolveRoutePath } from './resolveRoutePath.js'
import type { PageMetaDefault, Route } from './routes.js'
import { routes } from './routes.js'

interface ResolvedRoute<PageMeta extends PageMetaDefault = PageMetaDefault>
  extends Route<PageMeta> {
  path: string
}

/**
 * Resolve route with given path
 */
export const resolveRoute = <
  PageMeta extends PageMetaDefault = PageMetaDefault,
>(
  path: string,
): ResolvedRoute<PageMeta> => {
  const routePath = resolveRoutePath(path)
  const route = routes.value[routePath] || routes.value['/404.html']

  return {
    ...route,
    path: routePath,
  } as ResolvedRoute<PageMeta>
}
