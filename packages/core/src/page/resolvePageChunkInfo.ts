import { path, transformPathToFileName } from '@vuepress/utils'
import type { App } from '../types/index.js'

/**
 * Resolve page chunk file relative info
 *
 * @internal
 */
export const resolvePageChunkInfo = ({
  app,
  filePath,
  filePathRelative,
  htmlFilePathRelative,
}: {
  app: App
  filePath: string | null
  filePathRelative: string | null
  htmlFilePathRelative: string
}): {
  chunkFilePath: string
  chunkFilePathRelative: string
  chunkName: string
} => {
  const chunkName = transformPathToFileName(htmlFilePathRelative)

  // if there is a source file for the page, use it directly as the page chunk
  if (filePath && filePathRelative) {
    return {
      chunkFilePath: filePath,
      chunkFilePathRelative: filePathRelative,
      chunkName,
    }
  }

  // otherwise, generate a temp file for the page
  const chunkFilePathRelative = path.join(
    'pages',
    `${htmlFilePathRelative}.vue`,
  )
  const chunkFilePath = app.dir.temp(chunkFilePathRelative)

  return {
    chunkFilePath,
    chunkFilePathRelative,
    chunkName,
  }
}
