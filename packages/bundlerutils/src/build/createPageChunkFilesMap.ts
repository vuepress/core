import type { Page } from '@vuepress/core'
import { resolvePageRedirects } from '@vuepress/core'

import type { PageChunkFilesMap } from './types.js'

/**
 * Create a map from page route paths to their chunk output file names.
 */
export const createPageChunkFilesMap = ({
  pages,
  resolvePageChunkFiles,
}: {
  pages: Page[]
  resolvePageChunkFiles: (page: Page) => string[]
}): PageChunkFilesMap => {
  const pageChunkFilesMap: PageChunkFilesMap = new Map()

  for (const page of pages) {
    const pageChunkFiles = resolvePageChunkFiles(page)

    pageChunkFilesMap.set(page.path, pageChunkFiles)
    for (const redirect of resolvePageRedirects(page)) {
      pageChunkFilesMap.set(redirect, pageChunkFiles)
    }
  }

  return pageChunkFilesMap
}
