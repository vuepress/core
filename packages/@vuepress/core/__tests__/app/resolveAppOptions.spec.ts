import { resolveAppOptions } from '@vuepress/core'
import { path } from '@vuepress/utils'

describe('core > app > resolveAppOptions', () => {
  it('should create app options with default values', () => {
    const source = '/foo'

    expect(resolveAppOptions({ source })).toEqual({
      base: '/',
      lang: 'en-US',
      title: '',
      description: '',
      head: [],
      locales: {},
      theme: '@vuepress/theme-default',
      themeConfig: {},
      bundler: '@vuepress/bundler-vite',
      bundlerConfig: {},
      source,
      dest: path.resolve(source, '.vuepress/dist'),
      temp: path.resolve(source, '.vuepress/.temp'),
      cache: path.resolve(source, '.vuepress/.cache'),
      public: path.resolve(source, '.vuepress/public'),
      debug: false,
      host: '0.0.0.0',
      port: 8080,
      open: false,
      pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],
      templateDev: path.normalize(
        require.resolve('@vuepress/client/templates/index.dev.html')
      ),
      templateBuild: path.normalize(
        require.resolve('@vuepress/client/templates/index.build.html')
      ),
      shouldPreload: true,
      shouldPrefetch: false,
      markdown: {},
      plugins: [],
    })
  })
})
