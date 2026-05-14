import { createRequire } from 'node:module'

import type { RspackChain } from 'rspack-chain'

import type { RspackBundlerOptions } from '../types.js'
import { resolveEsbuildLoaderOptions } from './resolveEsbuildLoaderOptions.js'

const require = createRequire(import.meta.url)

/**
 * Set rspack module to handle js files
 */
export const handleModuleJs = ({
  options,
  config,
  isBuild,
  isServer,
}: {
  options: RspackBundlerOptions
  config: RspackChain
  isBuild: boolean
  isServer: boolean
}): void => {
  // only enable transpilation in production client bundle
  // when `evergreen` option is set to `false`
  if (options.evergreen !== false || !isBuild || isServer) {
    return
  }

  config.module
    .rule('js')
    .test(/\.jsx?$/)
    .exclude.add((filePath) => {
      // always transpile js / jsx in vue files
      if (/\.vue\.jsx?$/.test(filePath)) {
        return false
      }
      // transpile all core packages and vuepress related packages.
      // i.e.
      // @vuepress/*
      // vuepress-*
      if (
        /(@vuepress[/\\][^/\\]*|vuepress-[^/\\]*)[/\\](?!node_modules).*\.js$/.test(
          filePath,
        )
      ) {
        return false
      }
      // don't transpile node_modules
      return filePath.includes('node_modules')
    })
    .end()
    // use esbuild-loader
    .use('esbuild-loader')
    .loader(require.resolve('esbuild-loader'))
    .options(resolveEsbuildLoaderOptions())
    .end()
}
