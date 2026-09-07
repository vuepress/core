import type { PageChunkFilesMap } from '@vuepress/bundlerutils'
import { resolveLinkedPageChunkFiles } from '@vuepress/bundlerutils'
import type { App, Page } from '@vuepress/core'

import type { FileMeta } from './types.js'

/**
 * Render prefetch links of current page
 */
export const renderPagePrefetchLinks = ({
  app,
  asyncFilesMeta,
  page,
  pageClientFilesMeta,
  pageChunkFilesMap,
}: {
  app: App
  asyncFilesMeta: FileMeta[]
  page: Page
  pageClientFilesMeta: FileMeta[]
  pageChunkFilesMap: PageChunkFilesMap
}): string => {
  // shouldPrefetch option
  const { shouldPrefetch } = app.options

  // do not render prefetch links
  if (shouldPrefetch === false) {
    return ''
  }

  let prefetchFilesMeta: FileMeta[]

  if (shouldPrefetch === 'as-needed') {
    const linkedPageChunkFiles = resolveLinkedPageChunkFiles({
      base: app.options.base,
      page,
      pageChunkFilesMap,
    })

    // async files excluding files used by current page
    // filtered to only linked pages' chunk files
    prefetchFilesMeta = asyncFilesMeta.filter(
      ({ file }) =>
        linkedPageChunkFiles.has(file) &&
        !pageClientFilesMeta.some((f) => f.file === file),
    )
  } else {
    // async files excluding files used by current page should be prefetch
    prefetchFilesMeta = asyncFilesMeta.filter(
      ({ file }) => !pageClientFilesMeta.some((f) => f.file === file),
    )
  }

  return prefetchFilesMeta
    .map(({ file, type }) => {
      // user wants to explicitly control what to prefetch
      if (
        shouldPrefetch !== true &&
        shouldPrefetch !== 'as-needed' &&
        !shouldPrefetch(file, type)
      ) {
        return ''
      }
      return `<link rel="prefetch" href="${app.options.base}${file}" as="${type}">`
    })
    .join('')
}
