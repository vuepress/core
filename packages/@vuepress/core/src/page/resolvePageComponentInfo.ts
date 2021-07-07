import { path } from '@vuepress/utils'
import type { App } from '../types'

/**
 * Resolve page component and related info
 */
export const resolvePageComponentInfo = async ({
  app,
  hoistedTags,
  htmlFilePathRelative,
  key,
}: {
  app: App
  hoistedTags: string[]
  htmlFilePathRelative: string
  key: string
}): Promise<{
  componentFilePath: string
  componentFilePathRelative: string
  componentFileChunkName: string
}> => {
  // resolve component file path
  const componentFilePathRelative = path.join(
    'pages',
    `${htmlFilePathRelative}.vue`
  )
  const componentFilePath = app.dir.temp(componentFilePathRelative)
  const componentFileChunkName = key

  return {
    componentFilePath,
    componentFilePathRelative,
    componentFileChunkName,
  }
}
