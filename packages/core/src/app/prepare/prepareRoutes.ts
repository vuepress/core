import { normalizeRoutePath } from '@vuepress/shared'
import type { App, Page } from '../../types/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
`

/**
 * Resolve page redirects
 */
const resolvePageRedirects = ({ path, pathInferred }: Page): string[] => {
  // paths that should redirect to this page, use set to dedupe
  const redirectsSet = new Set<string>()

  // add redirect to the set when the redirect could not be normalized & encoded to the page path
  const addRedirect = (redirect: string): void => {
    const normalizedPath = normalizeRoutePath(redirect)
    if (normalizedPath === path) return

    const encodedPath = encodeURI(normalizedPath)
    if (encodedPath === path) return

    redirectsSet.add(redirect)
  }

  // redirect from inferred path, notice that the inferred path is not uri-encoded
  if (pathInferred !== null) {
    addRedirect(encodeURI(pathInferred))
  }

  return Array.from(redirectsSet)
}

/**
 * Generate routes temp file
 */
export const prepareRoutes = async (app: App): Promise<void> => {
  // routes file content
  let content = `\
export const redirects = ${JSON.stringify(
    Object.fromEntries(
      app.pages.flatMap((page) =>
        resolvePageRedirects(page).map((redirect) => [redirect, page.path]),
      ),
    ),
  )}

export const routes = {
${app.pages
  .map(
    ({ chunkFilePath, chunkName, path, routeMeta }) =>
      `  ${JSON.stringify(path)}: {
        loader: () => import(${chunkName ? `/* webpackChunkName: "${chunkName}" */` : ''}${JSON.stringify(chunkFilePath)}),
        meta: ${JSON.stringify(routeMeta)}
    },`,
  )
  .join('\n')}
};
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/routes.js', content)
}
