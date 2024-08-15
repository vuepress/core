import { getDirname, path } from 'vuepress/utils'

const DIRNAME = getDirname(import.meta.url)

export const fooPlugin = {
  name: 'test-plugin',
  clientConfigFile: path.resolve(DIRNAME, './nonDefaultExportClientConfig.js'),
}
