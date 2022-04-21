import type { CreateVueAppFunction } from '@vuepress/client'
import type { App, Bundler } from '@vuepress/core'
import { chalk, fs, ora, withSpinner } from '@vuepress/utils'
import * as webpack from 'webpack'
import type { WebpackBundlerOptions } from '../types'
import { resolveWebpackConfig } from '../utils'
import {
  clientManifestFilename,
  createClientConfig,
} from './createClientConfig'
import { createServerConfig } from './createServerConfig'
import { renderPage } from './renderPage'
import { resolveClientManifestMeta } from './resolveClientManifestMeta'
import type { ClientManifest } from './ssr'

export const createBuild =
  (options: WebpackBundlerOptions): Bundler['build'] =>
  async (app: App) => {
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
      const clientManifestPath = app.dir.dest(clientManifestFilename)
      const clientManifest = require(clientManifestPath) as ClientManifest

      // resolve client files meta
      const {
        allFilesMeta,
        initialFilesMeta,
        asyncFilesMeta,
        moduleFilesMetaMap,
      } = resolveClientManifestMeta(clientManifest)

      // load the compiled server bundle
      const serverEntryPath = app.dir.dest('.server/app')
      const { createVueApp } = require(serverEntryPath) as {
        createVueApp: CreateVueAppFunction
      }

      // create vue ssr app
      const { app: vueApp, router: vueRouter } = await createVueApp()

      // pre-render pages to html files
      const spinner = ora()
      for (const page of app.pages) {
        spinner.start(`Rendering pages ${chalk.magenta(page.path)}`)
        await renderPage({
          app,
          page,
          vueApp,
          vueRouter,
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
      // remove server dest directory after pages rendered
      await fs.remove(app.dir.dest('.server'))
    }
  }
