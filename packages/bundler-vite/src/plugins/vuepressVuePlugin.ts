import vuePlugin from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import type { AssetURLOptions, AssetURLTagConfig } from 'vue/compiler-sfc'
import type { ViteBundlerOptions } from '../types.js'

/**
 * Wrapper of official vue plugin
 */
export const vuepressVuePlugin = (options: ViteBundlerOptions): Plugin => {
  return vuePlugin({
    ...options.vuePluginOptions,
    template: {
      ...options.vuePluginOptions?.template,
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
  options: ViteBundlerOptions,
): AssetURLOptions => {
  // default transformAssetUrls option
  const defaultTransformAssetUrls = { includeAbsolute: true }

  // user provided transformAssetUrls option
  const { transformAssetUrls: userTransformAssetUrls } =
    options.vuePluginOptions?.template ?? {}

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
