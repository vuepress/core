import type { PageRouteItem } from '@vuepress/client'
import { ensureLeadingSlash } from '@vuepress/shared'
import type { App, Page } from '../../types/index.js'

/**
 * Resolve page route item
 */
const resolvePageRouteItem = ({
  key,
  path,
  pathInferred,
  filePathRelative,
  routeMeta,
}: Page): PageRouteItem => {
  // paths that should redirect to this page, use set to dedupe
  const redirectsSet = new Set<string>()

  // redirect from decoded path
  redirectsSet.add(decodeURI(path))

  if (path.endsWith('/')) {
    // redirect from index path
    redirectsSet.add(path + 'index.html')
  } else {
    // redirect from the path that does not end with `.html`
    redirectsSet.add(path.replace(/.html$/, ''))
  }

  // redirect from inferred path
  if (pathInferred !== null) {
    redirectsSet.add(pathInferred)
    redirectsSet.add(encodeURI(pathInferred))
  }

  // redirect from filename path
  if (filePathRelative !== null) {
    const filenamePath = ensureLeadingSlash(filePathRelative)
    redirectsSet.add(filenamePath)
    redirectsSet.add(encodeURI(filenamePath))
  }

  // avoid redirect from the page path itself
  redirectsSet.delete(path)

  return [key, path, routeMeta, [...redirectsSet]]
}

/**
 * Generate routes temp file
 */
export const preparePagesRoutes = async (app: App): Promise<void> => {
  const routeItems = app.pages.map(resolvePageRouteItem)
  const content = `\
export const pagesRoutes = [\
${routeItems.map((routeItem) => `\n  ${JSON.stringify(routeItem)},`).join('')}
]
`

  await app.writeTemp('internal/pagesRoutes.js', content)
}
