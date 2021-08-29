import { createMarkdown } from '@vuepress/markdown'
import { createPluginApi } from '../pluginApi'
import type { App, AppConfig } from '../types'
import { appInit } from './appInit'
import { appPrepare } from './appPrepare'
import { appUse } from './appUse'
import { createAppDir } from './createAppDir'
import { createAppEnv } from './createAppEnv'
import { createAppOptions } from './createAppOptions'
import { createAppSiteData } from './createAppSiteData'
import { createAppVersion } from './createAppVersion'
import { createAppWriteTemp } from './createAppWriteTemp'
import { resolvePluginsFromConfig } from './resolvePluginsFromConfig'
import { resolveThemeInfo } from './resolveThemeInfo'

/**
 * Create vuepress app
 */
export const createBaseApp = (config: AppConfig, isBuild = false): App => {
  const version = createAppVersion()
  const options = createAppOptions(config)
  const dir = createAppDir(options)
  const env = createAppEnv(options, isBuild)
  const siteData = createAppSiteData(options)
  const markdown = createMarkdown(options.markdown)
  const pluginApi = createPluginApi()
  const writeTemp = createAppWriteTemp(dir)

  const app = {
    version,
    options,
    dir,
    env,
    siteData,
    markdown,
    pluginApi,
    writeTemp,
    use: (...args) => appUse(app, ...args),
    init: () => appInit(app),
    prepare: () => appPrepare(app),
  } as App

  // resolve theme info and use theme plugins
  const themeInfo = resolveThemeInfo(app, options.theme)
  themeInfo.plugins.forEach((plugin) => app.use(plugin))
  app.layouts = themeInfo.layouts

  // resolve plugins
  const plugins = resolvePluginsFromConfig(app, options.plugins)
  plugins.forEach((plugin) => app.use(plugin))

  return app
}
