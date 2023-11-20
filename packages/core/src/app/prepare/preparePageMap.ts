import type { App } from '../../types/index.js'

/**
 * Generate page map temp file
 */
export const preparePagesMap = async (app: App): Promise<void> => {
  // generate page component map file
  const content = `\
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

  await app.writeTemp('internal/pagesMap.js', content)
}
