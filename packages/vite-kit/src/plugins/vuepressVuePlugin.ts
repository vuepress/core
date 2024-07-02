import vuePlugin from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import type { AssetURLOptions, AssetURLTagConfig } from 'vue/compiler-sfc'
import type { VuePluginOptions } from '../types.js'

/**
 * Wrapper of official vue plugin
 */
export const vuepressVuePlugin = (options: VuePluginOptions): Plugin => {
  return vuePlugin({
    ...options,
    template: {
      ...options?.template,
      transformAssetUrls: resolveTransformAssetUrls(options),
    },
  })
}

/**
 * Determine if the given `transformAssetUrls` option is `AssetURLTagConfig`
 */
const isAssetURLTagConfig = (
  transformAssetUrls: AssetURLOptions | AssetURLTagConfig,
): transformAssetUrls is AssetURLTagConfig =>
  Object.values(transformAssetUrls).some((val) => Array.isArray(val))

/**
 * Resolve `template.transformAssetUrls` option from user config
 */
const resolveTransformAssetUrls = (
  options: VuePluginOptions,
): AssetURLOptions => {
  // default transformAssetUrls option
  const defaultTransformAssetUrls = { includeAbsolute: true }

  // user provided transformAssetUrls option
  const { transformAssetUrls: userTransformAssetUrls } = options?.template ?? {}

  // if user does not provide an object as transformAssetUrls
  if (typeof userTransformAssetUrls !== 'object') {
    return defaultTransformAssetUrls
  }

  // AssetURLTagConfig
  if (isAssetURLTagConfig(userTransformAssetUrls)) {
    return {
      ...defaultTransformAssetUrls,
      tags: userTransformAssetUrls,
    }
  }

  // AssetURLOptions
  return {
    ...defaultTransformAssetUrls,
    ...userTransformAssetUrls,
  }
}
