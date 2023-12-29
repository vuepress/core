import { ora } from '@vuepress/utils'
import envinfo from 'envinfo'

export const info = async (): Promise<void> => {
  const spinner = ora()
  spinner.start('Collecting Environment Info')

  const result = await envinfo.run(
    {
      System: ['OS', 'CPU', 'Memory', 'Shell'],
      Binaries: ['bun', 'Node', 'npm', 'pnpm', 'Yarn'],
      Utilities: ['Git'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmPackages: [
        '@vuepress/bundler-vite',
        '@vuepress/bundler-webpack',
        '@vuepress/cli',
        '@vuepress/client',
        '@vuepress/core',
        '@vuepress/markdown',
        '@vuepress/shared',
        '@vuepress/utils',
        'vuepress',
        'vue',
        'vue-router',
      ],
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true,
    },
  )
  spinner.stop()

  console.info(result)
}
