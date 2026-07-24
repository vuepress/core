import type { App } from '@vuepress/core'

import { resolveFileMeta } from './resolveFileMeta.js'
import type { FileMeta } from './types.js'

/**
 * Render preload links of current page
 */
export const renderPagePreloadLinks = ({
  app,
  initialFilesMeta,
  linkedPageChunkFiles,
  pageClientFilesMeta,
}: {
  app: App
  initialFilesMeta: FileMeta[]
  linkedPageChunkFiles: Set<string>
  pageClientFilesMeta: FileMeta[]
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
    const preloadFileNames = new Set(preloadFilesMeta.map(({ file }) => file))
    for (const fileName of linkedPageChunkFiles) {
      if (!preloadFileNames.has(fileName)) {
        preloadFileNames.add(fileName)
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
