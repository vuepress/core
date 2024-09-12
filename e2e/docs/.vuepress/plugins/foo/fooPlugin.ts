import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const fooPlugin: Plugin = {
  name: 'test-plugin',
  clientConfigFile: path.resolve(
    __dirname,
    './nonDefaultExportClientConfig.js',
  ),
}
