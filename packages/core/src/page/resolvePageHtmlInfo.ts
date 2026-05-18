import { removeLeadingSlash } from '@vuepress/shared'

import type { App } from '../types/index.js'

/**
 * Resolve page rendered html file path
 *
 * @internal
 */
export const resolvePageHtmlInfo = ({
  app,
  path: pagePath,
}: {
  app: App
  path: string
}): {
  htmlFilePath: string
  htmlFilePathRelative: string
} => {
  const path = decodeURI(pagePath)

  // /foo -> foo.html
  // /foo/ -> foo/index.html
  const htmlFilePathRelative = removeLeadingSlash(
    path.endsWith('/') ? `${path}index.html` : `${path}.html`,
  )
  const htmlFilePath = app.dir.dest(htmlFilePathRelative)

  return {
    htmlFilePath,
    htmlFilePathRelative,
  }
}
