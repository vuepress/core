import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const nprogressPlugin = (): Plugin => ({
  name: '@vuepress/plugin-nprogress',
  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
