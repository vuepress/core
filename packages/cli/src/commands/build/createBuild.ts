import process from 'node:process'
import { createBuildApp } from '@vuepress/core'
import type { AppConfig } from '@vuepress/core'
import { debug, formatMs, fs, logger, withSpinner } from '@vuepress/utils'
import {
  loadUserConfig,
  resolveAppConfig,
  resolveCliAppConfig,
  resolveUserConfigConventionalPath,
  resolveUserConfigPath,
  transformUserConfigToPlugin,
} from '../../config/index.js'
import type { BuildCommand } from './types.js'

const log = debug('vuepress:cli/build')

export const createBuild =
  (defaultAppConfig: Partial<AppConfig>): BuildCommand =>
  async (sourceDir = '.', commandOptions = {}): Promise<void> => {
    const start = Date.now()

    log(`commandOptions:`, commandOptions)

    if (process.env.NODE_ENV === undefined) {
      process.env.NODE_ENV = 'production'
    }

    // resolve app config from cli options
    const cliAppConfig = resolveCliAppConfig(sourceDir, commandOptions)

    // resolve user config file
    const userConfigPath = commandOptions.config
      ? resolveUserConfigPath(commandOptions.config)
      : resolveUserConfigConventionalPath(cliAppConfig.source)
    log(`userConfigPath:`, userConfigPath)
    const { userConfig } = await loadUserConfig(userConfigPath)

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
    const app = createBuildApp(appConfig)

    // use user-config plugin
    app.use(transformUserConfigToPlugin(userConfig, cliAppConfig.source))

    // clean temp and cache
    if (commandOptions.cleanTemp === true) {
      await withSpinner('Cleaning temp')(() => {
        return fs.remove(app.dir.temp())
      })
    }
    if (commandOptions.cleanCache === true) {
      await withSpinner('Cleaning cache')(() => {
        return fs.remove(app.dir.cache())
      })
    }

    // empty dest directory
    await fs.emptyDir(app.dir.dest())

    // initialize and prepare
    await withSpinner('Initializing and preparing data')(async () => {
      await app.init()
      await app.prepare()
    })

    // build
    await app.build()

    // plugin hook: onGenerated
    await app.pluginApi.hooks.onGenerated.process(app)

    logger.success(
      `VuePress build completed in ${formatMs(Date.now() - start)}!`
    )
  }
