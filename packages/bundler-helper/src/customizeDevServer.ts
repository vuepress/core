import type { IncomingMessage, ServerResponse } from 'node:http'

import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type {
  WebpackBundlerOptions,
  WebpackDevServer,
} from '@vuepress/bundler-webpack'
import type { App } from '@vuepress/core'
import { removeLeadingSlash } from '@vuepress/shared'
import type { HandleFunction } from 'connect'
import type { Plugin } from 'vite'

import { getBundlerName } from './getBundlerName.js'
import { mergeViteConfig } from './vite/index.js'

/** Options for customizing VuePress Dev Server */
export interface DevServerOptions {
  /** Path to be responded */
  path: string
  /** Respond handler */
  response: (
    request: IncomingMessage,
    response: ServerResponse,
  ) => Promise<Buffer | string>

  /** Error msg */
  errMsg?: string
}

/**
 * Handle specific path when running VuePress Dev Server
 *
 * @example
 *  // handle `/api/` path
 *  useCustomDevServer(bundlerOptions, app, {
 *    path: '/api/',
 *    response: async () => {
 *     const data = await prepareYourData();
 *     return JSON.stringify({ message: 'Hello from custom dev server!' })
 *    },
 *    errMsg: 'Unexpected api error',
 *  })
 *
 * @param bundlerOptions - VuePress Bundler config
 * @param app - VuePress Node App
 * @param options - Dev server options
 */
export const customizeDevServer = (
  bundlerOptions: unknown,
  app: App,
  {
    errMsg = 'The server encountered an error',
    response: responseHandler,
    path,
  }: DevServerOptions,
): void => {
  // must in dev
  if (!app.env.isDev) return

  const { base } = app.siteData
  const bundlerName = getBundlerName(app)

  switch (bundlerName) {
    // for vite
    case 'vite': {
      const viteBundlerOptions = bundlerOptions as ViteBundlerOptions
      const handler: HandleFunction = (
        request: IncomingMessage,
        response: ServerResponse,
      ) => {
        responseHandler(request, response)
          .then((data) => {
            response.statusCode = 200
            response.end(data)
          })
          .catch(() => {
            response.statusCode = 500
            response.end(errMsg)
          })
      }

      const viteMockRequestPlugin: Plugin = {
        name: `virtual:dev-server-mock/${path}`,
        configureServer: ({ middlewares }) => {
          middlewares.use(`${base}${removeLeadingSlash(path)}`, handler)
        },
      }

      viteBundlerOptions.viteOptions = mergeViteConfig(
        viteBundlerOptions.viteOptions ?? {},
        { plugins: [viteMockRequestPlugin] },
      )
      break
    }
    // for webpack
    case 'webpack': {
      const webpackBundlerOptions = bundlerOptions as WebpackBundlerOptions

      const { devServerSetupMiddlewares } = webpackBundlerOptions

      /**
       * @param middlewares - Existing middlewares
       * @param server - Webpack Dev Server instance
       * @returns Updated middlewares
       * @see https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
       */
      webpackBundlerOptions.devServerSetupMiddlewares = (
        middlewares: WebpackDevServer.Middleware[],
        server: WebpackDevServer,
      ): WebpackDevServer.Middleware[] => {
        server.app?.get(
          `${base}${removeLeadingSlash(path)}`,
          (request, response) => {
            responseHandler(request, response)
              .then((data) => response.status(200).send(data))
              .catch(() => response.status(500).send(errMsg))
          },
        )

        return devServerSetupMiddlewares
          ? devServerSetupMiddlewares(middlewares, server)
          : middlewares
      }
      break
    }

    default: {
      // eslint-disable-next-line no-console
      console.error(
        `[customizeDevServer]: ${bundlerName} is not supported yet.`,
      )
    }
  }
}
