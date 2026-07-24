import type { App } from '@vuepress/core'
import type { OutputChunk } from 'rolldown'

/**
 * Render prefetch links of current page
 */
export const renderPagePrefetchLinks = ({
  app,
  linkedPageChunkFiles,
  outputEntryChunk,
  pageChunkFiles,
}: {
  app: App
  linkedPageChunkFiles: Set<string>
  outputEntryChunk: OutputChunk
  pageChunkFiles: string[]
}): string => {
  // shouldPrefetch option
  const { shouldPrefetch } = app.options

  // do not render prefetch links
  if (shouldPrefetch === false) {
    return ''
  }

  let candidateFiles: string[]

  if (shouldPrefetch === 'as-needed') {
    // dynamic imports excluding current page chunks
    // filtered to only linked pages' chunk files
    candidateFiles = outputEntryChunk.dynamicImports.filter(
      (item) =>
        linkedPageChunkFiles.has(item) &&
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
