import { createPluginApi } from '../pluginApi'
import type { App, AppConfig } from '../types'
import { appInit } from './appInit'
import { appPrepare } from './appPrepare'
import { appUse } from './appUse'
import { resolveAppDir } from './resolveAppDir'
import { resolveAppEnv } from './resolveAppEnv'
import { resolveAppOptions } from './resolveAppOptions'
import { resolveAppSiteData } from './resolveAppSiteData'
import { resolveAppVersion } from './resolveAppVersion'
import { resolveAppWriteTemp } from './resolveAppWriteTemp'
import { resolvePluginsFromConfig } from './resolvePluginsFromConfig'
import { resolveThemeInfo } from './resolveThemeInfo'

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
    use: (...args) => appUse(app, ...args),
    init: () => appInit(app),
    prepare: () => appPrepare(app),
  } as App

  // resolve theme info and set app layouts
  const themeInfo = resolveThemeInfo(app, options.theme, options.themeConfig)
  app.layouts = themeInfo.layouts

  // resolve plugins
  const plugins = resolvePluginsFromConfig(app, options.plugins)
  // use theme plugins before user plugins, so user plugins could override theme plugins
  ;[...themeInfo.plugins, ...plugins].forEach((plugin) => app.use(plugin))

  return app
}
