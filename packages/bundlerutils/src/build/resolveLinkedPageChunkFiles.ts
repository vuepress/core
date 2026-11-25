import type { Page } from '@vuepress/core'

import { resolveLinkRouteKey } from './resolveLinkRouteKey.js'
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
    const routeKey = resolveLinkRouteKey({
      base,
      current: page.routeKey,
      link,
    })
    if (routeKey) {
      const targetChunks = pageChunkFilesMap.get(routeKey)
      if (targetChunks) {
        for (const file of targetChunks) {
          linkedPageChunkFiles.add(file)
        }
      }
    }
  }

  return linkedPageChunkFiles
}
