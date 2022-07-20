import { ora } from '@vuepress/utils'
import * as envinfo from 'envinfo'

export const info = async (): Promise<void> => {
  const spinner = ora()
  spinner.start('Collecting Environment Info')

  const result = await envinfo.run(
    {
      System: ['OS', 'CPU', 'Memory', 'Shell'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Utilities: ['Git'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmPackages: [
        '@vuepress/bundler-vite',
        '@vuepress/bundler-webpack',
        '@vuepress/cli',
        '@vuepress/client',
        '@vuepress/core',
        '@vuepress/markdown',
        '@vuepress/plugin-active-header-links',
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-container',
        '@vuepress/plugin-docsearch',
        '@vuepress/plugin-external-link-icon',
        '@vuepress/plugin-git',
        '@vuepress/plugin-google-analytics',
        '@vuepress/plugin-medium-zoom',
        '@vuepress/plugin-nprogress',
        '@vuepress/plugin-palette',
        '@vuepress/plugin-prismjs',
        '@vuepress/plugin-pwa',
        '@vuepress/plugin-pwa-popup',
        '@vuepress/plugin-register-components',
        '@vuepress/plugin-search',
        '@vuepress/plugin-shiki',
        '@vuepress/plugin-theme-data',
        '@vuepress/plugin-toc',
        '@vuepress/shared',
        '@vuepress/theme-default',
        '@vuepress/utils',
        'vuepress',
        'vuepress-vite',
        'vuepress-webpack',
        'vue',
        'vue-router',
        'vue-loader',
      ],
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true,
    }
  )
  spinner.stop()

  console.info(result)
}
