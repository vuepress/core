import type { CreateVueAppFunction } from '@vuepress/client'
import type { App, Bundler } from '@vuepress/core'
import { chalk, fs, ora, withSpinner } from '@vuepress/utils'
import type { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import { build as viteBuild } from 'vite'
import { resolveViteConfig } from '../resolveViteConfig'
import type { ViteBundlerOptions } from '../types'
import { renderPage } from './renderPage'

export const build = async (
  options: ViteBundlerOptions,
  app: App
): ReturnType<Bundler['build']> => {
  // vite compile
  let clientOutput!: RollupOutput
  let serverOutput!: RollupOutput
  await withSpinner('Compiling with vite')(async () => {
    // create vite config
    const clientConfig = resolveViteConfig({
      app,
      options,
      isBuild: true,
      isServer: false,
    })
    const serverConfig = resolveViteConfig({
      app,
      options,
      isBuild: true,
      isServer: true,
    })

    ;[clientOutput, serverOutput] = await Promise.all([
      viteBuild(clientConfig) as Promise<RollupOutput>,
      viteBuild(serverConfig) as Promise<RollupOutput>,
    ])
  })

  // render pages
  await withSpinner('Rendering pages')(async () => {
    // load ssr template file
    const ssrTemplate = (
      await fs.readFile(app.options.templateBuild)
    ).toString()

    // get client bundle entry chunk and css asset
    const clientEntryChunk = clientOutput.output.find(
      (item) => item.type === 'chunk' && item.isEntry
    ) as OutputChunk
    const clientCssAsset = clientOutput.output.find(
      (item): item is OutputAsset =>
        item.type === 'asset' && item.fileName.endsWith('.css')
    )

    // get server bundle entry chunk
    const serverEntryChunk = serverOutput.output.find(
      (item) => item.type === 'chunk' && item.isEntry
    ) as OutputChunk

    // load the compiled server bundle
    const serverEntryPath = app.dir.dest('.server', serverEntryChunk.fileName)
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
        output: clientOutput.output,
        outputEntryChunk: clientEntryChunk,
        outputCssAsset: clientCssAsset,
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
