import type { CreateVueAppFunction } from '@vuepress/client'
import type { App, Bundler } from '@vuepress/core'
import { chalk, fs, importFileDefault, ora, withSpinner } from '@vuepress/utils'
import webpack from 'webpack'
import { resolveWebpackConfig } from '../resolveWebpackConfig.js'
import type { WebpackBundlerOptions } from '../types.js'
import {
  clientManifestFilename,
  createClientConfig,
} from './createClientConfig.js'
import { createServerConfig } from './createServerConfig.js'
import { renderPage } from './renderPage.js'
import { resolveClientManifestMeta } from './resolveClientManifestMeta.js'
import type { ClientManifest } from './ssr/index.js'

export const build = async (
  options: WebpackBundlerOptions,
  app: App
): ReturnType<Bundler['build']> => {
  // plugin hook: extendsBundlerOptions
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app)

  // webpack compile
  await withSpinner('Compiling with webpack')(async () => {
    // create webpack config
    const clientConfig = resolveWebpackConfig({
      config: await createClientConfig(app, options),
      options,
      isServer: false,
      isBuild: true,
    })
    const serverConfig = resolveWebpackConfig({
      config: await createServerConfig(app, options),
      options,
      isServer: true,
      isBuild: true,
    })

    await new Promise<void>((resolve, reject) => {
      webpack([clientConfig, serverConfig], (err, stats) => {
        if (err) {
          reject(err)
        } else if (stats?.hasErrors()) {
          stats.toJson().errors?.forEach((err) => {
            console.error(err)
          })
          reject(new Error('Failed to compile with errors'))
        } else {
          if (stats?.hasWarnings()) {
            stats.toJson().warnings?.forEach((warning) => {
              console.warn(warning)
            })
          }
          resolve()
        }
      })
    })
  })

  // render pages
  await withSpinner('Rendering pages')(async () => {
    // load ssr template file
    const ssrTemplate = (
      await fs.readFile(app.options.templateBuild)
    ).toString()

    // load the client manifest file
    const clientManifestPath = app.dir.temp(clientManifestFilename)
    const clientManifest: ClientManifest = await fs.readJSON(clientManifestPath)

    // resolve client files meta
    const {
      allFilesMeta,
      initialFilesMeta,
      asyncFilesMeta,
      moduleFilesMetaMap,
    } = resolveClientManifestMeta(clientManifest)

    // load the compiled server bundle
    const serverEntryPath = app.dir.temp('.server/app.cjs')
    const { createVueApp } = await importFileDefault<{
      createVueApp: CreateVueAppFunction
    }>(serverEntryPath)

    // pre-render pages to html files
    const spinner = ora()
    for (const page of app.pages) {
      spinner.start(`Rendering pages ${chalk.magenta(page.path)}`)
      await renderPage({
        app,
        page,
        createVueApp,
        ssrTemplate,
        allFilesMeta,
        initialFilesMeta,
        asyncFilesMeta,
        moduleFilesMetaMap,
      })
    }
    spinner.stop()
  })

  // keep the server bundle files in debug mode
  if (!app.env.isDebug) {
    // remove server temp directory after pages rendered
    await fs.remove(app.dir.temp('.server'))
  }
}
