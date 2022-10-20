# API плагинов

<NpmBadge package="@vuepress/core" />

API плагинов поддерживается пакетом [@vuepress/core](https://www.npmjs.com/package/@vuepress/core). Вы можете проверить [Node API](./node-api.md), чтобы узнать, как использовать экземпляр приложения VuePress в хуках плагинов.

## Обзор

Плагины следует использовать перед инициализацией. Основные параметры будут обработаны после использования плагина:

- [name](#name)
- [multiple](#multiple)

При инициализации приложения будут обрабатываться следующие хуки:

- [extendsMarkdownOptions](#extendsmarkdownoptions)
- [extendsMarkdown](#extendsmarkdown)
- [extendsPageOptions](#extendspageoptions)
- [extendsPage](#extendspage)
- [onInitialized](#oninitialized)

При подготовке файлов будут обрабатываться следующие хуки:

- [clientConfigFile](#clientconfigfile)
- [onPrepared](#onprepared)

В dev / build будут обрабатываться следующие хуки:

- [extendsBundlerOptions](#extendsbundleroptions)
- [alias](#alias)
- [define](#define)
- [onWatched](#onwatched)
- [onGenerated](#ongenerated)

> Ознакомьтесь с [Дополнительно > Архитектура > Основной процесс и хуки](../advanced/architecture.md#core-process-and-hooks) чтобы лучше понять процесс.

## Основные параметры

### name

- Тип: `string`

- Подробности:

  Название плагина.

  Оно будет использоваться для идентификации плагинов, чтобы избежать многократного использования одного и того же плагина, поэтому обязательно используйте уникальное имя плагина.

  Оно должен следовать соглашению об именах:

  - Non-scoped: `vuepress-plugin-foo`
  - Scoped: `@org/vuepress-plugin-foo`

- См. также:
  - [Plugin API > multiple](#multiple)

### multiple

- Тип: `boolean`

- Значение по умолчанию: `false`

- Подробности:

  Укажите, можно ли использовать плагин несколько раз.

  Если установлено значение `false`, при использовании плагинов с тем же именем тот, который использовался ранее, будет заменен тем, который будет использоваться позже.

  Если установлено значение `true`, плагины с одним и тем же именем могут использоваться несколько раз и не будут заменены.

- См. также:
  - [Plugin API > name](#name)

## Development Hooks

### alias

- Тип: `Record<string, any> | ((app: App, isServer: boolean) => Record<string, any>)`

- Подробности:

  Определение псевдонимов путей.

  Этот хук принимает объект или функцию, которая возвращает объект.

- Пример:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  alias: {
    '@alias': path.resolve(__dirname, './path/to/alias'),
  },
}
```

### clientConfigFile

- Тип: `string | ((app: App) => string | Promise<string>)`

- Подробности:

  Путь к файлу конфигурации клиента.

  Этот хук принимает абсолютный путь к файлу или функцию, которая возвращает путь.

- Пример:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  clientConfigFile: path.resolve(__dirname, './path/to/clientConfig.js'),
}
```

- См. также:
  - [API клиента > defineClientConfig](./client-api.md#defineclientconfig)
  - [Дополнительно > Рецепты > Использование конфигурации клиента](../advanced/cookbook/usage-of-client-config.md)

### define

- Тип: `Record<string, any> | ((app: App, isServer: boolean) => Record<string, any>)`

- Подробности:

  Определить замену глобальных констант.

  Этот хук принимает объект или функцию, которая возвращает объект.

  Это может быть полезно для передачи переменных в клиентские файлы. Обратите внимание, что значения будут автоматически обработаны `JSON.stringify()`.

- Пример:

```ts
export default {
  define: {
    __GLOBAL_BOOLEAN__: true,
    __GLOBAL_STRING__: 'foobar',
    __GLOBAL_OBJECT__: { foo: 'bar' },
  },
}
```

### extendsBundlerOptions

- Тип: `(options: BundlerOptions, app: App) => void | Promise<void>`

- Подробности:

  Расширение настроек сборщика.

  Этот хук принимает функцию, которая получит параметры сборщика.

  Этот хук можно использовать для изменения настроек сборщика.

  Вы можете определить, какой сборщик использует пользователь, с помощью `app.options.bundler.name`.

- Пример:

Добавление настроек по умолчанию [app.compilerOptions.isCustomElement](https://vuejs.org/api/application.html#app-config-compileroptions):

```ts
export default {
  extendsBundlerOptions: (bundlerOptions, app) => {
    // расширяет настройки @vuepress/bundler-vite
    if (app.options.bundler.name === '@vuepress/bundler-vite') {
      bundlerOptions.vuePluginOptions ??= {}
      bundlerOptions.vuePluginOptions.template ??= {}
      bundlerOptions.vuePluginOptions.template.compilerOptions ??= {}
      const isCustomElement =
        bundlerOptions.vuePluginOptions.template.compilerOptions.isCustomElement
      bundlerOptions.vuePluginOptions.template.compilerOptions.isCustomElement =
        (tag) => {
          if (isCustomElement?.(tag)) return true
          if (tag === 'my-custom-element') return true
        }
    }

    // расширяет настройки @vuepress/bundler-webpack
    if (app.options.bundler.name === '@vuepress/bundler-webpack') {
      bundlerOptions.vue ??= {}
      bundlerOptions.vue.compilerOptions ??= {}
      const isCustomElement = bundlerOptions.vue.compilerOptions.isCustomElement
      bundlerOptions.vue.compilerOptions.isCustomElement = (tag) => {
        if (isCustomElement?.(tag)) return true
        if (tag === 'my-custom-element') return true
      }
    }
  },
}
```

- См. также:
  - [Сборщики > Vite](./bundler/vite.md)
  - [Сборщики > Webpack](./bundler/webpack.md)

### extendsMarkdownOptions

- Тип: `(options: MarkdownOptions, app: App) => void | Promise<void>`

- Подробности:

  Расширение настроек Markdown.

  Этот хук принимает функцию, которая получит параметры Markdown.

  Этот хук можно использовать для изменения параметров Markdown.

- Пример:

Изменение уровней заголовков по умолчанию, которые будут извлечены:

```ts
export default {
  extendsMarkdownOptions: (markdownOptions, app) => {
    if (markdownOptions.headers === false) return
    markdownOptions.headers ??= {}
    if (markdownOptions.headers.level) return
    markdownOptions.headers.level = [2, 3, 4, 5, 6]
  },
}
```

- См. также:
  - [Config > markdown](./config.md#markdown)

### extendsMarkdown

- Тип: `(md: Markdown, app: App) => void | Promise<void>`

- Подробности:

  Улучшения Markdown.

  Этот хук принимает функцию, которая получит экземпляр Markdown на основе [markdown-it](https://github.com/markdown-it/markdown-it) в своих аргументах.

  Этот хук можно использовать для добавления дополнительных плагинов markdown-it и кастомизации.

- Пример:

```ts
export default {
  extendsMarkdown: (md) => {
    md.use(plugin1)
    md.linkify.set({ fuzzyEmail: false })
  },
}
```

### extendsPageOptions

- Тип: `(options: PageOptions, app: App) => void | Promise<void>`

- Подробности:

  Расширение параметров страницы.

  Этот хук принимает функцию, которая получит параметры `createPage`.

  Этот хук можно использовать для изменения параметров страницы.

- Пример:

Установите шаблон постоянной ссылки для страниц в директории `_posts`:

```ts
export default {
  extendsPageOptions: (pageOptions, app) => {
    if (pageOptions.filePath?.startsWith(app.dir.source('_posts/'))) {
      pageOptions.frontmatter = pageOptions.frontmatter ?? {}
      pageOptions.frontmatter.permalinkPattern = '/:year/:month/:day/:slug.html'
    }
  },
}
```

- См. также:
  - [Node API > Страница > createPage](./node-api.md#createpage)

### extendsPage

- Тип: `(page: Page, app: App) => void | Promise<void>`

- Подробности:

  Расширение страницы.

  Этот хук принимает функцию, которая получит экземпляр `Page`.

  Этот хук можно использовать для добавления дополнительных свойств или изменения текущих свойств объекта `Page`.

  Обратите внимание, что изменения в `page.data` и `page.routeMeta` можно использовать в коде на стороне клиента.

- Пример:

```ts
export default {
  extendsPage: (page) => {
    page.foo = 'foo'
    page.data.bar = 'bar'
  },
}
```

В клиентском компоненте:

```ts
import { usePageData } from '@vuepress/client'

export default {
  setup() {
    const page = usePageData()
    console.log(page.value.bar) // bar
  },
}
```

- См. также:
  - [API клиента > usePageData](./client-api.md#usepagedata)
  - [Node API > Свойства страницы > data](./node-api.md#data)
  - [Node API > Свойства страницы > routeMeta](./node-api.md#routemeta)

## Lifecycle Hooks

### onInitialized

- Тип: `(app: App) => void | Promise<void>`

- Подробности:

  Этот хук будет вызываться после инициализации приложения VuePress.

### onPrepared

- Тип: `(app: App) => void | Promise<void>`

- Подробности:

  Этот хук будет вызываться после завершения подготовки приложения VuePress.

### onWatched

- Тип: `(app: App, watchers: Closable[], restart: () => Promise<void>) => void | Promise<void>`

- Подробности:

  Этот хук будет вызываться после того, как приложение VuePress запустит сервер разработки и проследит за изменением файлов.

  `watchers` — это массив наблюдателей за файлами. При изменении файла конфигурации команда dev будет перезапущена, и эти наблюдатели будут закрыты. Если вы добавляете новых наблюдателей в этот хук, вы должны поместить своих наблюдателей в массив `watchers`, чтобы их можно было корректно закрыть при перезапуске.

  `restart` — это метод перезапуска команды dev. При вызове этого метода массив `watchers` будет закрыт автоматически.

### onGenerated

- Тип: `(app: App) => void | Promise<void>`

- Подробности:

  Этот хук будет вызываться после того, как приложение VuePress сгенерирует статические файлы.
