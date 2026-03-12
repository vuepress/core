import process from 'node:process'
import { createDevApp } from '@vuepress/core'
import { debug, fs, logger, withSpinner } from '@vuepress/utils'
import type { FSWatcher } from 'chokidar'
import { resolveConfig } from '../../config/index.js'
import type { DevCommand } from '../../types/index.js'
import { watchPageFiles } from './watchPageFiles.js'
import { watchUserConfigFile } from './watchUserConfigFile.js'

const log = debug('vuepress:cli/dev')

export const dev: DevCommand = async ({
  defaultAppConfig,
  sourceDir = '.',
  cliOptions = {},
}) => {
  log(`cliOptions:`, cliOptions)

  process.env.NODE_ENV ??= 'development'

  const {
    appConfig,
    userConfigDependencies,
    userConfigPath,
    userConfigPlugin,
  } = await resolveConfig({
    defaultAppConfig,
    sourceDir,
    cliOptions,
  })

  if (appConfig === null) {
    throw logger.createError('Failed to resolve config')
  }

  // create vuepress app
  const app = createDevApp(appConfig)

  // use user-config plugin
  app.use(userConfigPlugin)

  // clean temp and cache
  if (cliOptions.cleanTemp === true) {
    await withSpinner('Cleaning temp')(async () => fs.remove(app.dir.temp()))
  }
  if (cliOptions.cleanCache === true) {
    await withSpinner('Cleaning cache')(async () => fs.remove(app.dir.cache()))
  }

  // initialize and prepare
  await withSpinner('Initializing and preparing data')(async () => {
    await app.init()
    await app.prepare()
  })

  // process onCleanup hook with 'prepared' stage
  await app.pluginApi.hooks.onCleanup.process(app, 'prepared')

  // start dev server
  const close = await app.dev()

  // do not watch files if `watch` is set to `false`
  if (cliOptions.watch === false) {
    return
  }

  // all watchers
  const watchers: FSWatcher[] = []

  // restart dev command
  const restart = async (): Promise<void> => {
    // process onCleanup hook with 'restart' stage
    await app.pluginApi.hooks.onCleanup.process(app, 'restart')

    // clean up internal app state
    app.writeTemp.cleanup()

    await Promise.all([
      // close all watchers
      ...watchers.map(async (item) => item.close()),
      // close current dev server
      close(),
    ])
    // restart dev command
    await dev({
      defaultAppConfig,
      sourceDir,
      cliOptions: {
        ...cliOptions,
        // do not clean cache and temp on restart
        cleanCache: false,
        cleanTemp: false,
      },
    })
    logger.tip(`dev server has restarted, please refresh your browser`)
  }

  // expose restart on the app instance for plugins
  app.restartDevServer = restart

  // process onCleanup hook with 'ready' stage
  await app.pluginApi.hooks.onCleanup.process(app, 'ready')

  // watch page files
  watchers.push(...watchPageFiles(app))

  // watch user config file
  if (userConfigPath) {
    watchers.push(
      ...watchUserConfigFile({
        userConfigPath,
        userConfigDependencies,
        restart,
      }),
    )
  }

  await app.pluginApi.hooks.onWatched.process(app, watchers, restart)
}
