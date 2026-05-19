import type { PageChunkFilesMap } from '@vuepress/bundlerutils'
import { resolveLinkRoutePath } from '@vuepress/bundlerutils'
import type { App, Page } from '@vuepress/core'
import type { OutputChunk } from 'rolldown'

/**
 * Render preload links of current page
 */
export const renderPagePreloadLinks = ({
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
  // shouldPreload option
  const { shouldPreload } = app.options

  // do not render preload links
  if (shouldPreload === false) {
    return ''
  }

  // dedupe entry chunks and page chunks
  const preloadFiles = Array.from(
    new Set([
      outputEntryChunk.fileName,
      ...outputEntryChunk.imports,
      ...pageChunkFiles,
    ]),
  )

  // when 'as-needed', also add linked pages' chunk files
  if (shouldPreload === 'as-needed') {
    for (const link of page.links) {
      const routePath = resolveLinkRoutePath(link.absolute, app.options.base)
      if (routePath) {
        const targetChunks = pageChunkFilesMap.get(routePath)
        if (targetChunks) {
          for (const file of targetChunks) {
            if (!preloadFiles.includes(file)) {
              preloadFiles.push(file)
            }
          }
        }
      }
    }
  }

  return preloadFiles
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
