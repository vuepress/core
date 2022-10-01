# Миграция с v1

::: warning
Плагины и темы VuePress v1 несовместимы с VuePress v2. Вам необходимо обновить их до соответствующей версии v2.
:::

Некоторые важные изменения и улучшения VuePress v2:

- VuePress v2 теперь использует Vue 3, поэтому убедитесь, что ваши компоненты и другие клиентские файлы совместимы с Vue 3.
- VuePress v2 разработан с использованием TypeScript, поэтому теперь он обеспечивает лучшую поддержку TS. Настоятельно рекомендуется использовать TypeScript для разработки плагинов и тем. Файл конфигурации VuePress также поддерживает TypeScript, и вы можете напрямую использовать `.vuepress/config.ts`.
- VuePress v2 поддерживает как Webpack, так и Vite в качестве сборщика. Теперь Vite является сборщиком по умолчанию, хотя вы по-прежнему можете использовать Webpack. Вы даже можете использовать Vite в режиме разработки, чтобы получить лучший опыт разработки, и использовать Webpack в режиме сборки, чтобы улучшить совместимость браузера.
- VuePress v2 теперь выпускается в виде чистых пакетов ESM, а файлы конфигурации CommonJS больше не поддерживаются.

Основные идеи и процессы VuePress v2 такие же, как и в v1, в то время как v2 API был переработан и стал более нормализованным. Таким образом, вы можете столкнуться с критическими изменениями при переносе существующего проекта версии 1 на версию 2. Это руководство поможет вам перенести сайты/плагины/темы версии 1 на версию 2.

- Если вы обычный пользователь, вам необходимо прочитать руководство [для пользователей](#для-пользователей).
- Если вы являетесь автором плагина, вам необходимо прочитать руководство [для авторов плагинов](#для-авторов-плагинов).
- Если вы автор темы, вам необходимо прочитать руководство [для авторов тем](#для-авторов-тем).

## Для пользователей

### Изменение пользовательской конфигурации

Файл конфигурации должен быть в формате ESM, а файл конфигурации формата CommonJS больше не поддерживается.

```diff
// .vuepress/config.js

- module.exports = {
-   // конфиг пользователя
- }

+ export default {
+   // конфиг пользователя
+ }
```

#### theme

Использование темы через строку не поддерживается. Импортируйте тему напрямую.

```diff
- module.exports = {
-   theme: '@vuepress/theme-default',
-   themeConfig: {
-     // конфигурация стандартной темы
-   },
- }

+ import { defaultTheme } from '@vuepress/theme-default'
+ export default {
+   theme: defaultTheme({
+     // конфигурация стандартной темы
+   })
+ }
```

#### themeConfig

Удалено. Настройте конфигурацию в тему напрямую.

#### plugins

Использование плагина через строку не поддерживается. Импортируйте плагин напрямую.

```diff
- module.exports = {
-   plugins: [
-     [
-       '@vuepress/plugin-google-analytics',
-       {
-         id: 'G-XXXXXXXXXX',
-       },
-     ],
-   ],
- }

+ import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
+ export default {
+   plugins: [
+     googleAnalyticsPlugin({
+         id: 'G-XXXXXXXXXX',
+     }),
+   ],
+ }
```

#### shouldPrefetch

Значение по умолчанию изменено с `() => true` на `true`.

#### extraWatchFiles

Удалено.

Вы можете настроить вотчер файлов вручную через хук [onWatched](../reference/plugin-api.md#onwatched).

#### patterns

Переименовано в `pagePatterns`

#### markdown.lineNumbers

Перенесено в [markdown.code.lineNumbers](../reference/config.md#markdown-code-linenumbers).

Значение по умолчанию изменено с `false` на `true`.

#### markdown.pageSuffix

Удалено.

#### markdown.externalLinks

Перенесено в [markdown.links.externalAttrs](../reference/config.md#markdown-links).

#### markdown.toc

Изменено.

См. [Конфигурация > markdown.toc](../reference/config.md#markdown-toc)

#### markdown.plugins

Удалено.

Используйте markdown-it плагины в хуке [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown).

#### markdown.extendMarkdown

Удалено.

Используйте хук [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown).

#### markdown.extractHeaders

Перенесено в [markdown.headers](../reference/config.md#markdown-headers).

#### Конфигурации, связанные с Webpack

Все конфигурации, связанные с Webpack, перемещены в опции `@vuepress/bundler-webpack`, в том числе:

- `postcss`
- `stylus`
- `scss`
- `sass`
- `less`
- `chainWebpack`
- `configureWebpack`
- `evergreen`: значение по умолчанию изменено с `false` на `true`

```diff
- module.exports = {
-   sass: { /* ... */ },
- }

+ import { webpackBundler } from '@vuepress/bundler-webpack'
+ export default {
+   bundler: webpackBundler({
+     sass: { /* ... */ },
+   }),
+ }
```

См. [Руководство > Сборщик](./bundler.md).

### Изменения Frontmatter

#### meta

Удалено.

Используйте [head](../reference/frontmatter.md#head). Например:

```yaml
head:
  - - meta
    - name: foo
      content: bar
  - - link
    - rel: canonical
      href: foobar
  - - script
    - {}
    - console.log('привет из frontmatter');
```

Имеет одинаковую структуру с:

```ts
// .vuepress/config.ts
export default {
  // ...
  head: [
    ['meta', { name: 'foo', content: 'bar' }],
    ['link', { rel: 'canonical', href: 'foobar' }],
    ['script', {}, `console.log('привет из frontmatter');`],
  ],
  // ...
}
```

### Изменение шаблонов постоянных ссылок

- `:i_month`: удалено
- `:i_day`: удалено
- `:minutes`: удалено (недокументировано в v1)
- `:seconds`: удалено (недокументировано в v1)
- `:regular`: переименовано в `:raw`

См. [Frontmatter > permalinkPattern](../reference/frontmatter.md#permalinkpattern).

### Изменение цветовой схемы

Цветовая схема Stylus VuePress v1 (т. е. `styles/palette.styl` и `styles/index.styl`) больше не предоставляется VuePress Core.

Цветовая схема извлекается в [@vuepress/plugin-palette](../reference/plugin/palette.md).

Авторы тем могут по-своему разрешить пользователям настраивать стили и не ограничиваться Stylus.

Если вы используете стандартную тему, цветовая схема по-прежнему доступна, но перенесена в SASS, а большинство переменных перенесено в переменные CSS. См. [Стандартная тема > Стили](../reference/default-theme/styles.md).

### Изменения в файлах

#### .vuepress/enhanceApp.js

Переименовано в `.vuepress/client.{js,ts}`, использование также было изменено.

См. [Дополнительно > Рецепты > Использование конфигурации клиента](../advanced/cookbook/usage-of-client-config.md).

#### .vuepress/components/

Файлы в этом каталоге не будут автоматически зарегистрированы как компоненты Vue.

Вам нужно использовать [@vuepress/plugin-register-components](../reference/plugin/register-components.md) или зарегистрировать свои компоненты вручную в файле `.vuepress/client.{js,ts}`.

#### .vuepress/theme/

Этот каталог не будет использоваться как локальная тема неявно, если он существует.

Вам необходимо импортировать и установить локальную тему с помощью опции [theme](../reference/config.md#theme).

### Изменения Markdown слотов

Markdown слоты более не поддерживаются.

### Изменения CLI

#### eject command

Удалено.

#### cache options

- `-c, --cache [cache]`: заменено на `--cache <cache>`, что означает, что сокращение `-c` не относится к опции `cache`, а значение опции `cache` не опционально.
- `--no-cache`: переименован в `--clean-cache`.

### Изменения стандартной темы

#### Встроенные компоненты

- `<CodeGroup />` и `<CodeBlock />` переименованы `<CodeGroup />` в `<CodeGroupItem />` соответственно
- `<Badge />`
  - `$badgeErrorColor` переменная была переименована в `$badgeDangerColor`
  - `type` свойство принимает только `tip`, `warning` и `danger`

#### Цветовая схема

Цветовая схема темы по умолчанию перенесена на переменные SASS и CSS.

См. [Тема по умолчанию > Стили](../reference/default-theme/styles.md).

#### Конфигурация темы

Конфигурация стандартной темы была сильно изменена. Вам лучше проверить ссылку на конфигурацию темы по умолчанию v2, чтобы правильно перенести её.

См. [Тема по умолчанию > Конфигурация](../reference/default-theme/config.md).

### Изменения в официальных плагинах

Изучите документацию v2 официальных плагинов.

### Темы и плагины сообщества

Темы и плагины версии 1 несовместимы с версией 2.

Пожалуйста, убедитесь, что те темы и плагины, которые вы используете, поддерживают v2, и обратитесь к их собственной документации для руководства по миграции.

## Для авторов плагинов

Некоторые важные критические изменения:

- Вы больше не можете использовать другие плагины в своем плагине, что позволяет избежать множества потенциальных проблем, вызванных вложенностью плагинов. Если ваш плагин зависит от других плагинов, вы можете перечислить их в документации, чтобы попросить пользователей импортировать их вручную. В качестве альтернативы вы можете предоставить пользователям множество плагинов для удобства.
- Большинство хуков v1 имеют эквиваленты в v2. Единственным исключением является `extendsCli`, который был удалён.
- Хуки, связанные с Webpack, удалены, поскольку VuePress Core не связан с webpack. Вы можете попробовать использовать хук [extendsBundlerOptions](../reference/plugin-api.md#extendsbundleroptions) для аналогичной цели и убедиться, что он работает со всеми сборщиками.

Более подробное руководство о том, как написать плагин в версии 2, см. в разделе [Дополнительно > Создание плагина](../advanced/plugin.md).

### Изменения Plugin API

- `plugins`: удалено
- `ready`: переименовано в `onPrepared`
- `updated`: переименовано в `onWatched`
- `generated`: переименовано в `onGenerated`
- `additionalPages`: удалено, используйте `app.pages.push(createPage())` в хуке `onInitialized`
- `clientDynamicModules`: удалено, используйте `app.writeTemp()` в хуке `onPrepared`
- `enhanceAppFiles`: удалено, используйте хук `clientConfigFile`
- `globalUIComponents`: удалено, используйте хук `clientConfigFile`
- `clientRootMixin`: удалено, используйте хук `clientConfigFile`
- `extendMarkdown`: переименовано в `extendsMarkdown`
- `chainMarkdown`: удалено
- `extendPageData`: переименовано в `extendsPage`
- `extendsCli`: удалено
- `configureWebpack`: удалено
- `chainWebpack`: удалено
- `beforeDevServer`: удалено
- `afterDevServer`: удалено

См. [Plugin API](../reference/plugin-api.md).

## Для авторов тем

Хотя мы больше не разрешаем использовать другие плагины в плагине, вы все равно можете использовать плагины в своей теме.

Некоторые важные критические изменения:

- Больше нет **структуры каталогов в теме**.
  - Файл `theme/enhanceApp.js` не будет использоваться в качестве файла улучшения клиентского приложения неявно. Вам нужно указать это явно в хуке `clientConfigFile`.
  - Файлы в каталоге `theme/global-components/` не будут автоматически зарегистрированы как компоненты Vue. Вам нужно использовать [@vuepress/plugin-register-components](../reference/plugin/register-components.md) или зарегистрировать компоненты вручную в `clientConfigFile`.
  - Файлы в каталоге `theme/layouts/` не будут автоматически регистрироваться как компоненты страниц. Вам нужно указать это явно в опции `layouts` в `clientConfigFile`.
  - Файлы в каталоге `theme/templates/` не будут автоматически использоваться в качестве шаблона dev / ssr. Вам нужно явно указать тему в параметрах `templateBuild` и `templateDev`.
  - Всегда предоставляйте действительный файл записи js и больше не используйте `"main": "layouts/Layout.vue"` в качестве записи темы.
- `themeConfig` удалён из пользовательской конфигурации и данных сайта. Чтобы получить доступ к `themeConfig`, как через `this.$site.themeConfig` в v1, мы рекомендуем использовать [@vuepress/plugin-theme-data](../reference/plugin/theme-data.md) плагин и его композишен API хук `useThemeData`.
- Stylus больше не является препроцессором CSS по умолчанию, а цветовая схема Stylus не встроена. Если вы всё еще хотите использовать цветовую схему, аналогичную v1, вам может помочь [@vuepress/plugin-palette](../reference/plugin/palette.md).
- Подсветка синтаксиса блоков кода Markdown с помощью Prism.js не встроена по умолчанию. Вы можете использовать либо [@vuepress/plugin-prismjs](../reference/plugin/prismjs.md), либо [@vuepress/plugin-shiki](../reference/plugin/shiki.md), либо реализовать подсветку синтаксиса по-своему.
- Из соображений масштабируемости `this.$site.pages` больше не доступен.

Более подробное руководство о том, как написать тему в версии 2, см. в разделе [Дополнительно > Создание темы](../advanced/theme.md).

### Изменения в Theme API

#### layouts

Удалено.

Теперь вам нужно указать компонент страницы клиентском файле конфигурации вашей темы.

См. [Дополнительно > Создание темы](../advanced/theme.md).

#### extend

Переименовано в `extends`.

Вы по-прежнему можете наследовать родительскую тему с помощью `extends: parentTheme()`, которая будет расширять плагины, страницы и т. д.

Вы можете обратиться к [Стандартная тема > Расширение](../reference/default-theme/extending.md), чтобы узнать, как расширить тему по умолчанию.

Псевдонимы `@theme` и `@parent-theme` по умолчанию удаляются, но вы всё равно можете создать расширяемую тему с помощью аналогичного подхода, [Дополнительно > Рецепты > Делаем тему расширяемой](../advanced/cookbook/making-a-theme-extendable.md).
