import type { App } from '@vuepress/core'
import { fs, requireResolve } from '@vuepress/utils'
import * as history from 'connect-history-api-fallback'
import type { Connect, Plugin } from 'vite'
import type { ViteBundlerOptions } from '../types'
import { resolveAlias } from './resolveAlias'
import { resolveDefine } from './resolveDefine'

// built-in packages that include client code, which should not be optimized nor externalized
const BUILT_IN_PACKAGES = ['@vuepress/client', '@vuepress/shared']

export const createMainPlugin = ({
  app,
  options,
  isServer,
  isBuild,
}: {
  app: App
  options: ViteBundlerOptions
  isServer: boolean
  isBuild: boolean
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
import '@vuepress/client/lib/app.js'
</script>
</body>`
          )
      )
    }

    return {
      root: app.dir.temp('vite-root'),
      base: app.options.base,
      mode: isBuild ? 'production' : 'development',
      define: await resolveDefine({ app, isServer }),
      publicDir: app.dir.public(),
      cacheDir: app.dir.cache(),
      resolve: {
        alias: await resolveAlias({ app }),
      },
      css: {
        postcss: {
          plugins: isServer
            ? []
            : [
                require('autoprefixer'),
                ...(isBuild ? [require('postcss-csso')] : []),
              ],
        },
      },
      server: {
        host: app.options.host,
        port: app.options.port,
        open: app.options.open,
      },
      build: {
        ssr: isServer,
        outDir: isServer ? app.dir.dest('.server') : app.dir.dest(),
        emptyOutDir: false,
        cssCodeSplit: false,
        rollupOptions: {
          input: app.dir.client('lib/app.js'),
          preserveEntrySignatures: 'allow-extension',
        },
        minify: isServer ? false : !app.env.isDebug,
      },
      optimizeDeps: {
        include: ['@vuepress/shared'],
        exclude: [
          ...BUILT_IN_PACKAGES,
          ...app.pluginApi.plugins
            .map((plugin) => plugin.name)
            .filter(requireResolve),
        ],
      },
      ssr: {
        noExternal: [
          ...BUILT_IN_PACKAGES,
          ...app.pluginApi.plugins
            .map((plugin) => plugin.name)
            .filter(requireResolve),
        ],
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
