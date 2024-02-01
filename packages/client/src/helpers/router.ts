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
export const hasPage = (path: string): boolean =>
  !!pagesMap.value[
    resolvers.resolvePagePath(pagesMap.value, redirectsMap.value, path)
  ]

/**
 * Resolve final path and meta with given path
 *
 * @param path path of the page
 * @returns resolved path and meta
 */
export const resolve = <PageMeta = Record<string, unknown> | null>(
  path: string,
): { path: string; meta: PageMeta | null } => {
  const resolvedPath = resolvers.resolvePagePath(
    pagesMap.value,
    redirectsMap.value,
    path,
  )
  return {
    path: resolvedPath,
    meta: (pagesMap.value[resolvedPath]?.meta ?? null) as PageMeta,
  }
}
