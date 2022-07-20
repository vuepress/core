import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { TocPropsOptions } from '../shared/index.js'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-toc
 */
export interface TocPluginOptions {
  /**
   * Specify the name of the TOC component
   *
   * @default 'Toc'
   */
  componentName?: string

  /**
   * Override the default values of the `options` prop of the TOC component
   */
  defaultPropsOptions?: Partial<TocPropsOptions>
}

export const tocPlugin = ({
  componentName = 'Toc',
  defaultPropsOptions = {},
}: TocPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-toc',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __TOC_COMPONENT_NAME__: componentName,
    __TOC_DEFAULT_PROPS_OPTIONS__: defaultPropsOptions,
  },
})
