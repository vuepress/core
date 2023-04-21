import { colors, fs, logger, path } from '@vuepress/utils'
import type { MarkdownEnv } from '../../types.js'
import type { ImportCodeTokenMeta } from './types.js'

export const resolveImportCode = (
  { importPath, lineStart, lineEnd }: ImportCodeTokenMeta,
  { filePath }: MarkdownEnv
): {
  importFilePath: string | null
  importCode: string
} => {
  let importFilePath = importPath

  if (!path.isAbsolute(importPath)) {
    // if the importPath is relative path, we need to resolve it
    // according to the markdown filePath
    if (!filePath) {
      logger.error(
        `Import file ${colors.magenta(importPath)} can not be resolved`
      )
      return {
        importFilePath: null,
        importCode: 'Error when resolving path',
      }
    }
    importFilePath = path.resolve(filePath, '..', importPath)
  }

  // check file existence
  if (!fs.existsSync(importFilePath)) {
    logger.error(`Import file ${colors.magenta(importPath)} not found`)
    return {
      importFilePath,
      importCode: 'File not found',
    }
  }

  // read file content
  const fileContent = fs.readFileSync(importFilePath).toString()

  // resolve partial import
  return {
    importFilePath,
    importCode: fileContent
      .split('\n')
      .slice(lineStart ? lineStart - 1 : lineStart, lineEnd)
      .join('\n')
      .replace(/\n?$/, '\n'),
  }
}
