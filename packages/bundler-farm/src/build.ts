import { build as farmBuild } from '@farmfe/core'
import type { App, Bundler } from '@vuepress/core'
import { debug, fs, withSpinner } from '@vuepress/utils'
import { resolveFarmConfig } from './resolveFarmConfig.js'
import type { FarmBundlerOptions } from './types.js'

const log = debug('vuepress:bundler-vite/build')

export const build = async (
  options: FarmBundlerOptions,
  app: App,
): ReturnType<Bundler['build']> => {
  // plugin hook: extendsBundlerOptions
  await app.pluginApi.hooks.extendsBundlerOptions.process(options, app)

  // vite compile
  log('compiling start')
  await withSpinner('Compiling with farm')(async () => {
    // create vite config
    const clientConfig = await resolveFarmConfig({
      app,
      options,
      isBuild: true,
      isServer: false,
    })
    const serverConfig = await resolveFarmConfig({
      app,
      options,
      isBuild: true,
      isServer: true,
    })

    await Promise.all([farmBuild(clientConfig), farmBuild(serverConfig)])
  })
  log('compiling finish')

  /*
  // render pages
  await withSpinner(`Rendering ${app.pages.length} pages`)(async (spinner) => {
    // get client bundle entry chunk and css asset
    const clientEntryChunk = clientOutput.output.find(
      (item) => item.type === 'chunk' && item.isEntry,
    ) as OutputChunk
    const clientCssAsset = clientOutput.output.find(
      (item): item is OutputAsset =>
        item.type === 'asset' && item.fileName.endsWith('.css'),
    )

    // get server bundle entry chunk
    const serverEntryChunk = serverOutput.output.find(
      (item) => item.type === 'chunk' && item.isEntry,
    ) as OutputChunk

    // load the compiled server bundle
    const serverEntryPath = app.dir.temp('.server', serverEntryChunk.fileName)
    const { createVueApp } = await importFile<{
      createVueApp: CreateVueAppFunction
    }>(serverEntryPath)
    // create vue ssr app
    const { app: vueApp, router: vueRouter } = await createVueApp()
    const { renderToString } = await import('vue/server-renderer')

    // load ssr template file
    const ssrTemplate = await fs.readFile(app.options.templateBuild, {
      encoding: 'utf8',
    })

    // pre-render pages to html files
    for (const page of app.pages) {
      if (spinner) spinner.text = `Rendering pages ${colors.magenta(page.path)}`
      await renderPage({
        app,
        page,
        vueApp,
        vueRouter,
        renderToString,
        ssrTemplate,
        output: clientOutput.output,
        outputEntryChunk: clientEntryChunk,
        outputCssAsset: clientCssAsset,
      })
    }
  })
  */

  // keep the server bundle files in debug mode
  if (!app.env.isDebug) {
    // remove server temp directory after pages rendered
    await fs.remove(app.dir.temp('.server'))
  }
}
