import type { Plugin, PluginObject } from '@vuepress/core'
import { getDirname, path, withSpinner } from '@vuepress/utils'
import { generateServiceWorker } from './generateServiceWorker.js'
import type { GenerateSWConfig } from './generateServiceWorker.js'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-pwa
 */
export interface PwaPluginOptions extends GenerateSWConfig {
  /**
   * Filename of the generated service worker file
   *
   * If you put it into a sub directory, the `scope` of service worker
   * might be affected
   *
   * @default 'service-worker.js'
   */
  serviceWorkerFilename?: string
}

export const pwaPlugin =
  ({
    serviceWorkerFilename = 'service-worker.js',
    ...generateSWConfig
  }: PwaPluginOptions = {}): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@vuepress/plugin-pwa',
    }

    if (app.env.isDev) {
      return plugin
    }

    return {
      ...plugin,

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      define: {
        __PWA_SW_FILENAME__: serviceWorkerFilename,
      },

      onGenerated: (app) =>
        withSpinner('Generating service worker')(() =>
          generateServiceWorker(app, serviceWorkerFilename, generateSWConfig)
        ),
    }
  }
