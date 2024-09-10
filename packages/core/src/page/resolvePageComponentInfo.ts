import { path } from '@vuepress/utils'
import type { App } from '../types/index.js'

/**
 * Resolve page component and related info
 */
export const resolvePageComponentInfo = ({
  app,
  filePath,
  filePathRelative,
  htmlFilePathRelative,
}: {
  app: App
  filePath: string | null
  filePathRelative: string | null
  htmlFilePathRelative: string
}): {
  componentFilePath: string
  componentFilePathRelative: string
} => {
  // if there is a source file for the page, use it as the component file
  if (filePath && filePathRelative) {
    return {
      componentFilePath: filePath,
      componentFilePathRelative: filePathRelative,
    }
  }
  // otherwise, generate a component file for the page
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
