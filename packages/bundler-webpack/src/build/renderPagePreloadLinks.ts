import type { PageChunkFilesMap } from '@vuepress/bundlerutils'
import { resolveLinkRoutePath } from '@vuepress/bundlerutils'
import type { App, Page } from '@vuepress/core'

import { resolveFileMeta } from './resolveFileMeta.js'
import type { FileMeta } from './types.js'

/**
 * Render preload links of current page
 */
export const renderPagePreloadLinks = ({
  app,
  initialFilesMeta,
  pageClientFilesMeta,
  page,
  pageChunkFilesMap,
}: {
  app: App
  initialFilesMeta: FileMeta[]
  pageClientFilesMeta: FileMeta[]
  page: Page
  pageChunkFilesMap: PageChunkFilesMap
}): string => {
  // shouldPreload option
  const { shouldPreload } = app.options

  // do not render preload links
  if (shouldPreload === false) {
    return ''
  }

  // initial files and files used by current page should be preload
  const preloadFilesMeta = [...initialFilesMeta, ...pageClientFilesMeta]

  // when 'as-needed', also add linked pages' chunk files
  if (shouldPreload === 'as-needed') {
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
    for (const fileName of linkedFileNames) {
      if (!preloadFilesMeta.some((f) => f.file === fileName)) {
        preloadFilesMeta.push(resolveFileMeta(fileName))
      }
    }
  }

  return preloadFilesMeta
    .map(({ file, extension, type }) => {
      // by default, we only preload scripts or css
      if (shouldPreload === true && type !== 'script' && type !== 'style') {
        return ''
      }

      // user wants to explicitly control what to preload
      if (
        shouldPreload !== true &&
        shouldPreload !== 'as-needed' &&
        !shouldPreload(file, type)
      ) {
        return ''
      }

      return `<link rel="preload" href="${app.options.base}${file}"${
        type !== '' ? ` as="${type}"` : ''
      }${type === 'font' ? ` type="font/${extension}" crossorigin` : ''}>`
    })
    .join('')
}
