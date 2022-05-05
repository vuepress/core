import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import * as history from 'connect-history-api-fallback'
import type { Connect, Plugin } from 'vite'
import { resolveAlias } from './resolveAlias'
import { resolveDefine } from './resolveDefine'

export const mainPlugin = ({
  app,
  isBuild,
  isServer,
}: {
  app: App
  isBuild: boolean
  isServer: boolean
}): Plugin => ({
  name: 'vuepress:main',

  config: async () => {
    // create a temp index.html as dev entry point
    if (!isBuild) {
      await app.writeTemp(
        'vite-root/index.html',
        fs
          .readFileSync(app.options.templateDev)
          .toString()
          .replace(
            /<\/body>/,
            `\
<script type="module">
import '@vuepress/client/app'
</script>
</body>`
          )
      )
    }

    // vuepress related packages that include pure esm client code,
    // which should not be optimized in dev mode, and should not be
    // externalized in build ssr mode
    const clientPackages = [
      '@vuepress/client',
      ...app.pluginApi.plugins.map(({ name }) => name),
    ]

    return {
      root: app.dir.temp('vite-root'),
      base: app.options.base,
      mode: isBuild ? 'production' : 'development',
      define: await resolveDefine({ app, isServer }),
      publicDir: app.dir.public(),
      cacheDir: app.dir.cache(),
      resolve: {
        alias: await resolveAlias({ app, isServer }),
      },
      css: {
        postcss: {
          plugins: isServer ? [] : [require('autoprefixer')],
        },
        preprocessorOptions: {
          scss: { charset: false },
        },
      },
      server: {
        host: app.options.host,
        port: app.options.port,
        open: app.options.open,
      },
      build: {
        ssr: isServer,
        outDir: isServer ? app.dir.temp('.server') : app.dir.dest(),
        emptyOutDir: false,
        cssCodeSplit: false,
        rollupOptions: {
          input: app.dir.client('dist/app.js'),
          preserveEntrySignatures: 'allow-extension',
        },
        minify: isServer ? false : !app.env.isDebug,
      },
      optimizeDeps: {
        include: ['@vuepress/shared'],
        exclude: clientPackages,
      },
      ssr: {
        noExternal: clientPackages,
      },
    }
  },

  generateBundle(_, bundle) {
    // delete all asset outputs in server build
    if (isServer) {
      Object.keys(bundle).forEach((key) => {
        if (bundle[key].type === 'asset') {
          delete bundle[key]
        }
      })
    }
  },

  configureServer(server) {
    return () => {
      // fallback all `.html` requests to `/index.html`
      server.middlewares.use(
        history({
          rewrites: [
            {
              from: /\.html$/,
              to: '/index.html',
            },
          ],
        }) as Connect.NextHandleFunction
      )
    }
  },
})
