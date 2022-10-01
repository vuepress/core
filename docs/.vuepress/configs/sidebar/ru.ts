import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarRu: SidebarConfig = {
  '/ru/guide/': [
    {
      text: 'Руководство',
      children: [
        '/ru/guide/README.md',
        '/ru/guide/getting-started.md',
        '/ru/guide/configuration.md',
        '/ru/guide/page.md',
        '/ru/guide/markdown.md',
        '/ru/guide/assets.md',
        '/ru/guide/i18n.md',
        '/ru/guide/deployment.md',
        '/ru/guide/theme.md',
        '/ru/guide/plugin.md',
        '/ru/guide/bundler.md',
        '/ru/guide/migration.md',
      ],
    },
  ],
  '/ru/advanced/': [
    {
      text: 'Дополнительно',
      children: [
        '/ru/advanced/architecture.md',
        '/ru/advanced/plugin.md',
        '/ru/advanced/theme.md',
      ],
    },
    {
      text: 'Рецепты',
      children: [
        '/ru/advanced/cookbook/README.md',
        '/ru/advanced/cookbook/usage-of-client-config.md',
        '/ru/advanced/cookbook/adding-extra-pages.md',
        '/ru/advanced/cookbook/making-a-theme-extendable.md',
        '/ru/advanced/cookbook/passing-data-to-client-code.md',
        '/ru/advanced/cookbook/markdown-and-vue-sfc.md',
      ],
    },
  ],
  '/ru/reference/': [
    {
      text: 'Справочник VuePress',
      collapsible: true,
      children: [
        '/ru/reference/cli.md',
        '/ru/reference/config.md',
        '/ru/reference/frontmatter.md',
        '/ru/reference/components.md',
        '/ru/reference/plugin-api.md',
        '/ru/reference/theme-api.md',
        '/ru/reference/client-api.md',
        '/ru/reference/node-api.md',
      ],
    },
    {
      text: 'Сборщики',
      collapsible: true,
      children: [
        '/ru/reference/bundler/vite.md',
        '/ru/reference/bundler/webpack.md',
      ],
    },
    {
      text: 'Стандартная тема',
      collapsible: true,
      children: [
        '/ru/reference/default-theme/config.md',
        '/ru/reference/default-theme/frontmatter.md',
        '/ru/reference/default-theme/components.md',
        '/ru/reference/default-theme/markdown.md',
        '/ru/reference/default-theme/styles.md',
        '/ru/reference/default-theme/extending.md',
      ],
    },
    {
      text: 'Официальные плагины',
      collapsible: true,
      children: [
        {
          text: 'Common Features',
          children: [
            '/ru/reference/plugin/back-to-top.md',
            '/ru/reference/plugin/container.md',
            '/ru/reference/plugin/external-link-icon.md',
            '/ru/reference/plugin/google-analytics.md',
            '/ru/reference/plugin/medium-zoom.md',
            '/ru/reference/plugin/nprogress.md',
            '/ru/reference/plugin/register-components.md',
          ],
        },
        {
          text: 'Поиск',
          children: [
            '/ru/reference/plugin/docsearch.md',
            '/ru/reference/plugin/search.md',
          ],
        },
        {
          text: 'PWA',
          children: [
            '/ru/reference/plugin/pwa.md',
            '/ru/reference/plugin/pwa-popup.md',
          ],
        },
        {
          text: 'Подсветка синтаксиса',
          children: [
            '/ru/reference/plugin/prismjs.md',
            '/ru/reference/plugin/shiki.md',
          ],
        },
        {
          text: 'Создание тем',
          children: [
            '/ru/reference/plugin/active-header-links.md',
            '/ru/reference/plugin/git.md',
            '/ru/reference/plugin/palette.md',
            '/ru/reference/plugin/theme-data.md',
            '/ru/reference/plugin/toc.md',
          ],
        },
      ],
    },
  ],
}
