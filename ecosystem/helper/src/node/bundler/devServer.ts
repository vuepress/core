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
import { getBundlerName } from './getBundler.js'
import { mergeViteConfig } from './vite/index.js'

export interface CustomServerOptions {
  /**
   * Path to be responded
   */
  path: string
  /**
   * Respond function
   */
  response: (
    request: IncomingMessage,
    response: ServerResponse
  ) => Promise<string | Buffer>

  /**
   * error msg
   */
  errMsg?: string
}

/**
 * Handle specific path when running VuePress Dev Server
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param path Path to be responded
 * @param response respond function
 * @param errMsg error msg
 */
export const useCustomDevServer = (
  bundlerOptions: unknown,
  app: App,
  {
    errMsg = 'The server encountered an error',
    response: responseHandler,
    path,
  }: CustomServerOptions
): void => {
  const { base } = app.options
  const bundlerName = getBundlerName(app)

  // in dev
  if (app.env.isDev) {
    if (bundlerName === 'vite') {
      // for vite
      const viteBundlerOptions = <ViteBundlerOptions>bundlerOptions
      const handler: HandleFunction = (
        request: IncomingMessage,
        response: ServerResponse
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
        viteBundlerOptions.viteOptions || {},
        { plugins: [viteMockRequestPlugin] }
      )
    }

    // for webpack
    else if (bundlerName === 'webpack') {
      const webpackBundlerOptions = <WebpackBundlerOptions>bundlerOptions

      const { devServerSetupMiddlewares } = webpackBundlerOptions

      webpackBundlerOptions.devServerSetupMiddlewares = (
        middlewares: WebpackDevServer.Middleware[],
        server: WebpackDevServer
      ): WebpackDevServer.Middleware[] => {
        server.app?.get(
          `${base}${removeLeadingSlash(path)}`,
          (request, response) => {
            responseHandler(request, response)
              .then((data) => response.status(200).send(data))
              .catch(() => response.status(500).send(errMsg))
          }
        )

        return devServerSetupMiddlewares
          ? devServerSetupMiddlewares(middlewares, server)
          : middlewares
      }
    }
  }
}
