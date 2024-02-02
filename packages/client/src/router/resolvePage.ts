import type { PageMapItem, PageMetaDefault } from '@internal/pagesMap'
import { pagesMap } from './pagesMap.js'
import { resolvePagePath } from './resolvePagePath.js'

interface ResolvedPage<PageMeta extends PageMetaDefault = PageMetaDefault>
  extends PageMapItem<PageMeta> {
  path: string
}

/**
 * Resolve page with given raw path
 */
export const resolvePage = <PageMeta extends PageMetaDefault = PageMetaDefault>(
  path: string,
): ResolvedPage<PageMeta> => {
  const resolvedPath = resolvePagePath(path)
  const pageMapItem =
    pagesMap.value[resolvedPath] || pagesMap.value['/404.html']

  return {
    ...(pageMapItem as ResolvedPage<PageMeta>),
    path: resolvedPath,
  }
}
