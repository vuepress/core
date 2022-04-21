import type { Plugin, PluginObject } from '@vuepress/core'
import { path, withSpinner } from '@vuepress/utils'
import { generateServiceWorker } from './generateServiceWorker'

/**
 * Options for @vuepress/plugin-pwa
 */
export interface PwaPluginOptions
  // TODO: the type of the parameter of generateSW is missing
  extends Omit<any, 'swDest' | 'globDirectory'> {
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
  }: PwaPluginOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@vuepress/plugin-pwa',
    }

    if (app.env.isDev) {
      return plugin
    }

    return {
      ...plugin,

      clientAppSetupFiles: path.resolve(
        __dirname,
        '../client/clientAppSetup.js'
      ),

      define: {
        __PWA_SW_FILENAME__: serviceWorkerFilename,
      },

      onGenerated: (app) =>
        withSpinner('Generating service worker')(() =>
          generateServiceWorker(app, serviceWorkerFilename, generateSWConfig)
        ),
    }
  }
