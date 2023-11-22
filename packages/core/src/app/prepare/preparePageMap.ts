import type { App } from '../../types/index.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePagesMap) {
    __VUE_HMR_RUNTIME__.updatePagesMap(pagesMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ pagesMap }) => {
    __VUE_HMR_RUNTIME__.updatePagesMap(pagesMap)
  })
}
`

/**
 * Generate page map temp file
 */
export const preparePagesMap = async (app: App): Promise<void> => {
  // generate page component map file
  let content = `\
import { defineAsyncComponent } from 'vue'

export const pagesMap = new Map([
  ${app.pages
    .map(
      ({
        meta,
        path,
        dataFilePath,
        dataFileChunkName,
        componentFilePath,
        componentFileChunkName,
      }) => `
  [${JSON.stringify(path)}, {\
 comp: defineAsyncComponent(() => import(${
   componentFileChunkName
     ? `/* webpackChunkName: "${componentFileChunkName}" */`
     : ''
 }${JSON.stringify(componentFilePath)})),\
 data: () => import(${
   dataFileChunkName ? `/* webpackChunkName: "${dataFileChunkName}" */` : ''
 }${JSON.stringify(dataFilePath)}).then(({ data }) => data),\
 meta: ${JSON.stringify(meta)}
    }],`,
    )
    .join('\n  ')}
])
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/pagesMap.js', content)
}
