import type { App } from '@vuepress/core'
import type { Config } from 'webpack-v5-chain'

/**
 * Set webpack resolve
 */
export const handleResolve = async ({
  app,
  config,
  isServer,
}: {
  app: App
  config: Config
  isServer: boolean
}): Promise<void> => {
  // aliases
  const alias = {
    '@source': app.dir.source(),
    '@temp': app.dir.temp(),
    '@internal': app.dir.temp('internal'),
  }

  // plugin hook: alias
  const aliasResult = await app.pluginApi.hooks.alias.process(app, isServer)

  aliasResult.forEach((aliasObject) => {
    Object.assign(alias, aliasObject)
  })

  // set aliases
  config.resolve.alias.merge(
    Object.fromEntries(
      Object.entries(alias).sort(([a], [b]) => b.length - a.length),
    ),
  )

  // extensions
  config.resolve.extensions.merge([
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.vue',
    '.json',
  ])

  // extensionAlias
  config.resolve.extensionAlias.merge({
    '.js': ['.js', '.ts'],
    '.mjs': ['.mjs', '.mts'],
  })
}
