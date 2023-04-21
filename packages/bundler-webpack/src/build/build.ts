import type { CreateVueAppFunction } from '@vuepress/client'
import type { App, Bundler } from '@vuepress/core'
import {
  colors,
  debug,
  fs,
  importFileDefault,
  withSpinner,
} from '@vuepress/utils'
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

const log = debug('vuepress:bundler-webpack/build')

export const build = async (
  options: WebpackBundlerOptions,
  app: App
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
  log('compiling finish')

  // render pages
  await withSpinner(`Rendering ${app.pages.length} pages`)(async (spinner) => {
    // load ssr template file
    const ssrTemplate = (
      await fs.readFile(app.options.templateBuild)
    ).toString()

    // load the client manifest file
    const clientManifestPath = app.dir.temp(clientManifestFilename)
    const clientManifest: ClientManifest = await fs.readJson(clientManifestPath)

    // resolve client files meta
    const { initialFilesMeta, asyncFilesMeta, moduleFilesMetaMap } =
      resolveClientManifestMeta(clientManifest)

    // load the compiled server bundle
    const serverEntryPath = app.dir.temp('.server/app.cjs')
    const { createVueApp } = await importFileDefault<{
      createVueApp: CreateVueAppFunction
    }>(serverEntryPath)
    // create vue ssr app
    const { app: vueApp, router: vueRouter } = await createVueApp()
    const { renderToString } = await import('vue/server-renderer')

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
        renderToString,
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
