import { logger, path, sanitizePathSegment } from '@vuepress/utils'

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

  // normalize the path first, so that dot segments (`.`, `..`) are resolved
  // before each segment is sanitized, and then sanitize every segment to avoid
  // invalid characters and nested path segments
  const segments = path.normalize(pagePath).split('/')

  return encodeURI(
    segments
      .map((segment) => (segment === '' ? '' : sanitizePathSegment(segment)))
      .join('/'),
  )
}
