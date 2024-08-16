import { isString } from '@vuepress/shared'
import type { App, PageFrontmatter } from '../types/index.js'

/**
 * Resolve language of page
 */
export const resolvePageLang = ({
  app,
  frontmatter,
  pathLocale,
}: {
  app: App
  frontmatter: PageFrontmatter
  pathLocale: string
}): string => {
  if (isString(frontmatter.lang) && frontmatter.lang) {
    return frontmatter.lang
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unsafe indexed access
  return app.siteData.locales[pathLocale]?.lang ?? app.siteData.lang
}
