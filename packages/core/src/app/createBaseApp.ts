import { createPluginApi } from '../pluginApi/index.js'
import type { App, AppConfig, Plugin } from '../types/index.js'
import { appInit } from './appInit.js'
import { appPrepare } from './appPrepare.js'
import { appUse } from './appUse.js'
import { resolveAppDir } from './resolveAppDir.js'
import { resolveAppEnv } from './resolveAppEnv.js'
import { resolveAppOptions } from './resolveAppOptions.js'
import { resolveAppSiteData } from './resolveAppSiteData.js'
import { resolveAppVersion } from './resolveAppVersion.js'
import { resolveAppWriteTemp } from './resolveAppWriteTemp.js'
import { setupAppThemeAndPlugins } from './setupAppThemeAndPlugins.js'

/**
 * Create vuepress app
 */
export const createBaseApp = (config: AppConfig, isBuild = false): App => {
  const options = resolveAppOptions(config)
  const dir = resolveAppDir(options)
  const env = resolveAppEnv(options, isBuild)
  const pluginApi = createPluginApi()
  const siteData = resolveAppSiteData(options)
  const version = resolveAppVersion()
  const writeTemp = resolveAppWriteTemp(dir)

  const app = {
    options,
    siteData,
    version,

    // utils
    dir,
    env,
    pluginApi,
    writeTemp,

    // methods
    use: (plugin: Plugin) => appUse(app, plugin),
    init: () => appInit(app),
    prepare: () => appPrepare(app),
  } as App

  // setup theme and plugins
  // notice that we setup theme before plugins,
  // so user plugins could override theme plugins
  setupAppThemeAndPlugins(app, config)

  return app
}
