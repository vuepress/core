# Node API

<NpmBadge package="@vuepress/core" />

Node API is provided by [@vuepress/core](https://www.npmjs.com/package/@vuepress/core) package. It is a dependency of the [vuepress](https://www.npmjs.com/package/vuepress) package, and you can also install it separately:

```bash
npm i -D @vuepress/core@next
```

## App

The app instance is available in all hooks of [Plugin API](./plugin-api.md).

The `BuildApp` and `DevApp` share almost the same properties and methods, except [build](#build) and [dev](#dev) method.

### createBuildApp

- Signature:

```ts
const createBuildApp: (config: AppConfig) => BuildApp;
```

- Parameters:

| Parameter | Type        | Description                      |
|-----------|-------------|----------------------------------|
| config    | `AppConfig` | Config to create a VuePress app. |

- Details:

  Create a build mode app instance, which is used for building static files.

- Example:

```ts
const build = async () => {
  const app = createBuildApp({
    // ...options
  })

  // initialize and prepare
  await app.init()
  await app.prepare()

  // build
  await app.build()

  // process onGenerated hook
  await app.pluginApi.hooks.onGenerated.process(app)
}
```

- Also see:
  - [Node API > App Methods > build](#build)

### createDevApp

- Signature:

```ts
const createDevApp: (config: AppConfig) => DevApp
```

- Parameters:

| Parameter | Type        | Description                      |
|-----------|-------------|----------------------------------|
| config    | `AppConfig` | Config to create a VuePress app. |

- Details:

  Create a dev mode app instance, which is used for starting a dev server.

- Example:

```ts
const dev = async () => {
  const app = createDevApp({
    // ...options
  })

  // initialize and prepare
  await app.init()
  await app.prepare()

  // start dev server
  const closeDevServer = await app.dev()

  // set up file watchers
  const watchers = []

  // restart dev server
  const restart = async () => {
    await Promise.all([
      // close all watchers
      ...watchers.map((item) => item.close()),
      // close current dev server
      closeDevServer(),
    ])
    await dev()
  }

  // process onWatched hook
  await app.pluginApi.hooks.onWatched.process(app, watchers, restart)
}
```

- Also see:
  - [Node API > App Methods > dev](#dev)

## App Properties

### options

- Type: `AppOptions`

- Details:

  Options of VuePress app.

  The options come from the `config` argument in [createBuildApp](#createbuildapp) / [createDevApp](#createdevapp), while all optional fields will be filled with a default value.

### siteData

- Type: `SiteData`

- Details:

  Site data that set by user, including all the [site config](./config.md#site-config), which will be used in client side.

### version

- Type: `string`

- Details:

  Version of VuePress app, i.e. version of `@vuepress/core` package.

### env.isBuild

- Type: `boolean`

- Details:

  Environment flag used to identify whether the app is running in build mode, i.e. whether a [BuildApp](#createbuildapp) instance.

### env.isDev

- Type: `boolean`

- Details:

  Environment flag used to identify whether the app is running in dev mode, i.e. whether a [DevApp](#createdevapp) instance.

### env.isDebug

- Type: `boolean`

- Details:

  Environment flag used to identify whether the debug mode is enabled.

### markdown

- Type: `MarkdownIt`

- Details:

  The [markdown-it](https://github.com/markdown-it/markdown-it) instance used for parsing markdown content.

  It is only available in and after [onInitialized](./plugin-api.md#oninitialized) hook.

### layouts

- Type: `Record<string, string>`

- Details:

  The layout components map, of which the key is the layout name, the value is the absolute file path of the layout component.

  It is only available in and after [onInitialized](./plugin-api.md#oninitialized) hook.

### pages

- Type: `Page[]`

- Details:

  The [Page](#page) object array.

  It is only available in and after [onInitialized](./plugin-api.md#oninitialized) hook.

## App Methods

### dir

- Utils:
  - `dir.cache()`: resolve to cache directory
  - `dir.temp()`: resolve to temp directory
  - `dir.source()`: resolve to source directory
  - `dir.dest()`: resolve to dest directory
  - `dir.client()`: resolve to `@vuepress/client` directory
  - `dir.public()`: resolve to public directory

- Signature:

```ts
type AppDirFunction = (...args: string[]) => string
```

- Details:

  Utils to resolve the absolute file path in corresponding directory.

  If you don't provide any arguments, it will return the absolute path of the directory.

- Example:

```ts
// resolve the absolute file path of the `${sourceDir}/README.md`
const homeSourceFile = app.dir.source('README.md')
```

### writeTemp

- Signature:

```ts
writeTemp(file: string, content: string): Promise<string>
```

- Parameters:

| Parameter | Type     | Description                                                                   |
|-----------|----------|-------------------------------------------------------------------------------|
| file      | `string` | Filepath of the temp file that going to be wrote. Relative to temp directory. |
| content   | `string` | Content of the temp file that going to be wrote.                              |

- Details:

  A method to write temp file.

  The written file could be imported via `@temp` alias in client files.

- Example:

```js
module.exports = {
  // write temp file in onPrepared hook
  async onPrepared() {
    await app.writeTemp('foo.js', 'export const foo = \'bar\'')
  }
}
```

```ts
// import temp file in client code
import { foo } from '@temp/foo'
```

### init

- Signature:

```ts
init(): Promise<void>
```

- Details:

  Initialize VuePress app.

- Also see:
  - [Advanced > Architecture > Core Process and Hooks](../advanced/architecture.md#core-process-and-hooks)

### prepare

- Signature:

```ts
prepare(): Promise<void>
```

- Details:

  Prepare client temp files.

- Also see:
  - [Advanced > Architecture > Core Process and Hooks](../advanced/architecture.md#core-process-and-hooks)

### build

- Signature:

```ts
build(): Promise<void>
```

- Details:

  Generate static site files.

  This method is only available in `BuildApp`.

- Also see:
  - [Node API > App > createBuildApp](#createbuildapp)
  - [Advanced > Architecture > Core Process and Hooks](../advanced/architecture.md#core-process-and-hooks)

### dev

- Signature:

```ts
dev(): Promise<() => Promise<void>>
```

- Details:

  Start dev server.

  This method is only available in `DevApp`.

- Also see:
  - [Node API > App > createDevApp](#createdevapp)
  - [Advanced > Architecture > Core Process and Hooks](../advanced/architecture.md#core-process-and-hooks)

## Page

### createPage

- Signature:

```ts
const createPage: (app: App, options: PageOptions) => Promise<Page>
```

- Parameters:

| Parameter | Type          | Description                       |
|-----------|---------------|-----------------------------------|
| app       | `App`         | The VuePress app instance.        |
| options   | `PageOptions` | Options to create VuePress page.  |

- Details:

  Create a VuePress page object.

- Example:

```ts
const { createPage } = require('@vuepress/core')

module.exports = {
  // create an extra page in onInitialized hook
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
  }
}
```

- Also see:
  - [Node API > App Properties > pages](#pages)
  - [Cookbook > Adding Extra Pages](../advanced/cookbook/adding-extra-pages.md)

## Page Properties

### key

- Type: `string`

- Details:

  Identifier of the page.

  The page key would be used as the [name](https://next.router.vuejs.org/api/#name-2) of the page route.

- Also see:
  - [Built-in Components > Content](./components.md#content)

### path

- Type: `string`

- Details:

  Route path of the page.

- Also see:
  - [Guide > Page > Routing](../guide/page.md#routing)
  - [Node API > Page Properties > pathInferred](#pathinferred)

### title

- Type: `string`

- Details:

  Title of the page.

- Also see:
  - [Frontmatter > title](./frontmatter.md#title)

### lang

- Type: `string`

- Details:

  Language of the page.

- Example:
  - `'en-US'`
  - `'zh-CN'`

- Also see:
  - [Frontmatter > lang](./frontmatter.md#title)

### frontmatter

- Type: `PageFrontmatter`

- Details:

  Frontmatter of the page.

- Also see:
  - [Frontmatter](./frontmatter.md)

### excerpt

- Type: `string`

- Details:

  Excerpt of the page.

  If a Markdown file contains a `<!-- more -->` comment, any content above the comment will be extracted and rendered as excerpt.

  If you are building a custom theme for blogging, it would be helpful to generate a post list with excerpts.

- Example:

```md
Lines above `<!-- more -->` comment would be used as excerpt.

It's recommended to wrap the comment with empty lines to avoid rendering issue.

<!-- more -->

Lines below `<!-- more -->` comment would not be used as excerpt.
```

### headers

- Type: `PageHeader[]`

```ts
interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}
```

- Details:

  Headers of the page.

- Also see:
  - [Config > markdown.extractHeaders](./config.md#markdown-extractheaders)

### data

- Type: `PageData`

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

- Details:

  Data of the page.

  Page data would be available in client side.

- Also see:
  - [Client API > usePageData](./client-api.md#usepagedata)
  - [Plugin API > extendsPage](./plugin-api.md#extendspage)

### content

- Type: `string`

- Details:

  Raw content of the page.

### contentRendered

- Type: `string`

- Details:

  Rendered content of the page.

### date

- Type: `string`

- Details:

  Date of the page, in 'yyyy-MM-dd' format.

- Example:
  - `'0000-00-00'`
  - `'2021-08-16`'

- Also see:
  - [Frontmatter > date](./frontmatter.md#date)

### deps

- Type: `string[]`

- Details:

  Dependencies of the page.

  For example, if users import code snippet in the page, the absolute file path of the imported file would be added to `deps`.

- Also see:
  - [Config > markdown.importCode](./config.md#markdown-importcode)

### hoistedTags

- Type: `string[]`

- Details:

  Hoisted tags of the page.

- Also see:
  - [Config > markdown.hoistTags](./config.md#markdown-hoisttags)

### links

- Type: `MarkdownLink[]`

```ts
interface MarkdownLink {
  raw: string
  relative: string
  absolute: string
}
```

- Details:

  Links of the page.

### pathInferred

- Type: `string | null`

- Details:

  Route path of the page that inferred from file path.

  By default, the route path is inferred from the relative file path of the Markdown source file. However, users may explicitly set the route path, e.g. [permalink](#permalink), which would be used as the final route path of the page. So we keep the inferred path as a page property in case you may need it.

  It would be `null` if the page does not come from a Markdown source file.

- Example:
  - `'/'`
  - `'/foo.html'`

- Also see:
  - [Guide > Page > Routing](../guide/page.md#routing)
  - [Node API > Page Properties > path](#path)

### pathLocale

- Type: `string`

- Details:

  Locale prefix of the page route path.

  It is inferred from the relative file path of the Markdown source file and the key of `locales` option in user config.

- Example:
  - `'/'`
  - `'/en/'`
  - `'/zh/'`

- Also see:
  - [Config > locales](./config.md#locales)

### permalink

- Type: `string | null`

- Details:

  Permalink of the page.

- Also see:
  - [Frontmatter > permalink](./frontmatter.md#permalink)
  - [Frontmatter > permalinkPattern](./frontmatter.md#permalinkpattern)

### routeMeta

- Type: `Record<string, unknown>`

- Details:

  Custom data to be attached to the route record of vue-router.

- Also see:
  - [Frontmatter > routeMeta](./frontmatter.md#routemeta)
  - [vue-router > API Reference > RouteRecordRaw > meta](https://next.router.vuejs.org/api/#meta)

::: tip What's the difference between route meta and page data?
Both [route meta](#routemeta) and [page data](#data) is available in client side. However, route meta is attached to the route record, so the route meta of all pages would be loaded at once when users enter your site. In the contrast, page data is saved in separated files, which would be loaded only when users enter the corresponding page.

Therefore, it's not recommended to store large amounts of info into route meta, otherwise the initial loading speed will be affected a lot when your site has a large number of pages.
:::

### slug

- Type: `string`

- Details:

  Slug of the page.

  It is inferred from the filename of the Markdown source file.

### filePath

- Type: `string | null`

- Details:

  Absolute path of the Markdown source file of the page.

  It would be `null` if the page does not come from a Markdown source file.

### filePathRelative

- Type: `string | null`

- Details:

  Relative path of the Markdown source file of the page.

  It would be `null` if the page does not come from a Markdown source file.
