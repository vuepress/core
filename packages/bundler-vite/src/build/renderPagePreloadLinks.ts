import type { App } from '@vuepress/core'
import type { OutputChunk } from 'rolldown'

/**
 * Render preload links of current page
 */
export const renderPagePreloadLinks = ({
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
  // shouldPreload option
  const { shouldPreload } = app.options

  // do not render preload links
  if (shouldPreload === false) {
    return ''
  }

  // dedupe entry chunks and page chunks
  const preloadFiles = new Set([
    outputEntryChunk.fileName,
    ...outputEntryChunk.imports,
    ...pageChunkFiles,
  ])

  // when 'as-needed', also add linked pages' chunk files
  if (shouldPreload === 'as-needed') {
    for (const file of linkedPageChunkFiles) {
      preloadFiles.add(file)
    }
  }

  return Array.from(preloadFiles)
    .map((item) => {
      // resolve file type
      const type = item.endsWith('.js')
        ? 'script'
        : item.endsWith('.css')
          ? 'style'
          : ''

      // by default, we only preload js and css
      if (shouldPreload === true && type !== 'script' && type !== 'style') {
        return ''
      }

      // user wants to explicitly control what to preload
      if (
        shouldPreload !== true &&
        shouldPreload !== 'as-needed' &&
        !shouldPreload(item, type)
      ) {
        return ''
      }

      if (type === 'script') {
        return `<link rel="modulepreload" href="${app.options.base}${item}">`
      }

      return `<link rel="preload" href="${app.options.base}${item}"${
        type !== '' ? ` as="${type}"` : ''
      }>`
    })
    .join('')
}
