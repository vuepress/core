import {
  ensureLeadingSlash,
  inferRoutePath,
  resolveLocalePath,
} from '@vuepress/shared'
import type { App, PageOptions } from '../types/index.js'

/**
 * Infer page path according to file path
 *
 * @internal
 */
export const inferPagePath = ({
  app,
  filePathRelative,
  options,
}: {
  app: App
  filePathRelative: string | null
  options: PageOptions
}): {
  pathInferred: string | null
  pathLocale: string
} => {
  // user has explicitly set path in options
  if (options.path) {
    const pathLocale = resolveLocalePath(app.siteData.locales, options.path)

    return {
      pathInferred: filePathRelative
        ? inferRoutePath(ensureLeadingSlash(filePathRelative))
        : null,
      pathLocale,
    }
  }

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
