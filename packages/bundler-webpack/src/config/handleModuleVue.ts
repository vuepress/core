import { createRequire } from 'node:module'
import type { App } from '@vuepress/core'
import type { VueLoaderOptions } from 'vue-loader'
import { VueLoaderPlugin } from 'vue-loader'
import type Config from 'webpack-5-chain'
import type { VuepressMarkdownLoaderOptions } from '../loaders/vuepressMarkdownLoader'
import type { WebpackBundlerOptions } from '../types.js'

const require = createRequire(import.meta.url)

/**
 * Set webpack module to handle vue files
 */
export const handleModuleVue = ({
  app,
  options,
  config,
  isBuild,
  isServer,
}: {
  app: App
  options: WebpackBundlerOptions
  config: Config
  isBuild: boolean
  isServer: boolean
}): void => {
  const applyVuePipeline = ({
    rule,
    isMd,
  }: {
    rule: Config.Rule
    isMd: boolean
  }): void => {
    // use internal vuepress-ssr-loader to handle SSR dependencies
    if (isBuild) {
      rule
        .use('vuepress-ssr-loader')
        .loader(require.resolve('#vuepress-ssr-loader'))
        .end()
    }

    // use official vue-loader
    rule
      .use('vue-loader')
      .loader(require.resolve('vue-loader'))
      .options({
        ...options.vue,
        isServerBuild: isServer,
      } satisfies VueLoaderOptions)
      .end()

    // use internal vuepress-markdown-loader to handle markdown files
    if (isMd) {
      rule
        .use('vuepress-markdown-loader')
        .loader(require.resolve('#vuepress-markdown-loader'))
        .options({ app } satisfies VuepressMarkdownLoaderOptions)
        .end()
    }
  }

  applyVuePipeline({
    rule: config.module.rule('md').test(/\.md$/),
    isMd: true,
  })

  applyVuePipeline({
    rule: config.module.rule('vue').test(/\.vue$/),
    isMd: false,
  })

  // use vue-loader plugin
  config.plugin('vue-loader').use(VueLoaderPlugin)
}
