import type { CreateVueAppFunction } from '@vuepress/client'
import type { App, Bundler } from '@vuepress/core'
import { chalk, fs, importFile, ora, withSpinner } from '@vuepress/utils'
import type { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import { build as viteBuild } from 'vite'
import { resolveViteConfig } from '../resolveViteConfig.js'
import type { ViteBundlerOptions } from '../types.js'
import { renderPage } from './renderPage.js'

export const build = async (
  options: ViteBundlerOptions,
  app: App
): ReturnType<Bundler['build']> => {
  // plugin hook: extendsBundlerOptions
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app)

  // vite compile
  let clientOutput!: RollupOutput
  let serverOutput!: RollupOutput
  await withSpinner('Compiling with vite')(async () => {
    // create vite config
    const clientConfig = await resolveViteConfig({
      app,
      options,
      isBuild: true,
      isServer: false,
    })
    const serverConfig = await resolveViteConfig({
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
    const serverEntryPath = app.dir.temp('.server', serverEntryChunk.fileName)
    const { createVueApp } = await importFile<{
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
        output: clientOutput.output,
        outputEntryChunk: clientEntryChunk,
        outputCssAsset: clientCssAsset,
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
