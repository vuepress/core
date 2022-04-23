import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const nprogressPlugin = (): Plugin => ({
  name: '@vuepress/plugin-nprogress',
  clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),
})
