import { isString } from '@vuepress/shared'
import { debug, fs } from '@vuepress/utils'
import type { PageOptions } from '../types/index.js'

const log = debug('vuepress:core/page')

// fallback to empty string
const FALLBACK_CONTENT = ''

/**
 * Resolve page content according to `content` or `filePath`
 */
export const resolvePageContent = async ({
  filePath,
  options,
}: {
  filePath: string | null
  options: PageOptions
}): Promise<string> => {
  // if `content` is provided by options, use it directly
  if (isString(options.content)) {
    return options.content
  }

  // if `filePath` is resolved, read content from file
  if (filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      return content
    } catch (e) {
      log(e instanceof Error ? e.message : e)
    }
  }

  return FALLBACK_CONTENT
}
