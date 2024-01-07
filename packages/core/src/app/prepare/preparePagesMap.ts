import { ensureLeadingSlash } from '@vuepress/shared'
import type { App, Page } from '../../types/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePagesMap) {
    __VUE_HMR_RUNTIME__.updatePagesMap(pagesMap)
  }
  if (__VUE_HMR_RUNTIME__.updatePageRedirectsMap) {
    __VUE_HMR_RUNTIME__.updatePageRedirectsMap(redirectsMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ pagesMap, redirectsMap }) => {
    __VUE_HMR_RUNTIME__.updatePagesMap(pagesMap)
    __VUE_HMR_RUNTIME__.updatePageRedirectsMap(redirectsMap)
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
  const pagesMapEntries = app.pages
    .map((page) => {
      const {
        meta,
        path,
        dataFilePath,
        dataFileChunkName,
        componentFilePath,
        componentFileChunkName,
      } = page
      const redirects = resolvePageRedirects(page)

      return `\
  [${JSON.stringify(path)}, defineAsyncComponent(() => import(${
    componentFileChunkName
      ? `/* webpackChunkName: "${componentFileChunkName}" */`
      : ''
  }${JSON.stringify(componentFilePath)})), () => import(${
    dataFileChunkName ? `/* webpackChunkName: "${dataFileChunkName}" */` : ''
  }${JSON.stringify(dataFilePath)}).then(({ data }) => data), ${JSON.stringify(
    meta,
  )}${
    redirects.length
      ? `, [${redirects.map((path) => JSON.stringify(path)).join(', ')}]`
      : ''
  }],`
    })
    .join('\n')

  // generate page component map file
  let content = `\
import { defineAsyncComponent } from 'vue'

const pagesMapEntries = [
${pagesMapEntries}
];

export const redirectsMap = new Map(
  pagesMapEntries
    .flatMap(([path, , , , redirects = []]) => redirects.map((redirect) => [redirect, path])),
);

export const pagesMap = new Map(
  pagesMapEntries.map(([path, comp, data, meta]) => [path, { comp, data, meta }]),
);
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/pagesMap.js', content)
}
