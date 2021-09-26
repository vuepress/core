import { logger, path } from '@vuepress/utils'
import type { App, PageOptions } from '../types'

/**
 * Resolve absolute and relative path of page file
 */
export const resolvePageFilePath = ({
  app,
  options,
}: {
  app: App
  options: PageOptions
}): {
  filePath: string | null
  filePathRelative: string | null
} => {
  // empty file path
  if (!options.filePath) {
    return {
      filePath: null,
      filePathRelative: null,
    }
  }

  if (!path.isAbsolute(options.filePath)) {
    throw logger.createError(
      `filePath is not absolute file path: ${options.filePath}}`
    )
  }

  return {
    filePath: options.filePath,
    filePathRelative: path.relative(app.dir.source(), options.filePath),
  }
}
