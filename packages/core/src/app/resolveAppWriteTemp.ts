import { fs, hash } from '@vuepress/utils'
import type { AppDir, AppWriteTemp } from '../types/index.js'

interface WriteTempCache {
  hash?: string // content hash
  current?: Promise<void> // the current writing promise
  next?: () => Promise<void> // the next writing promise
}
/**
 * Resolve write temp file util for vuepress app
 *
 * @internal
 */
export const resolveAppWriteTemp = (dir: AppDir): AppWriteTemp => {
  const cache = new Map<string, WriteTempCache>()

  const writeTemp: AppWriteTemp = async (file: string, content: string) => {
    const filePath = dir.temp(file)
    const contentHash = hash(content)

    let item = cache.get(filePath)
    if (!item) {
      cache.set(filePath, (item = {}))
    }

    // if content hash is the same as the last one, skip writing
    if (item.hash === contentHash) {
      return filePath
    }

    item.hash = contentHash

    if (!item.current) {
      item.current = (async () => {
        await fs.outputFile(filePath, content)
        // if there is a next writing promise, chain it with the current one
        item.current = item.next?.()
        return item.current
      })()
    } else {
      // if there is a current writing promise, save the next writing promise
      item.next = async () => {
        await fs.outputFile(filePath, content)
        item.next = undefined
        item.current = undefined
      }
    }
    await item.current
    return filePath
  }

  return writeTemp
}
