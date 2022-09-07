import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { ZoomOptions } from 'medium-zoom'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-medium-zoom
 */
export interface MediumZoomPluginOptions {
  /**
   * Selector of zoomable images
   *
   * @default ':not(a) > img'
   */
  selector?: string

  /**
   * Delay in milliseconds
   *
   * @default 500
   */
  delay?: number

  /**
   * Options for medium-zoom
   *
   * @see https://github.com/francoischalifour/medium-zoom#options
   */
  zoomOptions?: ZoomOptions
}

export const mediumZoomPlugin = ({
  selector = ':not(a) > img',
  zoomOptions = {},
  delay = 500,
}: MediumZoomPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-medium-zoom',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __MZ_SELECTOR__: selector,
    __MZ_ZOOM_OPTIONS__: zoomOptions,
    __MZ_DELAY__: delay,
  },
})
