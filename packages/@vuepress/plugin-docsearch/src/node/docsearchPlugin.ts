import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { DocsearchOptions } from '../shared'

export type DocsearchPluginOptions = DocsearchOptions

export const docsearchPlugin = (options: DocsearchPluginOptions): Plugin => ({
  name: '@vuepress/plugin-docsearch',

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    '../client/clientAppEnhance.js'
  ),

  define: {
    __DOCSEARCH_OPTIONS__: options,
  },
})
