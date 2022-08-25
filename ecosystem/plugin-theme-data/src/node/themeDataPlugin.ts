import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const themeDataPlugin = (): Plugin => ({
  name: '@vuepress/plugin-theme-data',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
