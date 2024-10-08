import {
  ensureLeadingSlash,
  inferRoutePath,
  resolveLocalePath,
} from '@vuepress/shared'
import type { App } from '../types/index.js'

/**
 * Infer page path according to file path
 *
 * @internal
 */
export const inferPagePath = ({
  app,
  filePathRelative,
}: {
  app: App
  filePathRelative: string | null
}): {
  pathInferred: string | null
  pathLocale: string
} => {
  if (!filePathRelative) {
    return {
      pathInferred: null,
      pathLocale: '/',
    }
  }

  // infer page route path from file path
  // foo/bar.md -> /foo/bar.html
  const pathInferred = inferRoutePath(ensureLeadingSlash(filePathRelative))

  // resolve page locale path
  const pathLocale = resolveLocalePath(app.siteData.locales, pathInferred)

  return {
    pathInferred,
    pathLocale,
  }
}
