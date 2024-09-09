import { fs } from '@vuepress/utils'
import type { StatsModule, WebpackPluginInstance } from 'webpack'
import type { ClientManifest } from './types.js'

const isJS = (file: string): boolean => /\.js(\?[^.]+)?$/.test(file)

const isCSS = (file: string): boolean => /\.css(\?[^.]+)?$/.test(file)

/**
 * Vuepress client plugin
 *
 * Collecting webpack bundled files info for SSR
 */
export const createClientPlugin = (
  outputFile: string,
): WebpackPluginInstance => {
  const clientPlugin: WebpackPluginInstance = {
    apply(compiler) {
      compiler.hooks.emit.tapPromise(
        'vuepress-client-plugin',
        async (compilation) => {
          // get webpack stats object
          const {
            assets = [],
            modules = [],
            entrypoints = {},
            chunks = [],
          } = compilation.getStats().toJson()

          // get all files
          const allFiles = assets.map((a) => a.name)

          // get initial entry files
          const initialFiles = Object.keys(entrypoints)
            .flatMap(
              (name) =>
                entrypoints[name].assets?.map((item) => item.name) ?? [],
            )
            .filter((file) => isJS(file) || isCSS(file))

          // get files that should be loaded asynchronously
          // i.e. script and style files that are not included in the initial entry files
          const asyncFiles = allFiles.filter(
            (file) =>
              (isJS(file) || isCSS(file)) && !initialFiles.includes(file),
          )

          // get asset modules
          const assetModules = modules.filter(
            (m): m is Required<Pick<StatsModule, 'assets'>> & StatsModule =>
              Boolean(m.assets?.length),
          )

          // get modules for client manifest
          const manifestModules: ClientManifest['modules'] = {}

          const fileToIndex = (file: number | string): number =>
            allFiles.indexOf(file.toString())

          modules.forEach((m) => {
            // ignore modules duplicated in multiple chunks
            if (m.chunks?.length !== 1) {
              return
            }

            const cid = m.chunks[0]
            const chunk = chunks.find((c) => c.id === cid)

            if (!chunk?.files) {
              return
            }

            // remove appended hash of module identifier
            // which is the request string of the module
            const request = m.identifier?.replace(/\|\w+$/, '')

            // get chunk files index
            const files = [...chunk.files.map(fileToIndex)]

            // find all asset modules associated with the same chunk
            assetModules.forEach((item) => {
              if (item.chunks?.some((id) => id === cid)) {
                // get asset files
                files.push(...item.assets.map(fileToIndex))
              }
            })

            // map the module request to files index
            if (request) manifestModules[request] = files
          })

          // generate client manifest json file
          const clientManifest: ClientManifest = {
            all: allFiles,
            initial: initialFiles,
            async: asyncFiles,
            modules: manifestModules,
          }

          const clientManifestJson = JSON.stringify(clientManifest, null, 2)

          await fs.outputFile(outputFile, clientManifestJson)
        },
      )
    },
  }

  return clientPlugin
}
