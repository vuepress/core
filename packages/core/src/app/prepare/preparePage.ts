import type { App, Page } from '../../types/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
`

/**
 * Generate page temp file of a single page
 */
export const preparePage = async (app: App, page: Page): Promise<void> => {
  // page data file content
  let content = `\
import comp from ${JSON.stringify(page.componentFilePath)}
const data = JSON.parse(${JSON.stringify(JSON.stringify(page.data))})
export { comp, data }
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp(page.chunkFilePathRelative, content)
}
