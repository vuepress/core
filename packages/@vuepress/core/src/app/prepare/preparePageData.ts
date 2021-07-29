import type { App, Page } from '../../types'

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
 * Generate page data temp file of a single page
 */
export const preparePageData = async (app: App, page: Page): Promise<void> => {
  // page data file content
  let content = `export const data = ${JSON.stringify(page.data, null, 2)}\n`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp(page.dataFilePathRelative, content)
}
