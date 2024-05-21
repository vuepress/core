import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const testPlugin = {
  name: 'test-plugin',
  clientConfigFile: path.resolve(__dirname, './clientConfig.js'),
}
