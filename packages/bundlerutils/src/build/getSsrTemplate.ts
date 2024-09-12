import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'

/**
 * Util to read the ssr template file
 */
export const getSsrTemplate = async (app: App): Promise<string> =>
  fs.readFile(app.options.templateBuild, { encoding: 'utf8' })
