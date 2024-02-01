import { ensureLeadingSlash } from '@vuepress/shared'
import type { App, Page } from '../../types/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePagesMap) {
    __VUE_HMR_RUNTIME__.updatePagesMap(pagesMap)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirectsMap) {
    __VUE_HMR_RUNTIME__.updateRedirectsMap(redirectsMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ pagesMap, redirectsMap }) => {
    __VUE_HMR_RUNTIME__.updatePagesMap(pagesMap)
    __VUE_HMR_RUNTIME__.updateRedirectsMap(redirectsMap)
  })
}
`

/**
 * Resolve page route item
 */
const resolvePageRedirects = ({
  path,
  pathInferred,
  filePathRelative,
}: Page): string[] => {
  // paths that should redirect to this page, use set to dedupe
  const redirectsSet = new Set<string>()

  // redirect from decoded path
  redirectsSet.add(decodeURI(path))

  // redirect from inferred path
  if (pathInferred !== null) {
    redirectsSet.add(pathInferred)
  }

  // redirect from none-markdown filename path
  // markdown file path is omitted as it can be normalized to pathInferred
  if (filePathRelative !== null && !filePathRelative.endsWith('.md')) {
    redirectsSet.add(ensureLeadingSlash(filePathRelative))
  }

  // avoid redirect from the page path itself
  redirectsSet.delete(path)

  return Array.from(redirectsSet)
}

/**
 * Generate page map temp file
 */
export const preparePagesMap = async (app: App): Promise<void> => {
  // generate page component map file
  let content = `\
export const redirectsMap = JSON.parse(${JSON.stringify(
    JSON.stringify(
      Object.fromEntries(
        app.pages.flatMap((page) =>
          resolvePageRedirects(page).map((redirect) => [redirect, page.path]),
        ),
      ),
    ),
  )})

export const pagesMap = Object.fromEntries([
${app.pages
  .map(
    ({ meta, path, chunkFilePath, chunkName }) =>
      `  [${JSON.stringify(path)}, { loader: () => import(${chunkName ? `/* webpackChunkName: "${chunkName}" */` : ''}${JSON.stringify(chunkFilePath)}), meta: ${JSON.stringify(meta)} }],`,
  )
  .join('\n')}
]);
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/pagesMap.js', content)
}
