import { logger } from '@vuepress/utils'

import type { Page } from '../types/index.js'

/**
 * Label for pages that do not come from a source file
 */
const VIRTUAL_PAGE_LABEL = '(virtual page)'

interface DuplicateGroup {
  /**
   * Value that multiple pages resolve to
   */
  key: string

  /**
   * Pages that resolve to the same value
   */
  pages: Page[]
}

/**
 * Group pages by the given key, and only keep the groups that contain
 * more than one page
 */
const collectDuplicateGroups = (
  pages: Page[],
  getKey: (page: Page) => string,
): DuplicateGroup[] => {
  const groups = new Map<string, Page[]>()

  for (const page of pages) {
    const key = getKey(page)
    const group = groups.get(key)
    if (group) {
      group.push(page)
    } else {
      groups.set(key, [page])
    }
  }

  return [...groups]
    .filter(([, groupPages]) => groupPages.length > 1)
    .map(([key, groupPages]) => ({ key, pages: groupPages }))
    .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
}

/**
 * Format the source file path of a page for error messages
 */
const formatPageFilePath = (page: Page): string =>
  page.filePath ?? VIRTUAL_PAGE_LABEL

/**
 * Assert that every page resolves to a unique route path and a unique
 * rendered html file path
 *
 * Duplicate pages used to overwrite each other silently, which produced
 * a broken site without any error. This check makes the build fail
 * instead, and reports every conflict at once.
 *
 * It must be called after all pages have been resolved, because plugins
 * are allowed to change `page.path` in the `extendsPage` hook.
 *
 * @internal
 */
export const assertUniquePagePaths = (pages: Page[]): void => {
  const routePathGroups = collectDuplicateGroups(pages, (page) => page.path)

  // Output file conflicts that are fully covered by a route path conflict
  // are already explained by the route path group (e.g. `_foo.md` and
  // `foo.md`), so they are not reported again
  const outputFileGroups = collectDuplicateGroups(
    pages,
    (page) => page.htmlFilePath,
  ).filter(
    (group) =>
      !routePathGroups.some((routePathGroup) =>
        group.pages.every((page) => routePathGroup.pages.includes(page)),
      ),
  )

  const duplicateGroups = [
    ...routePathGroups.map((group) => ({
      ...group,
      type: 'route path' as const,
    })),
    ...outputFileGroups.map((group) => ({
      ...group,
      type: 'output file' as const,
    })),
  ]

  if (duplicateGroups.length === 0) return

  const message = [
    'Duplicate page paths detected:',
    ...duplicateGroups.map((group) =>
      [
        `- ${group.type} "${group.key}" is resolved by multiple pages:`,
        ...group.pages.map((page) => `    ${formatPageFilePath(page)}`),
      ].join('\n'),
    ),
    'Each page must resolve to a unique route path and output file. Rename the source file, or adjust the frontmatter `permalink` / `permalinkPattern`.',
  ].join('\n')

  throw logger.createError(message)
}
