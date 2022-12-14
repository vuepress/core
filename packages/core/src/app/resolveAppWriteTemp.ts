import { fs } from '@vuepress/utils'
import type { AppDir, AppWriteTemp } from '../types/index.js'

/**
 * Resolve write temp file util for vuepress app
 */
export const resolveAppWriteTemp = (dir: AppDir): AppWriteTemp => {
  const writeTemp: AppWriteTemp = async (file: string, content: string) => {
    const filePath = dir.temp(file)
    await fs.outputFile(filePath, content)
    return filePath
  }
  return writeTemp
}
