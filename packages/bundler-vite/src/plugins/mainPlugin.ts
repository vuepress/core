import type { App } from '@vuepress/core'
import { fs, sanitizeFileName } from '@vuepress/utils'
import autoprefixer from 'autoprefixer'
import history from 'connect-history-api-fallback'
import type { AcceptedPlugin } from 'postcss'
import postcssrc from 'postcss-load-config'
import type { AliasOptions, Connect, Plugin, UserConfig } from 'vite'

/**
 * The main plugin to compat vuepress with vite
 */
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
      ...app.pluginApi.plugins
        // the 'user-config' plugin is created by cli internally
        .filter(({ name }) => name !== 'user-config')
        .map(({ name }) => name),
    ]

    let postcssPlugins: AcceptedPlugin[]
    try {
      const postcssConfigResult = await postcssrc()
      postcssPlugins = postcssConfigResult.plugins
    } catch (error) {
      postcssPlugins = [autoprefixer]
    }

    return {
      root: app.dir.temp('vite-root'),
      base: app.options.base,
      mode: !isBuild || app.env.isDebug ? 'development' : 'production',
      define: await resolveDefine({ app, isBuild, isServer }),
      publicDir: app.dir.public(),
      cacheDir: app.dir.cache(),
      resolve: {
        alias: await resolveAlias({ app, isServer }),
      },
      css: {
        postcss: {
          plugins: isServer ? [] : postcssPlugins,
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
          input: app.dir.client(
            fs.readJsonSync(app.dir.client('package.json')).exports['./app']
          ),
          output: {
            sanitizeFileName,
            ...(isServer
              ? {
                  // also add hash to ssr entry file, so that users could build multiple sites in a single process
                  entryFileNames: `[name].[hash].mjs`,
                }
              : {}),
          },
          preserveEntrySignatures: 'allow-extension',
        },
        minify: isServer ? false : !app.env.isDebug,
      },
      optimizeDeps: {
        exclude: clientPackages,
      },
      ssr: {
        format: 'esm',
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

/**
 * Resolve vite config `resolve.alias`
 */
const resolveAlias = async ({
  app,
  isServer,
}: {
  app: App
  isServer: boolean
}): Promise<AliasOptions> => {
  const alias: AliasOptions = {
    '@internal': app.dir.temp('internal'),
    '@temp': app.dir.temp(),
    '@source': app.dir.source(),
  }

  // plugin hook: alias
  const aliasResult = await app.pluginApi.hooks.alias.process(app, isServer)

  aliasResult.forEach((aliasObject) =>
    Object.entries(aliasObject).forEach(([key, value]) => {
      alias[key] = value
    })
  )

  return [
    ...Object.keys(alias).map((item) => ({
      find: item,
      replacement: alias[item],
    })),
    ...(isServer
      ? []
      : [
          {
            find: /^vue$/,
            replacement: 'vue/dist/vue.runtime.esm-bundler.js',
          },
          {
            find: /^vue-router$/,
            replacement: 'vue-router/dist/vue-router.esm-bundler.js',
          },
        ]),
  ]
}

/**
 * Resolve vite config `define`
 */
const resolveDefine = async ({
  app,
  isBuild,
  isServer,
}: {
  app: App
  isBuild: boolean
  isServer: boolean
}): Promise<UserConfig['define']> => {
  const define: UserConfig['define'] = {
    __VUEPRESS_VERSION__: JSON.stringify(app.version),
    __VUEPRESS_BASE__: JSON.stringify(app.options.base),
    __VUEPRESS_DEV__: JSON.stringify(!isBuild),
    __VUEPRESS_SSR__: JSON.stringify(isServer),
    // @see http://link.vuejs.org/feature-flags
    // enable options API by default
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(app.env.isDebug),
  }

  // override vite built-in define config in debug mode
  if (app.env.isDebug) {
    define['process.env.NODE_ENV'] = JSON.stringify('development')
  }

  // plugin hook: define
  const defineResult = await app.pluginApi.hooks.define.process(app, isServer)

  defineResult.forEach((defineObject) =>
    Object.entries(defineObject).forEach(([key, value]) => {
      define[key] = JSON.stringify(value)
    })
  )

  return define
}
