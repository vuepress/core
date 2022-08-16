import { fs } from '@vuepress/utils'
import type { AppDir, AppWriteTemp } from '../types/index.js'

/**
 * Resolve write temp file util for vuepress app
 */
export const resolveAppWriteTemp = (dir: AppDir): AppWriteTemp => {
  const tempCache = new Map<string, string>()

  const writeTemp: AppWriteTemp = async (file: string, content: string) => {
    const filePath = dir.temp(file)
    const contentCached = tempCache.get(filePath)
    if (contentCached !== content) {
      await fs.outputFile(filePath, content)
      tempCache.set(filePath, content)
    }
    return filePath
  }

  return writeTemp
}
