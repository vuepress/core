import type { App } from '@vuepress/core'
import webpack from 'webpack'
import type Config from 'webpack-chain'

/**
 * Set webpack DefinePlugin
 */
export const handlePluginDefine = async ({
  app,
  config,
  isBuild,
  isServer,
}: {
  app: App
  config: Config
  isBuild: boolean
  isServer: boolean
}): Promise<void> => {
  // define plugin
  config.plugin('define').use(webpack.DefinePlugin, [
    {
      __VUEPRESS_VERSION__: JSON.stringify(app.version),
      __VUEPRESS_BASE__: JSON.stringify(app.options.base),
      __VUEPRESS_DEV__: JSON.stringify(!isBuild),
      __VUEPRESS_SSR__: JSON.stringify(isServer),
      // @see http://link.vuejs.org/feature-flags
      // enable options API by default
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(app.env.isDebug),
    },
  ])

  // plugin hook: define
  const defineResult = await app.pluginApi.hooks.define.process(app, isServer)

  // tap the arguments of DefinePlugin
  config.plugin('define').tap(([options]) => {
    defineResult.forEach((defineObject) =>
      Object.entries(defineObject).forEach(([key, value]) => {
        options[key] = JSON.stringify(value)
      })
    )

    return [options]
  })
}
