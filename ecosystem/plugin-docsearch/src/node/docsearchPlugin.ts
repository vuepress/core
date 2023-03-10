import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { DocsearchOptions, TransformFunc } from '../shared/index.js'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-docsearch
 */
export interface DocsearchPluginOptions extends DocsearchOptions {
  /**
   * Base path of the search index
   */
  indexBase?: string

  /**
   * Whether to inject docsearch default styles
   */
  injectStyles?: boolean
}

export const docsearchPlugin = ({
  injectStyles = true,
  indexBase,
  ...options
}: DocsearchPluginOptions): Plugin => ({
  name: '@vuepress/plugin-docsearch',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: (app) => {
    return {
      __DOCSEARCH_INJECT_STYLES__: injectStyles,
      __DOCSEARCH_INDEX_BASE__: indexBase || app.options.base,
      __DOCSEARCH_OPTIONS__: options,
    }
  },

  onPrepared: async (app) => {
    let transformFunc: TransformFunc = (items) => items
    if (options?.transformItems) {
      transformFunc = options.transformItems
    }
    await app.writeTemp(
      'internal/transform.js',
      'export const transformFunc = ' + transformFunc
    )
  },
})
