import { createVueServerApp, getSsrTemplate } from '@vuepress/bundlerutils'
import type { App, Bundler } from '@vuepress/core'
import { colors, debug, fs, logger, withSpinner } from '@vuepress/utils'
import webpack from 'webpack'
import { resolveWebpackConfig } from '../resolveWebpackConfig.js'
import type { WebpackBundlerOptions } from '../types.js'
import {
  CLIENT_MANIFEST_FILENAME,
  createClientConfig,
} from './createClientConfig.js'
import { createServerConfig } from './createServerConfig.js'
import { renderPage } from './renderPage.js'
import { resolveClientManifestMeta } from './resolveClientManifestMeta.js'
import type { ClientManifest } from './types.js'

const log = debug('vuepress:bundler-webpack/build')

export const build = async (
  options: WebpackBundlerOptions,
  app: App,
): ReturnType<Bundler['build']> => {
  // plugin hook: extendsBundlerOptions
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app)

  // webpack compile
  log('compiling start')
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
          stats.toJson().errors?.forEach((item) => {
            logger.error(item)
          })
          reject(new Error('Failed to compile with errors'))
        } else {
          if (stats?.hasWarnings()) {
            stats.toJson().warnings?.forEach((warning) => {
              logger.warn(warning)
            })
          }
          resolve()
        }
      })
    })
  })
  log('compiling finish')

  // render pages
  await withSpinner(`Rendering ${app.pages.length} pages`)(async (spinner) => {
    // load the client manifest file
    const clientManifestPath = app.dir.temp(CLIENT_MANIFEST_FILENAME)
    const clientManifest = (await fs.readJson(
      clientManifestPath,
    )) as ClientManifest

    // resolve client files meta
    const { initialFilesMeta, asyncFilesMeta, moduleFilesMetaMap } =
      resolveClientManifestMeta(clientManifest)

    // create vue ssr app and get ssr template
    const { vueApp, vueRouter } = await createVueServerApp(
      app.dir.temp('.server/app.cjs'),
    )
    const ssrTemplate = await getSsrTemplate(app)

    // pre-render pages to html files
    for (const page of app.pages) {
      if (spinner) {
        spinner.text = `Rendering pages ${colors.magenta(page.path)}`
      }
      await renderPage({
        app,
        page,
        vueApp,
        vueRouter,
        ssrTemplate,
        initialFilesMeta,
        asyncFilesMeta,
        moduleFilesMetaMap,
      })
    }
  })

  // keep the server bundle files in debug mode
  if (!app.env.isDebug) {
    // remove server temp directory after pages rendered
    await fs.remove(app.dir.temp('.server'))
  }
}
