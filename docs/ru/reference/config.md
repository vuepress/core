# Конфигурация

<NpmBadge package="@vuepress/cli" />
<NpmBadge package="@vuepress/core" />

## Конфигурация сайта

### base

- Тип: `string`

- Значение по умолчанию: `/`

- Подробности:

  Базовый URL-адрес, по которому будет развёрнут сайт.

  Вам нужно будет установить значение, если вы планируете развернуть свой сайт по дополнительному пути. Он всегда должен начинаться и заканчиваться косой чертой. Например, если вы планируете развернуть свой сайт на страницах GitHub по адресу `https://foo.github.io/bar/`, вам следует установить `base` в значении `"/bar/"`.

  `base` автоматически добавляется ко всем URL-адресам, начинающимся с `/` в других параметрах, поэтому вам нужно указать его только один раз.

- См. также:
  - [Руководство > Ассеты > Базовый хелпер](../guide/assets.md#базовыи-хелпер)
  - [Руководство > Деплой](../guide/deployment.md)

### lang

- Тип: `string`

- Значение по умолчанию: `en-US`

- Подробности:

  Язык сайта.

  Используется как атрибут `lang` в теге `<html>` в отреднедренном HTML.

  Может быть использовано разное значение в разных локалях.

- См. также:
  - [Конфигурация > locales](#locales)
  - [Frontmatter > lang](./frontmatter.md#lang)

### title

- Тип: `string`

- Значение по умолчанию: `''`

- Подробности:

  Название сайта.

  Добавляется в конце тайтлов всех страниц, также оно будет отображаться на панели навигации в теме по умолчанию.

  Может быть использовано разное значение в разных локалях.

- См. также:
  - [Конфиг > locales](#locales)

### description

- Тип: `string`

- Значение по умолчанию: `''`

- Подробности:

  Описание для сайта.

  Будет использовано в атрибуте `content` тега `<meta name="description" />` в отреднедренном HTML-коде, который может быть переопределен полем `description` во frontmatter.

  Может быть использовано разное значение в разных локалях.

- См. также:
  - [Конфиг > locales](#locales)
  - [Frontmatter > description](./frontmatter.md#description)

### head

- Тип: `HeadConfig[]`

- Значение по умолчанию: `[]`

- Подробности:

  Дополнительные теги для вставки в тег `<head>` в отредеренном HTML.

  Вы можете указать каждый тег в форме `[tagName, { attrName: attrValue }, innerHTML?]`.

  Может быть использовано разное значение в разных локалях.

- Пример:

  Чтобы добавить пользовательскую иконку:

```ts
export default {
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
}
```

Будет отрендерено как：

```html
<head>
  <link rel="icon" href="/images/logo.png" />
</head>
```

- См. также:
  - [Конфиг > locales](#locales)
  - [Frontmatter > head](./frontmatter.md#head)

### locales

- Тип: `{ [path: string]: Partial<SiteLocaleData> }`

- Значение по умолчанию: `{}`

- Подробности:

  Укажите локали для поддержки i18n.

  Допустимые поля:

  - [lang](#lang)
  - [title](#title)
  - [description](#description)
  - [head](#head)

- См. также:
  - [Руководство > I18n](../guide/i18n.md)

## Конфигурация темы

### theme

- Тип: `Theme`

- Подробности:

  Установите тему вашего сайта.

  Если этот параметр не установлен, будет использоваться стандартная тема.

- См. также:
  - [Руководство > Тема](../guide/theme.md)
  - [Стандартная тема > Конфигурация](./default-theme/config.md)

## Конфигурация сборщика

### bundler

- Тип: `Bundler`

- Подробности:

  Установите сборщик вашего сайта.

  Если этот параметр не установлен, будет использоваться сборщик по умолчанию:

  - С `vuepress` или `vuepress-vite` сборщиком по умолчанию является vite.
  - С `vuepress-webpack` сборщиком по умолчанию является webpack.

- См. также:
  - [Руководство > Сборщик](../guide/bundler.md)
  - [Сборщики > Vite](./bundler/vite.md)
  - [Сборщики > Webpack](./bundler/webpack.md)

## Общая конфигурация

### dest

- Тип: `string`

- Значение по умолчанию: `` `${sourceDir}/.vuepress/dist` ``

- Подробности:

  Укажите директорию, где будет размещён код, который будет скомпилирован командой `vuepress build`.

### temp

- Тип: `string`

- Значение по умолчанию: `` `${sourceDir}/.vuepress/.temp` ``

- Подробности:

  Укажите директорию, где будут храниться временные файлы.

::: warning
Поскольку VuePress будет загружать временные файлы во время разработки и сборки, временный каталог должен находиться внутри корня проекта для правильного разрешения зависимостей.
:::

### cache

- Тип: `string`

- Значение по умолчанию: `` `${sourceDir}/.vuepress/.cache` ``

- Подробности:

  Укажите директорию, где будет храниться файлы кэша.

### public

- Тип: `string`

- Значение по умолчанию: `` `${sourceDir}/.vuepress/public` ``

- Подробности:

  Укажите директорию для общедоступных файлов.

- См. также
  - [Руководство > Ассеты > Public файлы](../guide/assets.md#public-файлы)

### debug

- Тип: `boolean`

- Значение по умолчанию: `false`

- Подробности:

  Включить режим отладки или нет.

  Это может быть полезно для разработчиков. Кроме того, мы используем пакет [debug](https://github.com/visionmedia/debug) для ведения журнала отладки, который можно включить с помощью переменной окружения `DEBUG=vuepress*`.

### pagePatterns

- Тип: `string[]`

- Значение по умолчанию: `['**/*.md', '!.vuepress', '!node_modules']`

- Подробности:

  Укажите шаблоны файлов, которые вы хотите разрезолвить как страницы вашего сайта. Паттерны относятся к коду в директории исходных файлов.

### permalinkPattern

- Тип: `string | null`

- Значение по умолчанию: `null`

- Подробности:

  Укажите шаблон для генерации постоянной ссылки.

  Это значение может быть переопределено полем `permalinkPattern` во frontmatter.

- См. также:
  - [Frontmatter > permalinkPattern](./frontmatter.md#permalinkpattern)

## Конфигурация разработки

### host

- Тип: `string`

- Значение по умолчанию: `'0.0.0.0'`

- Подробности:

  Укажите хост, который будет использоваться для сервера разработки.

### port

- Тип: `number`

- Значение по умолчанию: `8080`

- Подробности:

  Укажите порт, который будет использоваться для сервера разработки.

### open

- Тип: `boolean`

- Значение по умолчанию: `false`

- Подробности:

  Открывать ли браузер после старта dev-сервера.

### templateDev

- Тип: `string`

- Значение по умолчанию: `'@vuepress/client/templates/dev.html'`

- Подробности:

  Укажите путь к HTML-шаблону, который будет использоваться для разработки.

## Конфигурация сборки

### shouldPreload

- Тип: `((file: string, type: string) => boolean)) | boolean`

- Значение по умолчанию: `true`

- Подробности:

  Функция для управления списком файлов, для которых должен создаваться `<link rel="preload">`. Установите значение `true` или `false`, чтобы полностью включить или отключить прелоадинг файлов.

  По умолчанию будут предварительно загружены только те файлы, которые требуются для текущей страницы. Таким образом, в большинстве случаев вы можете оставить значение `true`.

### shouldPrefetch

- Тип: `((file: string, type: string) => boolean)) | boolean`

- Значение по умолчанию: `true`

- Подробности:

  Функция для управления списком файлов, для которых должен создаваться `<link rel="prefetch">`. Установите значение `true` или `false`, чтобы полностью включить или отключить прелоадинг файлов.

  Если вы установите значение `true`, все файлы, которые требуются для других страниц, будут загружаться заранее. Это хорошо для небольших сайтов, что ускорит навигацию, но может быть не очень хорошей идеей, если на вашем сайте много страниц.

### templateBuild

- Тип: `string`

- начение по умолчанию: `'@vuepress/client/templates/build.html'`

- Подробности:

  Укажите путь к HTML-шаблону, который будет использоваться для сборки.

## Конфигурация Markdown

### markdown

- Тип: `MarkdownOptions`

- Значение по умолчанию: `{}`

- Подробности:

  Настройте встроенные во VuePress расширения синтаксиса Markdown.

  Принимает все параметры [markdown-it](https://github.com/markdown-it/markdown-it) и следующие дополнительные параметры.

- См. также:
  - [markdown-it > Инициализация с пресетами и параметрами](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
  - [Руководством > Markdown > Расширения синтаксиса](../guide/markdown.md#расширения-синтаксиса)

### markdown.anchor

- Тип: `AnchorPluginOptions | false`

- Значение по умолчанию:

```ts
const defaultOptions = {
  level: [1, 2, 3, 4, 5, 6],
  permalink: anchorPlugin.permalink.ariaHidden({
    class: 'header-anchor',
    symbol: '#',
    space: true,
    placement: 'before',
  }),
}
```

- Подробности:

  Параметры для [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor).

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Guide > Markdown > Syntax Extensions > Header Anchors](../guide/markdown.md#header-anchors)

### markdown.assets

- Тип: `AssetsPluginOptions | false`

- Подробности:

  Параметры для встроенного во VuePress плагина markdown-it assets.

  Установите значение `false`, чтобы отключить этот плагин.

::: danger
Вы не должны настраивать его, если не понимаете, для чего он нужен.
:::

### markdown.code

- Тип: `CodePluginOptions | false`

- Подробности:

  Параметры для встроенного во VuePress плагина markdown-it code.

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Guide > Markdown > Syntax Extensions > Code Blocks](../guide/markdown.md#code-blocks)

#### markdown.code.highlightLines

- Тип: `boolean`

- Значение по умолчанию: `true`

- Подробности:

  Включить подсветку строки кода или нет.

- См. также:
  - [Руководство > Markdown > Расширения синтаксиса > Блоки кода > Подсветка строк](../guide/markdown.md#подсветка-строк)

#### markdown.code.lineNumbers

- Тип: `boolean | number`

- Значение по умолчанию: `true`

- Подробности:

  Настройте номера строк кода.

  - Значение типа `boolean` должно включать или отключать номера строк.
  - Значение типа `number` — это минимальное количество строк для включения нумерации строк. Например, если вы установите значение `4`, номера строк будут доступны только в том случае, если ваш блок кода содержит не менее 4 строк кода.

- См. также:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Line Numbers](../guide/markdown.md#line-numbers)

#### markdown.code.preWrapper

- Тип: `boolean`

- Значение по умолчанию: `true`

- Подробности:

  Включить дополнительную враппер тега `<pre>` или нет.

  Враппер требуется для `highlightLines` и `lineNumbers`. Это означает, что если вы отключите `preWrapper`, подсветка строк и номера строк также будут отключены.

::: tip
Вы можете отключить его, если хотите реализовать эту функциональность на стороне клиента. Например, [Подсветка строки Prismjs](https://prismjs.com/plugins/line-highlight/) или [Номера строк Prismjs](https://prismjs.com/plugins/line-numbers/).
:::

#### markdown.code.vPre.block

- Тип: `boolean`

- Значение по умолчанию: `true`

- Подробности:

  Добавлять директиву `v-pre` в тег `<pre>` блока кода или нет.

- См. также:
  - [Руководство > Markdown > Расширения синтаксиса > Блоки кода > Обёртка v-pre](../guide/markdown.md##обёртка-v-pre)

#### markdown.code.vPre.inline

- Тип: `boolean`

- Значение по умолчанию: `true`

- Подробности:

  Добавлять директиву `v-pre` в тег `<code>` инлайн-блока кода или нет.

- См. также:
  - [Руководство > Markdown > Расширения синтаксиса > Блоки кода > Обёртка v-pre](../guide/markdown.md##обёртка-v-pre)

### markdown.component

- Тип: `undefined | false`

- Подробности:

  Параметры для [@mdit-vue/plugin-component](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-component).

  Установите значение `false`, чтобы отключить этот плагин.

::: danger
Вы не должны настраивать его, если не понимаете, для чего он нужен.
:::

### markdown.emoji

- Тип: `EmojiPluginOptions | false`

- Подробности:

  Параметры для [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji).

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Руководство > Markdown > Расширения синтаксиса > Эмодзи](../guide/markdown.md#эмодзи)

### markdown.frontmatter

- Тип: `FrontmatterPluginOptions | false`

- Значение по умолчанию:

```ts
const defaultOptions = {
  grayMatterOptions: {
    excerpt: true,
    excerpt_separator: '<!-- more -->',
  },
}
```

- Подробности:

  Параметры для [@mdit-vue/plugin-frontmatter](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-frontmatter).

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Руководство > Страница > Frontmatter](../guide/page.md#frontmatter)
  - [Node API > Свойства страницы > frontmatter](./node-api.md#frontmatter)
  - [Node API > Свойства страницы > excerpt](./node-api.md#excerpt)

::: danger
Вы не должны настраивать его, если не понимаете, для чего он нужен.
:::

### markdown.headers

- Тип: `HeadersPluginOptions | false`

- Значение по умолчанию:

```ts
const defaultOptions = {
  level: [2, 3],
}
```

- Подробности:

  Параметры для [@mdit-vue/plugin-headers](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-headers).

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Node API > Page Properties > headers](./node-api.md#headers)

### markdown.importCode

- Тип: `ImportCodePluginOptions | false`

- Подробности:

  Параметры для встроенного во VuePress markdown-it плагина import-code.

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Руководство > Markdown > Расширение синтаксиса > Import Code Blocks](../guide/markdown.md#import-code-blocks)

#### markdown.importCode.handleImportPath

- Тип: `(str: string) => string`

- Значение по умолчанию: `(str) => str`

- Подробности:

  Функция для обработки путей импорта в синтаксисе кода импорта.

### markdown.links

- Тип: `LinksPluginOptions | false`

- Подробности:

  Параметры встроенного во VuePress markdown-it плагина links.

  Он преобразует внутренние ссылки в `<RouterLink>` и добавит дополнительные атрибуты и значок ко внешним ссылкам.

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Guide > Markdown > Syntax Extensions > Links](../guide/markdown.md#links)

#### markdown.links.internalTag

- Тип: `'a' | 'RouterLink'`

- Значение по умолчанию: `'RouterLink'`

- Подробности:

  Тег для внутренних ссылок.

  По умолчанию этот плагин преобразует внутренние ссылки в `<RouterLink>`. Вы можете установить для этой опции значение `'a'`, чтобы отключить эту функцию.

#### markdown.links.externalAttrs

- Тип: `Record<string, string>`

- Значение по умолчанию: `{ target: '_blank', rel: 'noopener noreferrer' }`

- Подробности:

  Дополнительные атрибуты для внешних ссылок.

### markdown.sfc

- Тип: `SfcPluginOptions | false`

- Подробности:

  Параметры для [@mdit-vue/plugin-sfc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-sfc).

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Рецепты > Markdown и Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md)
  - [Node API > Свойства страницы > sfcBlocks](./node-api.md#sfcblocks)

### markdown.slugify

- Тип: `(str: string) => string`

- Подробности:

  Функция slugify по умолчанию.

### markdown.title

- Тип: `undefined | false`

- Подробности:

  Параметры для [@mdit-vue/plugin-title](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-title).

  Установите значение `false`, чтобы отключить этот плагин.

::: danger
Вы не должны настраивать его, если не понимаете, для чего он нужен.
:::

### markdown.toc

- Тип: `TocPluginOptions | false`

- Значение по умолчанию:

```ts
const defaultOptions = {
  level: [2, 3],
}
```

- Подробности:

  Параметры для [@mdit-vue/plugin-toc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc).

  Установите значение `false`, чтобы отключить этот плагин.

- См. также:
  - [Руководство > Markdown > Расширения синтаксиса > Оглавление](../guide/markdown.md#оглавление)

## Конфигурация плагинов

### plugins

- Тип: `(Plugin | Plugin[])[]`

- Подробности:

  Плагины для использования.

  Эта опция принимает массив, каждый элемент которого может быть плагином или массивом плагинов.

- См. также:
  - [Руководство > Плагин](../guide/plugin.md)

## API плагинов

Файл конфигурации пользователя также работает как плагин VuePress, поэтому доступны все API-интерфейсы плагина, кроме параметров `name` и `multiple`.

Пожалуйста, ознакомьтесь со [Справочником API плагинов](./plugin-api.md) для получения полного списка API плагинов.
