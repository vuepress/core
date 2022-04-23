import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import * as history from 'connect-history-api-fallback'
import type { Connect, Plugin } from 'vite'
import type { ViteBundlerOptions } from '../types'
import { resolveAlias } from './resolveAlias'
import { resolveDefine } from './resolveDefine'

export const createMainPlugin = ({
  app,
  options,
  isBuild,
  isServer,
}: {
  app: App
  options: ViteBundlerOptions
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
          input: app.dir.client('dist/app.js'),
          preserveEntrySignatures: 'allow-extension',
        },
        minify: isServer ? false : !app.env.isDebug,
      },
      optimizeDeps: {
        include: ['@vuepress/shared'],
        // packages that include client code, which should not be optimized
        exclude: [
          '@vuepress/client',
          ...app.pluginApi.plugins.map(({ name }) => name),
        ],
      },
      // bundle all dependencies except vue in ssr mode:
      // - transform esm modules to cjs, otherwise we may wrongly `require()` esm modules
      // - bundle dependencies all together, otherwise we may fail to resolve them with pnpm
      // - force externalize vue, because we need to `require('vue')` in node side for ssr usage,
      //   then we also need vue as peer-dependency when using pnpm
      ssr: {
        external: ['vue'],
        noExternal: [/^(?!(vue)$).*$/],
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
