import { logger, sanitizeFileName } from '@vuepress/utils'
import type { PageOptions } from '../types/index.js'

/**
 * Resolve the final route path of a page
 *
 * @internal
 */
export const resolvePagePath = ({
  permalink,
  pathInferred,
  options,
}: {
  permalink: string | null
  pathInferred: string | null
  options: PageOptions
}): string => {
  const pagePath = options.path || permalink || pathInferred

  if (!pagePath) {
    throw logger.createError(
      `page path is empty, page options: ${JSON.stringify(options, null, 2)}`,
    )
  }

  return encodeURI(pagePath.split('/').map(sanitizeFileName).join('/'))
}
