import type { App } from '../../types/index.js'

const SITE_DATA_VAR_NAME = 'siteData'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  __VUE_HMR_RUNTIME__.updateSiteData?.(${SITE_DATA_VAR_NAME})
}

if (import.meta.hot) {
  import.meta.hot.accept((m) => {
    __VUE_HMR_RUNTIME__.updateSiteData?.(m.${SITE_DATA_VAR_NAME})
  })
}
`

/**
 * Generate site data temp file
 */
export const prepareSiteData = async (app: App): Promise<void> => {
  let content = `\
export const ${SITE_DATA_VAR_NAME} = JSON.parse(${JSON.stringify(
    JSON.stringify(app.siteData),
  )})
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/siteData.js', content)
}
