import type { Page } from '@vuepress/core'

import { resolveLinkRoutePath } from './resolveLinkRoutePath.js'
import type { PageChunkFilesMap } from './types.js'

/**
 * Resolve the chunk output file names of pages linked from the current page.
 */
export const resolveLinkedPageChunkFiles = ({
  base,
  page,
  pageChunkFilesMap,
}: {
  base: string
  page: Page
  pageChunkFilesMap: PageChunkFilesMap
}): Set<string> => {
  const linkedPageChunkFiles = new Set<string>()

  for (const link of page.links) {
    const routePath = resolveLinkRoutePath(link.absolute, base)
    if (routePath) {
      const targetChunks = pageChunkFilesMap.get(routePath)
      if (targetChunks) {
        for (const file of targetChunks) {
          linkedPageChunkFiles.add(file)
        }
      }
    }
  }

  return linkedPageChunkFiles
}
