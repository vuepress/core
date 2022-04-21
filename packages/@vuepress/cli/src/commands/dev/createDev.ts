import { createDevApp } from '@vuepress/core'
import type { AppConfig } from '@vuepress/core'
import { debug, fs, logger } from '@vuepress/utils'
import type { FSWatcher } from 'chokidar'
import {
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  transformUserConfigToPlugin,
} from '../../config'
import { resolveAppConfig, resolveCliAppConfig } from '../../utils'
import { resolveDevUserConfig } from './resolveDevUserConfig'
import type { DevCommand } from './types'
import { watchPageFiles } from './watchPageFiles'
import { watchUserConfigFile } from './watchUserConfigFile'

const log = debug('vuepress:cli/dev')

export const createDev = (defaultAppConfig: Partial<AppConfig>): DevCommand => {
  const dev: DevCommand = async (
    sourceDir = '.',
    commandOptions = {}
  ): Promise<void> => {
    log(`commandOptions:`, commandOptions)

    if (process.env.NODE_ENV === undefined) {
      process.env.NODE_ENV = 'development'
    }

    // resolve app config from cli options
    const cliAppConfig = resolveCliAppConfig(sourceDir, commandOptions)

    // resolve user config file
    const userConfigPath = commandOptions.config
      ? resolveUserConfigPath(commandOptions.config)
      : resolveUserConfigConventionalPath(cliAppConfig.source)
    log(`userConfigPath:`, userConfigPath)
    const { userConfig, userConfigDeps } = await resolveDevUserConfig(
      userConfigPath
    )

    // resolve the final app config to use
    const appConfig = resolveAppConfig({
      defaultAppConfig,
      cliAppConfig,
      userConfig,
    })
    if (appConfig === null) {
      return
    }

    // create vuepress app
    const app = createDevApp(appConfig)

    // use user-config plugin
    app.use(transformUserConfigToPlugin(app, userConfig))

    // clean temp and cache
    if (commandOptions.cleanTemp === true) {
      logger.info('Cleaning temp...')
      await fs.remove(app.dir.temp())
    }
    if (commandOptions.cleanCache === true) {
      logger.info('Cleaning cache...')
      await fs.remove(app.dir.cache())
    }

    // initialize and prepare
    logger.info('Initializing VuePress and preparing data...')
    await app.init()
    await app.prepare()

    // start dev server
    const close = await app.dev()

    // do not watch files if `watch` is set to `false`
    if (commandOptions.watch === false) {
      return
    }

    // all watchers
    const watchers: FSWatcher[] = []

    // restart dev command
    const restart = async (): Promise<void> => {
      await Promise.all([
        // close all watchers
        ...watchers.map((item) => item.close()),
        // close current dev server
        close(),
      ])
      // restart dev command
      await dev(sourceDir, {
        ...commandOptions,
        // do not clean cache and temp on restart
        cleanCache: false,
        cleanTemp: false,
      })
      logger.tip(`dev server has restarted, please refresh your browser`)
    }

    // watch page files
    watchers.push(...watchPageFiles(app))

    // watch user config file
    if (userConfigPath) {
      watchers.push(
        ...watchUserConfigFile({
          userConfigPath,
          userConfigDeps,
          restart,
        })
      )
    }

    await app.pluginApi.hooks.onWatched.process(app, watchers, restart)
  }

  return dev
}
