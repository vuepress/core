import { hash, path } from '@vuepress/utils'
import type { App } from '../types/index.js'

/**
 * Resolve page data file path
 */
export const resolvePageChunkInfo = ({
  app,
  htmlFilePathRelative,
}: {
  app: App
  htmlFilePathRelative: string
}): {
  chunkFilePath: string
  chunkFilePathRelative: string
  chunkName: string
} => {
  const chunkFilePathRelative = path.join('pages', `${htmlFilePathRelative}.js`)
  const chunkFilePath = app.dir.temp(chunkFilePathRelative)
  const chunkName = `v-${hash(htmlFilePathRelative)}`

  return {
    chunkFilePath,
    chunkFilePathRelative,
    chunkName,
  }
}
