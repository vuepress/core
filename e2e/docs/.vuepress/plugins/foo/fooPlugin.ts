import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const fooPlugin = {
  name: 'test-plugin',
  clientConfigFile: path.resolve(
    __dirname,
    './nonDefaultExportClientConfig.js',
  ),
}
