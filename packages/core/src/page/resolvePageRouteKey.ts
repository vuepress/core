import { inferRouteKey } from '@vuepress/shared'
import { logger, sanitizeFileName } from '@vuepress/utils'

import type { PageOptions } from '../types/index.js'

/**
 * Resolve the canonical route key of a page
 *
 * The route key is always in the "clean" format, i.e. without the trailing
 * `.html` suffix, and is used as the canonical identity of the page.
 *
 * @internal
 */
export const resolvePageRouteKey = ({
  permalink,
  pathInferred,
  options,
}: {
  permalink: string | null
  pathInferred: string | null
  options: PageOptions
}): string => {
  const routeKey = options.path
    ? inferRouteKey(options.path)
    : permalink || pathInferred

  if (!routeKey) {
    throw logger.createError(
      `page path is empty, page options: ${JSON.stringify(options, null, 2)}`,
    )
  }

  return (
    encodeURI(routeKey.split('/').map(sanitizeFileName).join('/'))
      // get clean format
      .replace(/\.html$/, '')
  )
}
