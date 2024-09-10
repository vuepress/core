import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import history from 'connect-history-api-fallback'
import type { Connect, Plugin } from 'vite'

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
          if (!req.url?.endsWith('.html')) {
            next()
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')

          void server
            .transformIndexHtml(req.url, indexHtml, req.originalUrl)
            .then((result) => {
              res.end(result)
            })
        })
    }
  },
})
