import { pagesMap } from '@internal/pagesMap'
import type { PagesMap } from '@internal/pagesMap'
import { resolvers } from '../resolvers.js'

/**
 * Check whether the page exists
 *
 * @param path path of the page
 */
export const hasPage = (path: string): boolean =>
  pagesMap.has(resolvers.resolvePagePath(pagesMap, path))

export const resolve = <PageMeta>(
  path: string,
): { path: string; meta: PageMeta | null } => {
  path = resolvers.resolvePagePath(pagesMap, path)

  return {
    path,
    meta: (pagesMap as PagesMap<PageMeta>).get(path)?.meta ?? null,
  }
}
