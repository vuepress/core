import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { ZoomOptions } from 'medium-zoom'

export interface MediumZoomPluginOptions {
  selector?: string
  zoomOptions?: ZoomOptions
  delay?: number
}

export const mediumZoomPlugin = ({
  selector = ':not(a) > img',
  zoomOptions = {},
  delay = 500,
}: MediumZoomPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-medium-zoom',

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    '../client/clientAppEnhance.js'
  ),

  define: {
    __MZ_SELECTOR__: selector,
    __MZ_ZOOM_OPTIONS__: zoomOptions,
    __MZ_DELAY__: delay,
  },
})
