import { path } from '@vuepress/utils'
import type { App } from '../types/index.js'

/**
 * Resolve page data file path
 */
export const resolvePageChunkInfo = ({
  app,
  htmlFilePathRelative,
  key,
}: {
  app: App
  htmlFilePathRelative: string
  key: string
}): {
  chunkFilePath: string
  chunkFilePathRelative: string
  chunkName: string
} => {
  const chunkFilePathRelative = path.join('pages', `${htmlFilePathRelative}.js`)
  const chunkFilePath = app.dir.temp(chunkFilePathRelative)
  const chunkName = key

  return {
    chunkFilePath,
    chunkFilePathRelative,
    chunkName,
  }
}
