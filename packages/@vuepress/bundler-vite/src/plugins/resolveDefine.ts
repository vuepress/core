import type { App } from '@vuepress/core'
import type { UserConfig } from 'vite'

export const resolveDefine = async ({
  app,
  isBuild,
  isServer,
}: {
  app: App
  isBuild: boolean
  isServer: boolean
}): Promise<UserConfig['define']> => {
  const define: UserConfig['define'] = {
    __VUEPRESS_VERSION__: JSON.stringify(app.version),
    __VUEPRESS_DEV__: JSON.stringify(!isBuild),
    __VUEPRESS_SSR__: JSON.stringify(isServer),
    // @see http://link.vuejs.org/feature-flags
    // enable options API by default
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(app.env.isDebug),
  }

  // override vite built-in define config in debug mode
  if (app.env.isDebug) {
    define['process.env.NODE_ENV'] = JSON.stringify('development')
  }

  // plugin hook: define
  const defineResult = await app.pluginApi.hooks.define.process(app)

  defineResult.forEach((defineObject) =>
    Object.entries(defineObject).forEach(([key, value]) => {
      define[key] = JSON.stringify(value)
    })
  )

  return define
}
