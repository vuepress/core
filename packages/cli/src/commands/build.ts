import process from 'node:process'
import { createBuildApp } from '@vuepress/core'
import { debug, formatMs, fs, logger, withSpinner } from '@vuepress/utils'
import { resolveConfig } from '../config/index.js'
import type { BuildCommand } from '../types/index.js'

const log = debug('vuepress:cli/build')

export const build: BuildCommand = async ({
  defaultAppConfig,
  sourceDir = '.',
  cliOptions = {},
}) => {
  const start = Date.now()

  log(`cliOptions:`, cliOptions)

  process.env.NODE_ENV ??= 'production'

  const { appConfig, userConfigPlugin } = await resolveConfig({
    defaultAppConfig,
    sourceDir,
    cliOptions,
  })

  if (appConfig === null) {
    throw logger.createError('Failed to resolve config')
  }

  // create vuepress app
  const app = createBuildApp(appConfig)

  // use user-config plugin
  app.use(userConfigPlugin)

  // clean temp and cache
  if (cliOptions.cleanTemp === true) {
    await withSpinner('Cleaning temp')(async () => {
      await fs.remove(app.dir.temp())
    })
  }
  if (cliOptions.cleanCache === true) {
    await withSpinner('Cleaning cache')(async () => {
      await fs.remove(app.dir.cache())
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

  logger.success(`VuePress build completed in ${formatMs(Date.now() - start)}!`)
}
