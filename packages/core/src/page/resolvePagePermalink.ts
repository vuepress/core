import { ensureLeadingSlash, isString } from '@vuepress/shared'
import { path } from '@vuepress/utils'
import type { App, PageFrontmatter } from '../types/index.js'

/**
 * Resolve page permalink from frontmatter / options / pattern
 *
 * @internal
 */
export const resolvePagePermalink = ({
  app,
  frontmatter,
  slug,
  date,
  pathInferred,
  pathLocale,
}: {
  app: App
  frontmatter: PageFrontmatter
  slug: string
  date: string
  pathInferred: string | null
  pathLocale: string
}): string | null => {
  // frontmatter.permalink has the highest priority
  if (frontmatter.permalink === null) {
    return null
  }
  if (isString(frontmatter.permalink)) {
    return frontmatter.permalink
  }

  // frontmatter.permalinkPattern has higher priority than app.options.permalinkPattern
  if (frontmatter.permalinkPattern === null) {
    return null
  }

  const permalinkPattern =
    frontmatter.permalinkPattern || app.options.route.permalinkPattern

  if (!isString(permalinkPattern)) {
    return null
  }

  // resolve permalink according to the pattern
  const [year, month, day] = date.split('-')
  const link = path.join(
    pathLocale,
    permalinkPattern
      .replace(/:year/, year)
      .replace(/:month/, month)
      .replace(/:day/, day)
      .replace(/:slug/, slug)
      .replace(/:raw/, pathInferred?.replace(/^\//, '') ?? ''),
  )

  return ensureLeadingSlash(link)
}
