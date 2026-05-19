import { inferRoutePath } from '@vuepress/shared'

/**
 * Normalize a MarkdownLink's absolute path to a route path
 * that can be matched against Page.path.
 *
 * Returns null if the link is unresolvable.
 */
export const resolveLinkRoutePath = (
  absolute: string | null,
  base: string,
): string | null => {
  if (!absolute) return null

  // Strip base prefix, ensuring leading slash
  const pathWithoutBase = absolute.startsWith(base)
    ? `/${absolute.slice(base.length)}`
    : absolute

  return inferRoutePath(pathWithoutBase)
}
