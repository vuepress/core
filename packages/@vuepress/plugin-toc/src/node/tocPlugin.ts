import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { TocPropsOptions } from '../shared'

export interface TocPluginOptions {
  componentName?: string
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
