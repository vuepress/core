import { path } from '@vuepress/utils'
import type { App } from '../types/index.js'

/**
 * Resolve page component and related info
 */
export const resolvePageComponentInfo = async ({
  app,
  htmlFilePathRelative,
}: {
  app: App
  htmlFilePathRelative: string
}): Promise<{
  componentFilePath: string
  componentFilePathRelative: string
}> => {
  // resolve component file path
  const componentFilePathRelative = path.join(
    'pages',
    `${htmlFilePathRelative}.vue`,
  )
  const componentFilePath = app.dir.temp(componentFilePathRelative)

  return {
    componentFilePath,
    componentFilePathRelative,
  }
}
