import { ensureLeadingSlash, isString } from '@vuepress/shared'
import { path } from '@vuepress/utils'
import type { App, PageFrontmatter } from '../types/index.js'

/**
 * Resolve page permalink from frontmatter / options / pattern
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
  // use permalink in frontmatter directly
  if (isString(frontmatter.permalink)) {
    return frontmatter.permalink
  }

  if (frontmatter.permalink === null || frontmatter.permalinkPattern === null) {
    return null
  }

  // get permalink pattern
  const permalinkPattern =
    frontmatter.permalinkPattern || app.options.permalinkPattern

  if (!permalinkPattern) {
    return null
  }

  // resolve permalink according to the pattern
  const [year, month, day] = date.split('-')
  const link = path.join(
    pathLocale,
    permalinkPattern
      .replace(/:year/, year!)
      .replace(/:month/, month!)
      .replace(/:day/, day!)
      .replace(/:slug/, slug)
      .replace(/:raw/, pathInferred?.replace(/^\//, '') ?? ''),
  )

  return ensureLeadingSlash(link)
}
