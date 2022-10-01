# Страница

VuePress ориентирован на использование Markdown. Каждый файл Markdown внутри вашего проекта представляет собой отдельную страницу.

## Роутинг

По умолчанию роут страницы определяется относительно вашего Makrdown файла.

Предположим, что это структура каталогов ваших Markdown файлов:

```
└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  └─ README.md
   ├─ contributing.md
   └─ README.md
```

Допустим каталог `docs` является вашей [директорией с исходными файлами](../reference/cli.md), например вы используете команду `vuepress dev docs`. Тогда пути роута ваших файлов Markdown будут такими:

| Relative Path      | Route Path           |
| ------------------ | -------------------- |
| `/README.md`       | `/`                  |
| `/index.md`        | `/`                  |
| `/contributing.md` | `/contributing.html` |
| `/guide/README.md` | `/guide/`            |
| `/guide/page.md`   | `/guide/page.html`   |

::: tip
По умолчанию и `README.md`, и `index.md` будут преобразованы в `index.html` и будет сгенерирован соответствующий путь для роутера, заканчивающийся косой чертой. Однако это может вызвать конфликты, если вы хотите сохранить оба файла.

В таком случае вы можете установить [pagePatterns](../reference/config.md#pagepatterns), чтобы избежать обработки одного из них VuePress, например, используйте `['**/*.md', '!**/README.md', '!.vuepress', '!node_modules']`, чтобы исключить все файлы `README.md`.
:::

## Frontmatter

Файл Markdown может содержать Frontmatter разметку на [YAML](https://yaml.org/). Frontmatter разметка должна быть в верхней части файла Markdown и должна быть заключена в пару строк с тройным пунктиром. Вот простой пример:

```md
---
lang: en-US
title: Title of this page
description: Description of this page
---
```

Вы, наверное, заметили, что эти поля аналогичны полям [Конфигурация сайта](./configuration.md#site-config) в [Файле конфигурации](./configuration.md#config-file). Вы можете переопределить `lang`, `title`, `description` и т. д. текущей страницы через frontmatter. Таким образом, вы можете использовать frontmatter в качестве конфигурации страницы.

Кроме того, VuePress имеет встроенную поддержку некоторых полей frontmatter, и у вашей темы тоже может быть своя особая конфигурация.

::: tip
Ознакомьтесь со [Справочником по Frontmatter](../reference/frontmatter.md) для получения полного списка встроенных полей VuePress.

Ознакомьтесь с [Тема по умолчанию > Справочник по Frontmatter](../reference/default-theme/frontmatter.md) для стандратной темы VuePress.
:::

## Контент

Основной контент вашей страницы написан в Markdown. VuePress сначала преобразует ваш Markdown в HTML-код, а затем обрабатывает HTML-код как `<template>` Vue SFC.

Благодаря возможностям [markdown-it](https://github.com/markdown-it/markdown-it) и синтаксису шаблонов Vue базовый Markdown можно значительно расширить. Ознакомьтесь с руководством [Markdown](./markdown.md) для всех расширений Markdown в VuePress.
