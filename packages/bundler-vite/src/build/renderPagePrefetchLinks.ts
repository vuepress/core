import type { PageChunkFilesMap } from '@vuepress/bundlerutils'
import { resolveLinkRoutePath } from '@vuepress/bundlerutils'
import type { App, Page } from '@vuepress/core'
import type { OutputChunk } from 'rolldown'

/**
 * Render prefetch links of current page
 */
export const renderPagePrefetchLinks = ({
  app,
  outputEntryChunk,
  pageChunkFiles,
  page,
  pageChunkFilesMap,
}: {
  app: App
  outputEntryChunk: OutputChunk
  pageChunkFiles: string[]
  page: Page
  pageChunkFilesMap: PageChunkFilesMap
}): string => {
  // shouldPrefetch option
  const { shouldPrefetch } = app.options

  // do not render prefetch links
  if (shouldPrefetch === false) {
    return ''
  }

  let candidateFiles: string[]

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
    // dynamic imports excluding current page chunks
    // filtered to only linked pages' chunk files
    candidateFiles = outputEntryChunk.dynamicImports.filter(
      (item) =>
        linkedFileNames.has(item) &&
        !pageChunkFiles.some((file) => file === item),
    )
  } else {
    // dynamic imports excluding current page chunks
    candidateFiles = outputEntryChunk.dynamicImports.filter(
      (item) => !pageChunkFiles.some((file) => file === item),
    )
  }

  return candidateFiles
    .map((item) => {
      // resolve file type
      const type = item.endsWith('.js')
        ? 'script'
        : item.endsWith('.css')
          ? 'style'
          : ''

      // user wants to explicitly control what to prefetch
      if (
        shouldPrefetch !== true &&
        shouldPrefetch !== 'as-needed' &&
        !shouldPrefetch(item, type)
      ) {
        return ''
      }
      return `<link rel="prefetch" href="${app.options.base}${item}" as="${type}">`
    })
    .join('')
}
