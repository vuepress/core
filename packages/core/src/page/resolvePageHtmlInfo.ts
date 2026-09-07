import { removeLeadingSlash } from '@vuepress/shared'

import type { App } from '../types/index.js'

/**
 * Resolve page rendered html file path
 *
 * The html file path is derived from the canonical route key of the page,
 * so that it stays the same no matter `cleanUrl` is enabled or not.
 *
 * @internal
 */
export const resolvePageHtmlInfo = ({
  app,
  routeKey,
}: {
  app: App
  routeKey: string
}): {
  htmlFilePath: string
  htmlFilePathRelative: string
} => {
  const routePath = decodeURI(routeKey)

  // /foo -> foo.html
  // /foo/ -> foo/index.html
  const htmlFilePathRelative = removeLeadingSlash(
    routePath.endsWith('/') ? `${routePath}index.html` : `${routePath}.html`,
  )
  const htmlFilePath = app.dir.dest(htmlFilePathRelative)

  return {
    htmlFilePath,
    htmlFilePathRelative,
  }
}
