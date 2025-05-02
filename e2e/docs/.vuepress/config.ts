import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from 'vuepress'
import { path } from 'vuepress/utils'
import { fooPlugin } from './plugins/foo/fooPlugin.js'
import { e2eTheme } from './theme/node/e2eTheme.js'

const E2E_BASE = (process.env.E2E_BASE ?? '/') as '/' | `/${string}/`
const E2E_BUNDLER = process.env.E2E_BUNDLER ?? 'vite'

export default defineUserConfig({
  base: E2E_BASE,

  dest: path.join(__dirname, 'dist', E2E_BASE),

  port: 9080,

  head: [
    ['meta', { name: 'foo', content: 'foo' }],
    ['meta', { name: 'bar', content: 'bar' }],
    ['meta', { name: 'baz', content: 'baz' }],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress E2E',
      description: 'VuePress E2E Test Site',
      head: [
        ['meta', { name: 'foo-en', content: 'foo-en' }],
        ['meta', { name: 'bar', content: 'foobar' }],
        ['meta', { name: 'baz', content: 'foobar baz' }],
      ],
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress E2E',
      description: 'VuePress E2E 测试站点',
      head: [
        ['meta', { name: 'foo-zh', content: 'foo-zh' }],
        ['meta', { name: 'bar', content: 'foobar zh' }],
      ],
    },
    '/中文/': {
      lang: '中文',
      title: 'VuePress E2E',
      description: 'VuePress E2E 测试站点',
      head: [
        ['meta', { name: 'foo-中文', content: 'foo-中文' }],
        ['meta', { name: 'bar', content: '中文' }],
      ],
    },
  },

  markdown: {
    assets: {
      absolutePathPrependBase: E2E_BUNDLER === 'webpack',
    },
  },

  bundler:
    E2E_BUNDLER === 'webpack'
      ? webpackBundler()
      : viteBundler({
          viteOptions: {
            optimizeDeps: {
              include: ['@vuepress-e2e/conditional-exports'],
            },
          },
        }),

  theme: e2eTheme(),

  extendsPage: (page) => {
    if (page.path === '/page-data/route-meta.html') {
      page.routeMeta = {
        a: 1,
        b: 2,
        ...page.routeMeta,
      }
    }
  },

  plugins: [fooPlugin],

  // The alias entries are intentionally ordered by key length to ensure
  // that more specific aliases (e.g., '@dir/a.js') take precedence over
  // less specific ones (e.g., '@dir'). Do not reorder these entries.
  alias: {
    '@dir/a.js': path.resolve(__dirname, '../../modules/dir2/a.js'),
    '@dir': path.resolve(__dirname, '../../modules/dir1'),
    '@dir/b.js': path.resolve(__dirname, '../../modules/dir2/b.js'),
  },
})
