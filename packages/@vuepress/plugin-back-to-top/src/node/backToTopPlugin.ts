import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const backToTopPlugin = (): Plugin => ({
  name: '@vuepress/plugin-back-to-top',

  clientAppRootComponentFiles: path.resolve(
    __dirname,
    '../client/components/BackToTop.js'
  ),
})
