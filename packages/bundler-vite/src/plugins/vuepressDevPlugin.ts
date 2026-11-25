import type { ServerResponse } from 'node:http'

import type { App } from '@vuepress/core'
import { fs, logger } from '@vuepress/utils'
import history from 'connect-history-api-fallback'
import type { Connect, Plugin } from 'vite'

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error)

/**
 * End the response only once, even if the connection has already been closed
 */
const endResponse = (
  res: ServerResponse,
  statusCode: number,
  contentType: string,
  body: string,
): void => {
  if (res.headersSent || res.writableEnded) {
    return
  }

  res.statusCode = statusCode
  res.setHeader('Content-Type', contentType)
  res.end(body)
}

/**
 * Configure dev command for vuepress
 */
export const vuepressDevPlugin = ({ app }: { app: App }): Plugin => ({
  name: 'vuepress:dev',

  async configureServer(server) {
    // inject vuepress client app script into dev template
    const templateDevContent = await fs.readFile(app.options.templateDev, {
      encoding: 'utf-8',
    })
    const indexHtml = templateDevContent.replace(
      /<\/body>/,
      `\
<script type="module">
import 'vuepress/client-app'
</script>
</body>`,
    )

    return () => {
      server.middlewares
        // fallback all `.html` requests to `/index.html`
        .use(
          history({
            rewrites: [
              {
                from: /\.html$/,
                to: '/index.html',
              },
            ],
          }) as Connect.NextHandleFunction,
        )
        // serve virtual `/index.html`
        .use((req, res, next) => {
          const { url } = req

          if (!url?.endsWith('.html')) {
            next()
            return
          }

          const respondWithIndexHtml = async (): Promise<void> => {
            try {
              const result = await server.transformIndexHtml(
                url,
                indexHtml,
                req.originalUrl,
              )

              endResponse(res, 200, 'text/html', result)
            } catch (error) {
              logger.error(`Failed to transform index html for ${url}:`, error)

              endResponse(
                res,
                500,
                'text/plain; charset=utf-8',
                `Failed to transform ${url}: ${getErrorMessage(error)}`,
              )
            }
          }

          void respondWithIndexHtml()
        })
    }
  },
})
