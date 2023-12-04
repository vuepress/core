import type { PagesMap } from '@internal/pagesMap'
import { pagesMap, redirectsMap } from '../composables/index.js'
import { resolvers } from '../resolvers.js'

/**
 * Get all paths of pages
 *
 * @returns all paths of pages
 */
export const getPagesPath = (): string[] => Object.keys(pagesMap.value)

/**
 * Check whether the page exists
 *
 * @param path path of the page
 * @returns whether the page exists
 */
export const isPageExist = (path: string): boolean =>
  pagesMap.value.has(
    resolvers.resolvePagePath(pagesMap.value, redirectsMap.value, path),
  )

/**
 * Resolve final path and meta with given path
 *
 * @param path path of the page
 * @returns resolved path and meta
 */
export const resolve = <PageMeta>(
  path: string,
): { path: string; meta: PageMeta | null } => {
  path = resolvers.resolvePagePath(pagesMap.value, redirectsMap.value, path)

  return {
    path,
    meta: (pagesMap.value as PagesMap<PageMeta>).get(path)?.meta ?? null,
  }
}
