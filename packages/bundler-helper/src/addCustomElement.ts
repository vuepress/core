import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import type { App } from '@vuepress/core'
import { isString } from '@vuepress/shared'

import { getBundlerName } from './getBundlerName.js'

/**
 * Add tags as customElement
 *
 * @example
 *   // Add single custom element
 *   addCustomElement(bundlerOptions, app, 'my-element')
 *
 *   // Add multiple custom elements
 *   addCustomElement(bundlerOptions, app, ['element1', 'element2'])
 *
 *   // Add elements matching a pattern
 *   addCustomElement(bundlerOptions, app, /^my-/)
 *
 * @param bundlerOptions - VuePress Bundler config
 * @param app - VuePress Node App
 * @param customElement - Tags recognized as custom element
 */
export const addCustomElement = (
  bundlerOptions: unknown,
  app: App,
  customElement: RegExp | string[] | string,
): void => {
  const customElements = isString(customElement)
    ? [customElement]
    : customElement
  const bundlerName = getBundlerName(app)

  switch (bundlerName) {
    // for vite
    case 'vite': {
      const viteBundlerConfig = bundlerOptions as ViteBundlerOptions

      viteBundlerConfig.vuePluginOptions ??= {}
      viteBundlerConfig.vuePluginOptions.template ??= {}
      viteBundlerConfig.vuePluginOptions.template.compilerOptions ??= {}
      const { isCustomElement } =
        viteBundlerConfig.vuePluginOptions.template.compilerOptions

      /**
       * @param tag - The tag name to check
       * @returns Whether the tag is a custom element
       * @see https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue/README.md
       */
      viteBundlerConfig.vuePluginOptions.template.compilerOptions.isCustomElement =
        (tag: string): boolean | void => {
          if (
            customElements instanceof RegExp
              ? customElements.test(tag)
              : customElements.includes(tag)
          )
            return true

          return isCustomElement?.(tag)
        }
      break
    }
    // for webpack
    case 'webpack': {
      const webpackBundlerConfig = bundlerOptions as WebpackBundlerOptions

      webpackBundlerConfig.vue ??= {}
      webpackBundlerConfig.vue.compilerOptions ??= {}
      const { isCustomElement } = webpackBundlerConfig.vue.compilerOptions

      /**
       * @param tag - The tag name to check
       * @returns Whether the tag is a custom element
       * @see https://vue-loader.vuejs.org/options.html#compileroptions
       */
      webpackBundlerConfig.vue.compilerOptions.isCustomElement = (
        tag: string,
      ): boolean | void => {
        if (
          customElements instanceof RegExp
            ? customElements.test(tag)
            : customElements.includes(tag)
        )
          return true

        return isCustomElement?.(tag)
      }
      break
    }
    default: {
      // eslint-disable-next-line no-console
      console.error(`[addCustomElement]: ${bundlerName} is not supported yet.`)
    }
  }
}
