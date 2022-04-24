import { path } from '@vuepress/utils'
import { resolveAppOptions } from '../../src'

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

  describe('should check and handle important options', () => {
    it('should insure base syntax', () => {
      // @ts-expect-error
      expect(resolveAppOptions({ base: 'base', source: '/foo' }).base).toEqual(
        '/base/'
      )
    })

    it('should ensure dest does not include source file', () => {
      const source = path.resolve(__dirname, 'foo')
      const dest = path.resolve(__dirname, 'foo/.vuepress/dist')

      expect(
        resolveAppOptions({
          dest: path.resolve(__dirname),
          theme: { name: 'theme' } as any,
          bundler: { name: 'bundler' } as any,
          source,
        }).dest
      ).toEqual(dest)
    })
  })
})
