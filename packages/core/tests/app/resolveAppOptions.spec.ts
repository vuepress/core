import { path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { resolveAppOptions } from '../../src/index.js'

describe('core > app > resolveAppOptions', () => {
  it('should create app options with default values', () => {
    const source = '/foo'

    expect(
      resolveAppOptions({
        source,
        theme: { name: 'theme' } as any,
        bundler: { name: 'bundler' } as any,
      })
    ).toEqual({
      base: '/',
      lang: 'en-US',
      title: '',
      description: '',
      head: [],
      locales: {},
      theme: { name: 'theme' },
      bundler: { name: 'bundler' },
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
      permalinkPattern: null,
      templateDev: path.normalize(
        require.resolve('@vuepress/client/templates/dev.html')
      ),
      templateBuild: path.normalize(
        require.resolve('@vuepress/client/templates/build.html')
      ),
      shouldPreload: true,
      shouldPrefetch: true,
      markdown: {},
      plugins: [],
    })
  })
})
