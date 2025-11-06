import { createRequire } from 'node:module'
import type { App } from '@vuepress/core'
import type { VueLoaderOptions } from 'vue-loader'
import { VueLoaderPlugin } from 'vue-loader'
import type { Config } from 'webpack-v5-chain'
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
  const handleVue = ({
    lang,
    test,
  }: {
    lang: 'md' | 'vue'
    test: RegExp
  }): void => {
    const rule = config.module.rule(lang).test(test)

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
    if (lang === 'md') {
      rule
        .use('vuepress-markdown-loader')
        .loader(require.resolve('#vuepress-markdown-loader'))
        .options({ app } satisfies VuepressMarkdownLoaderOptions)
        .end()
    }
  }

  handleVue({ lang: 'md', test: /\.md$/ })
  handleVue({ lang: 'vue', test: /\.vue$/ })

  // use vue-loader plugin
  config.plugin('vue-loader').use(VueLoaderPlugin)
}
