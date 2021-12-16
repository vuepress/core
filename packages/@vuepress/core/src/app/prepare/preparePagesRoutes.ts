import { ensureLeadingSlash } from '@vuepress/shared'
import type { App } from '../../types'

type RouteItem = [
  name: string,
  path: string,
  meta: Record<string, unknown>,
  redirects: string[]
]

/**
 * Generate routes temp file
 */
export const preparePagesRoutes = async (app: App): Promise<void> => {
  const content = `\
import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [\
${app.pages
  .map(({ key, path, pathInferred, filePathRelative, routeMeta }) => {
    const redirects: string[] = []
    const routeItem: RouteItem = [key, path, routeMeta, redirects]

    // paths that should redirect to this page
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

    // add redirects to route item
    redirects.push(...redirectsSet)

    return `\n  ${JSON.stringify(routeItem)},`
  })
  .join('')}
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
`

  await app.writeTemp('internal/pagesRoutes.js', content)
}
