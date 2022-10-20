# Node API

<NpmBadge package="@vuepress/core" />

Node API предоставляется пакетом [@vuepress/core](https://www.npmjs.com/package/@vuepress/core). Это зависимость от пакета [vuepress](https://www.npmjs.com/package/vuepress), и вы также можете установить его отдельно:

```bash
npm i -D @vuepress/core@next
```

## Приложение

Экземпляр приложения доступен во всех хуках [API плагинов](./plugin-api.md).

`BuildApp` и `DevApp` имеют почти одинаковые свойства и методы, за исключением методов [build](#build) и [dev](#dev).

### createBuildApp

- Сигнатура:

```ts
const createBuildApp: (config: AppConfig) => BuildApp
```

- Параметры:

| Параметр | Тип         | Описание                                       |
| -------- | ----------- | ---------------------------------------------- |
| config   | `AppConfig` | Конфигурация для создания приложения VuePress. |

- Подробности:

  Создайте экземпляр приложения в режиме сборки, который используется для создания статических файлов.

- Пример:

```ts
const build = async () => {
  const app = createBuildApp({
    // ...настройки
  })

  // инициализировать и подготовить
  await app.init()
  await app.prepare()

  // собрать
  await app.build()

  // обработать хук onGenerated
  await app.pluginApi.hooks.onGenerated.process(app)
}
```

- См. также:
  - [Node API > Методы приложения > build](#build)

### createDevApp

- Сигнатура:

```ts
const createDevApp: (config: AppConfig) => DevApp
```

- Параметры:

| Параметр | Тип         | Описание                                       |
| -------- | ----------- | ---------------------------------------------- |
| config   | `AppConfig` | Конфигурация для создания приложения VuePress. |

- Подробности:

  Создайте экземпляр приложения режима разработки, который используется для запуска сервера разработки.

- Пример:

```ts
const dev = async () => {
  const app = createDevApp({
    // ...настройки
  })

  // инициализировать и подготовить
  await app.init()
  await app.prepare()

  // запустить сервер разработки
  const closeDevServer = await app.dev()

  // настроить наблюдателей за файлами
  const watchers = []

  // перезагрузить сервер разработки
  const restart = async () => {
    await Promise.all([
      // закрыть всех наблюдателей
      ...watchers.map((item) => item.close()),
      // закрыть текущий сервер разработки
      closeDevServer(),
    ])
    await dev()
  }

  // обработать хук onWatched
  await app.pluginApi.hooks.onWatched.process(app, watchers, restart)
}
```

- См. также:
  - [Node API > Методы приложения > dev](#dev)

## Свойства приложения

### options

- Тип: `AppOptions`

- Подробности:

  Параметры приложения VuePress.

  Параметры берутся из аргумента `config` в [createBuildApp](#createbuildapp) / [createDevApp](#createdevapp), а все необязательные поля будут заполнены значениями по умолчанию.

### siteData

- Тип: `SiteData`

- Подробности:

  Данные сайта, установленные пользователем, включая всю [конфигурацию сайта](./config.md#site-config), которые будут использоваться на стороне клиента.

### version

- Тип: `string`

- Подробности:

  Версия приложения VuePress, то есть версия пакета `@vuepress/core`.

### env.isBuild

- Тип: `boolean`

- Подробности:

  Флаг среды окружения, используемый для определения того, работает ли приложение в режиме сборки, т. е. является ли экземпляром [BuildApp](#createbuildapp).

### env.isDev

- Тип: `boolean`

- Подробности:

  Флаг среды окружения, используемый для определения того, работает ли приложение в режиме разработки, т. е. является ли экземпляром [DevApp](#createdevapp).

### env.isDebug

- Тип: `boolean`

- Подробности:

  Флаг среды окружения, используемый для определения того, включён ли режим отладки.

### markdown

- Тип: `MarkdownIt`

- Подробности:

  Экземпляр [markdown-it](https://github.com/markdown-it/markdown-it), используемый для парсинга markdown контента.

  Он доступен только в хуке [onInitialized](./plugin-api.md#oninitialized) и после него.

### pages

- Тип: `Page[]`

- Подробности:

  Массив объектов [Page](#page).

  Он доступен только в хуке [onInitialized](./plugin-api.md#oninitialized) и после него.

## Методы приложения

### dir

- Утилиты:

  - `dir.cache()`: получить директорию с кэшем
  - `dir.temp()`: получить директорию с временными файлами
  - `dir.source()`: получить директорию с исходными файлами
  - `dir.dest()`: получить директорию билда
  - `dir.client()`: получить директорию `@vuepress/client`
  - `dir.public()`: получить public директорию

- Сигнатура:

```ts
type AppDirFunction = (...args: string[]) => string
```

- Подробности:

  Утилиты для разрешения абсолютного пути к файлу в соответствующем каталоге.

  Если вы не предоставите никаких аргументов, он вернет абсолютный путь к каталогу.

- Пример:

```ts
// получить абсолютный путь файла `${sourceDir}/README.md`
const homeSourceFile = app.dir.source('README.md')
```

### writeTemp

- Сигнатура:

```ts
writeTemp(file: string, content: string): Promise<string>
```

- Параметры:

| Параметр | Тип      | Описание                                                                          |
| -------- | -------- | --------------------------------------------------------------------------------- |
| file     | `string` | Путь к временному файлу, который будет записан. Относительно временного каталога. |
| content  | `string` | Содержимое временного файла, который будет записано.                              |

- Подробности:

  Способ записи временного файла.

  Записанный файл может быть импортирован через алиас `@temp` в клиентских файлах.

- Пример:

```ts
export default {
  // записать временный файл в хукe onPrepared
  async onPrepared() {
    await app.writeTemp('foo.js', "export const foo = 'bar'")
  },
}
```

```ts
// импортировать временный файл в код клиента
import { foo } from '@temp/foo'
```

### init

- Сигнатура:

```ts
init(): Promise<void>
```

- Подробности:

  Инициализирует приложение VuePress.

- См. также:
  - [Дополнительно > Архитектура > Основные процессы и хуки](../advanced/architecture.md#core-process-and-hooks)

### prepare

- Сигнатура:

```ts
prepare(): Promise<void>
```

- Подробности:

  Готовит временные файлы клиента.

- См. также:
  - [Дополнительно > Архитектура > Основные процессы и хуки](../advanced/architecture.md#core-process-and-hooks)

### build

- Сигнатура:

```ts
build(): Promise<void>
```

- Подробности:

  Генерирует статические файлы сайта.

  Этот метод доступен только в `BuildApp`.

- См. также:
  - [Node API > Приложение > createBuildApp](#createbuildapp)
  - [Дополнительно > Архитектура > Основные процессы и хуки](../advanced/architecture.md#core-process-and-hooks)

### dev

- Сигнатура:

```ts
dev(): Promise<() => Promise<void>>
```

- Подробности:

  Запускает сервер разработки.

  Этот метод доступен только в `DevApp`.

- См. также:
  - [Node API > Приложение > createDevApp](#createdevapp)
  - [Дополнительно > Архитектура > Основные процессы и хуки](../advanced/architecture.md#core-process-and-hooks)

## Страница

### createPage

- Сигнатура:

```ts
const createPage: (app: App, options: PageOptions) => Promise<Page>
```

- Параметры:

| Параметр | Тип           | Описание                                  |
| -------- | ------------- | ----------------------------------------- |
| app      | `App`         | Экземпляр приложения VuePress.            |
| options  | `PageOptions` | Параметры для создания страницы VuePress. |

- Подробности:

  Создаёт объект страницы VuePress.

- Пример:

```ts
import { createPage } from '@vuepress/core'

export default {
  // создать дополнительную страницу в хуке onInitialized
  async onInitialized(app) {
    app.pages.push(
      await createPage(app, {
        path: '/foo.html',
        frontmatter: {
          layout: 'Layout',
        },
        content: `\
# Foo Page

Hello, world.
`,
      })
    )
  },
}
```

- См. также:
  - [Node API > Свойства приложения > pages](#pages)
  - [Рецепты > Создание дополнительных страниц](../advanced/cookbook/adding-extra-pages.md)

## Page Properties

### key

- Тип: `string`

- Подробности:

  Идентификатор страницы.

  Ключ страницы будет использоваться как [name](https://router.vuejs.org/api/#name-2) роута страницы.

- См. также:
  - [Built-in Components > Content](./components.md#content)

### path

- Тип: `string`

- Подробности:

  Путь страницы.

- См. также:
  - [Руководство > Страница > Роутинг](../guide/page.md#роутинг)
  - [Node API > Свойства страницы > pathInferred](#pathinferred)

### title

- Тип: `string`

- Подробности:

  Заголовок страницы.

- См. также:
  - [Frontmatter > title](./frontmatter.md#title)

### lang

- Тип: `string`

- Подробности:

  Язык страницы.

- Пример:

  - `'en-US'`
  - `'ru-RU'`

- См. также:
  - [Frontmatter > lang](./frontmatter.md#title)

### frontmatter

- Тип: `PageFrontmatter`

- Подробности:

  Frontmatter страницы.

- См. также:
  - [Frontmatter](./frontmatter.md)

### excerpt

- Тип: `string`

- Подробности:

  Отрывок страницы.

  Если файл Markdown содержит комментарий `<!-- more -->`, любое содержимое над комментарием будет извлечено и отображено как отрывок.

  Если вы создаёте собственную тему для ведения блога, было бы полезно создать список сообщений с выдержками.

- Пример:

```md
Строки выше комментария `<!-- more -->` будут использоваться как выдержка.

Рекомендуется заключать комментарий в пустые строки, чтобы избежать проблем с отображением.

<!-- more -->

Строки после комментария `<!-- more -->` не будут использоваться в качестве отрывка.
```

### headers

- Тип: `PageHeader[]`

```ts
interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}
```

- Подробности:

  Заголовки страницы.

- См. также:
  - [Config > markdown.headers](./config.md#markdown-headers)

### data

- Тип: `PageData`

```ts
interface PageData {
  key: string
  path: string
  title: string
  lang: string
  frontmatter: PageFrontmatter
  excerpt: string
  headers: PageHeader[]
}
```

- Подробности:

  Данные страницы.

  Данные страницы будут доступны на стороне клиента.

- См. также:
  - [API клиента > usePageData](./client-api.md#usepagedata)
  - [API плагинов > extendsPage](./plugin-api.md#extendspage)

### content

- Тип: `string`

- Подробности:

  Необработанное содержимое страницы.

### contentRendered

- Тип: `string`

- Подробности:

  Отображенное содержимое страницы.

### date

- Тип: `string`

- Подробности:

  Дата страницы в формате 'yyyy-MM-dd'.

- Пример:

  - `'0000-00-00'`
  - `'2021-08-16`'

- См. также:
  - [Frontmatter > date](./frontmatter.md#date)

### deps

- Тип: `string[]`

- Подробности:

  Зависимости страницы.

  Например, если пользователи импортируют фрагмент кода на страницу, абсолютный путь к импортированному файлу будет добавлен к `deps`.

- См. также:
  - [Config > markdown.importCode](./config.md#markdown-importcode)

### links

- Тип: `MarkdownLink[]`

```ts
interface MarkdownLink {
  raw: string
  relative: string
  absolute: string
}
```

- Подробности:

  Ссылки страницы..

### pathInferred

- Тип: `string | null`

- Подробности:

  Роут страницы, полученный из пути к файлу.

  По умолчанию роут выводится из относительного пути исходного файла Markdown. Однако пользователи могут явно указать роут, например, [постоянная ссылка](#permalink), которая будет использоваться в качестве конечного урла страницы. Поэтому мы сохраняем предполагаемый путь как свойство страницы на случай, если он вам понадобится.

  Значение по умолчанию `null`, если страница не исходит из исходного файла Markdown.

- Пример:

  - `'/'`
  - `'/foo.html'`

- См. также:
  - [Руководство > Страница > Роутинг](../guide/page.md#routing)
  - [Node API > Свойства страницы > path](#path)

### pathLocale

- Тип: `string`

- Подробности:

  Префикс локали роута страницы.

  Получается из относительного пути к исходному файлу Markdown и ключа опции `locales` в конфигурации пользователя.

- Пример:

  - `'/'`
  - `'/en/'`
  - `'/zh/'`

- См. также:
  - [Конфигурация > locales](./config.md#locales)

### permalink

- Тип: `string | null`

- Подробности:

  Постоянная ссылка страницы.

- См. также:
  - [Frontmatter > permalink](./frontmatter.md#permalink)
  - [Frontmatter > permalinkPattern](./frontmatter.md#permalinkpattern)

### routeMeta

- Тип: `Record<string, unknown>`

- Подробности:

  Пользовательские данные, которые будут добавлены к записи роута во vue-router.

- См. также:
  - [Frontmatter > routeMeta](./frontmatter.md#routemeta)
  - [vue-router > API Reference > RouteRecordRaw > meta](https://router.vuejs.org/api/#meta)

::: tip В чем разница между метаданными роута и данными страницы?
На стороне клиента доступны как [метаданные маршрута](#routemeta), так и [данные страницы](#data). Однако метаданные маршрута добавляются к записи маршрута, поэтому метаданные маршрута всех страниц будут загружаться одновременно, когда пользователи заходят на ваш сайт. Напротив, данные страницы сохраняются в отдельных файлах, которые будут загружаться только тогда, когда пользователи переходят на соответствующую страницу.

Поэтому не рекомендуется хранить большие объемы информации в метаданных маршрута, иначе начальная скорость загрузки сильно пострадает, если на вашем сайте будет большое количество страниц.
:::

### sfcBlocks

- Тип: `MarkdownSfcBlocks`

- Подробности:

  Извлеченные блоки vue SFC страницы.

- См. также:
  - [Config > markdown.sfc](./config.md#markdown-sfc)

### slug

- Тип: `string`

- Подробности:

  Slug для текущей страницы.

  Выводится из имени файла исходного файла Markdown страницы.

### filePath

- Тип: `string | null`

- Подробности:

  Абсолютный путь к исходному файлу Markdown страницы.

  Будет иметь значение `null`, если страница не исходит из исходного файла Markdown.

### filePathRelative

- Тип: `string | null`

- Подробности:

  Относительный путь к исходному файлу страницы в формате Markdown.

  Будет иметь значение `null`, если страница не исходит из исходного файла Markdown.
