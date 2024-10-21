import { createPluginApi } from '../pluginApi/index.js'
import type {
  App,
  AppConfig,
  AppPropertiesBase,
  Plugin,
} from '../types/index.js'
import { appInit } from './appInit.js'
import { appPrepare } from './appPrepare.js'
import { appUse } from './appUse.js'
import { resolveAppDir } from './resolveAppDir.js'
import { resolveAppEnv } from './resolveAppEnv.js'
import { resolveAppOptions } from './resolveAppOptions.js'
import { resolveAppSiteData } from './resolveAppSiteData.js'
import { resolveAppVersion } from './resolveAppVersion.js'
import { resolveAppWriteTemp } from './resolveAppWriteTemp.js'

/**
 * Create base vuepress app.
 *
 * Notice that the base app could not be used for dev nor build.
 *
 * It would be used for creating dev app or build app internally.
 *
 * @internal
 */
export const createBaseApp = (config: AppConfig): App => {
  const options = resolveAppOptions(config)
  const dir = resolveAppDir(options)
  const env = resolveAppEnv(options)
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
    init: async () => appInit(app),
    prepare: async () => appPrepare(app),
  } satisfies AppPropertiesBase as App

  return app
}
