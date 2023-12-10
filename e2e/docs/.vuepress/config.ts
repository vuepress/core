import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from '@vuepress/cli'
import { e2eTheme } from './theme/node/e2eTheme.js'

export default defineUserConfig({
  base: '/',

  head: [],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress E2E',
      description: 'VuePress E2E Test Site',
      head: [],
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress E2E',
      description: 'VuePress E2E 测试站点',
      head: [],
    },
  },

  bundler:
    process.env.E2E_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  theme: e2eTheme(),
})
