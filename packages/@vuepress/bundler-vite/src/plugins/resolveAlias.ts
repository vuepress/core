import type { App } from '@vuepress/core'
import type { AliasOptions } from 'vite'

export const resolveAlias = async ({
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
  const aliasResult = await app.pluginApi.hooks.alias.process(app)

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
