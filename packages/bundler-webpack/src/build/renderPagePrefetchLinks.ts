import type { PageChunkFilesMap } from '@vuepress/bundlerutils'
import { resolveLinkRoutePath } from '@vuepress/bundlerutils'
import type { App, Page } from '@vuepress/core'

import type { FileMeta } from './types.js'

/**
 * Render prefetch links of current page
 */
export const renderPagePrefetchLinks = ({
  app,
  asyncFilesMeta,
  pageClientFilesMeta,
  page,
  pageChunkFilesMap,
}: {
  app: App
  asyncFilesMeta: FileMeta[]
  pageClientFilesMeta: FileMeta[]
  page: Page
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
    // collect linked page chunk file names
    const linkedFileNames = new Set<string>()
    for (const link of page.links) {
      const routePath = resolveLinkRoutePath(link.absolute, app.options.base)
      if (routePath) {
        const targetChunks = pageChunkFilesMap.get(routePath)
        if (targetChunks) {
          for (const file of targetChunks) {
            linkedFileNames.add(file)
          }
        }
      }
    }
    // async files excluding files used by current page
    // filtered to only linked pages' chunk files
    prefetchFilesMeta = asyncFilesMeta.filter(
      ({ file }) =>
        linkedFileNames.has(file) &&
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
