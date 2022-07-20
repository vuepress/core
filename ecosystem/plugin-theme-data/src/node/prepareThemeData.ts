import type { App } from '@vuepress/core'
import type { ThemeData } from '../shared/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
`

export const prepareThemeData = async (
  app: App,
  themeData: ThemeData
): Promise<void> => {
  // theme data file content
  let content = `\
export const themeData = JSON.parse(${JSON.stringify(
    JSON.stringify(themeData)
  )})
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/themeData.js', content)
}
