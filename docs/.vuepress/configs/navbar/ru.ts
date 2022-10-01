import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta.js'

export const navbarRu: NavbarConfig = [
  {
    text: 'Руководство',
    link: '/ru/guide/',
  },
  {
    text: 'Справочник',
    children: [
      {
        text: 'VuePress',
        children: [
          {
            text: 'CLI',
            link: '/ru/reference/cli.html',
          },
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
        children: [
          '/ru/reference/bundler/vite.md',
          '/ru/reference/bundler/webpack.md',
        ],
      },
      {
        text: 'Стандартная тема',
        children: [
          '/ru/reference/default-theme/config.md',
          '/ru/reference/default-theme/frontmatter.md',
          '/ru/reference/default-theme/components.md',
          '/ru/reference/default-theme/markdown.md',
          '/ru/reference/default-theme/styles.md',
          '/ru/reference/default-theme/extending.md',
        ],
      },
    ],
  },
  {
    text: 'Плагины',
    children: [
      {
        text: 'Базовая функциональность',
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
  {
    text: 'Узнать больше',
    children: [
      {
        text: 'Дополнительно',
        children: [
          '/ru/advanced/architecture.md',
          '/ru/advanced/plugin.md',
          '/ru/advanced/theme.md',
          {
            text: 'Рецепты',
            link: '/ru/advanced/cookbook/',
          },
        ],
      },
      {
        text: 'Ресурсы',
        children: [
          '/ru/contributing.md',
          {
            text: 'Awesome VuePress',
            link: 'https://github.com/vuepress/awesome-vuepress',
          },
        ],
      },
    ],
  },
  {
    text: `v${version}`,
    children: [
      {
        text: 'Changelog',
        link: 'https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md',
      },
      {
        text: 'v1.x',
        link: 'https://v1.vuepress.vuejs.org',
      },
      {
        text: 'v0.x',
        link: 'https://v0.vuepress.vuejs.org',
      },
    ],
  },
]
