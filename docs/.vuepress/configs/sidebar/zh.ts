import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/zh/guide/': [
    {
      isGroup: true,
      text: '指南',
      children: [
        '/zh/guide/README.md',
        '/zh/guide/getting-started.md',
        '/zh/guide/configuration.md',
        '/zh/guide/page.md',
        '/zh/guide/markdown.md',
        '/zh/guide/assets.md',
        '/zh/guide/i18n.md',
        '/zh/guide/deployment.md',
        '/zh/guide/theme.md',
        '/zh/guide/plugin.md',
        '/zh/guide/bundler.md',
      ],
    },
  ],
  '/zh/guide/advanced/': [
    {
      isGroup: true,
      text: '深入',
      children: [
        '/zh/guide/advanced/architecture.md',
        '/zh/guide/advanced/plugin.md',
        '/zh/guide/advanced/theme.md',
        '/zh/guide/advanced/markdown.md',
      ],
    },
  ],
  '/zh/reference/': [
    {
      isGroup: true,
      text: 'VuePress 参考',
      children: [
        '/zh/reference/cli.md',
        '/zh/reference/config.md',
        '/zh/reference/frontmatter.md',
        '/zh/reference/components.md',
        '/zh/reference/plugin-api.md',
        '/zh/reference/theme-api.md',
        '/zh/reference/client-api.md',
        '/zh/reference/node-api.md',
      ],
    },
  ],
  '/zh/reference/bundler/': [
    {
      isGroup: true,
      text: '打包工具参考',
      children: [
        '/zh/reference/bundler/webpack.md',
        '/zh/reference/bundler/vite.md',
      ],
    },
  ],
  '/zh/reference/default-theme/': [
    {
      isGroup: true,
      text: '默认主题参考',
      children: [
        '/zh/reference/default-theme/config.md',
        '/zh/reference/default-theme/frontmatter.md',
        '/zh/reference/default-theme/components.md',
        '/zh/reference/default-theme/markdown.md',
      ],
    },
  ],
  '/zh/reference/plugin/': [
    {
      isGroup: true,
      text: '官方插件参考',
      children: [
        '/zh/reference/plugin/active-header-links.md',
        '/zh/reference/plugin/back-to-top.md',
        '/zh/reference/plugin/container.md',
        '/zh/reference/plugin/debug.md',
        '/zh/reference/plugin/docsearch.md',
        '/zh/reference/plugin/git.md',
        '/zh/reference/plugin/google-analytics.md',
        '/zh/reference/plugin/medium-zoom.md',
        '/zh/reference/plugin/nprogress.md',
        '/zh/reference/plugin/palette.md',
        '/zh/reference/plugin/prismjs.md',
        '/zh/reference/plugin/pwa.md',
        '/zh/reference/plugin/pwa-popup.md',
        '/zh/reference/plugin/theme-data.md',
      ],
    },
  ],
}
