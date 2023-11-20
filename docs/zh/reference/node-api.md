# Node API

<NpmBadge package="@vuepress/core" />

Node API 是由 [@vuepress/core](https://www.npmjs.com/package/@vuepress/core) 包提供的。它是 [vuepress](https://www.npmjs.com/package/vuepress) 包的依赖之一，当然你也可以单独安装它：

```bash
npm i -D @vuepress/core@next
```

## App

[插件 API](./plugin-api.md) 的所有 Hooks 中都可以获取到 App 实例。

`BuildApp` 和 `DevApp` 除了 [build](#build) 和 [dev](#dev) 方法外，拥有一样的属性和方法。

### createBuildApp

- 函数签名：

```ts
const createBuildApp: (config: AppConfig) => BuildApp
```

- 参数：

| 参数      | 类型         | 描述                      |
|-----------|-------------|---------------------------|
| config    | `AppConfig` | 创建 VuePress App 的选项。 |

- 详情：

  创建一个 Build 模式的 App 实例，用于构建静态文件。

- 示例：

```ts
const build = async () => {
  const app = createBuildApp({
    // ...配置项
  })

  // 初始化和准备
  await app.init()
  await app.prepare()

  // 构建
  await app.build()

  // 处理 onGenerated hook
  await app.pluginApi.hooks.onGenerated.process(app)
}
```

- 参考：
  - [Node API > App 方法 > build](#build)

### createDevApp

- 函数签名：

```ts
const createDevApp: (config: AppConfig) => DevApp
```

- 参数：

| 参数      | 类型         | 描述                      |
|-----------|-------------|---------------------------|
| config    | `AppConfig` | 创建 VuePress App 的选项。 |

- 详情：

  创建一个 Dev 模式的 App 实例，用于启动开发服务器。

- 示例：

```ts
const dev = async () => {
  const app = createDevApp({
    // ...配置项
  })

  // 初始化和准备
  await app.init()
  await app.prepare()

  // 启动开发服务器
  const closeDevServer = await app.dev()

  // 准备文件监听器
  const watchers = []

  // 重启开发服务器
  const restart = async () => {
    await Promise.all([
      // 关闭所有监听器
      ...watchers.map((item) => item.close()),
      // 关闭当前的开发服务器
      closeDevServer(),
    ])
    await dev()
  }

  // 处理 onWatched hook
  await app.pluginApi.hooks.onWatched.process(app, watchers, restart)
}
```

- 参考：
  - [Node API > App 方法 > dev](#dev)

## App 属性

### options

- 类型： `AppOptions`

- 详情：

  VuePress App 的配置项。

  这些配置项来自于 [createBuildApp](#createbuildapp) / [createDevApp](#createdevapp) 的 `config` 参数，但所有可选的字段都填充上了默认值。

### siteData

- 类型： `SiteData`

- 详情：

  由用户设置的站点数据，包含所有的 [站点配置](./config.md#站点配置) ，可以在客户端代码中使用。

### version

- 类型： `string`

- 详情：

  VuePress App 的版本，即 `@vuepress/core` 包的版本。

### env.isBuild

- 类型： `boolean`

- 详情：

  用于判断 App 是否运行在 Build 模式的环境标记，即当前 App 是否是 [BuildApp](#createbuildapp) 实例。

### env.isDev

- 类型： `boolean`

- 详情：

  用于判断 App 是否运行在 Dev 模式的环境标记，即当前 App 是否是 [DevApp](#createdevapp) 实例。

### env.isDebug

- 类型： `boolean`

- 详情：

  用于判断 App 是否开启 Debug 模式的环境标记。

### markdown

- 类型： `MarkdownIt`

- 详情：

  用于解析 Markdown 内容的 [markdown-it](https://github.com/markdown-it/markdown-it) 实例。

  它仅在 [onInitialized](./plugin-api.md#oninitialized) 以及之后的 Hooks 中才可用。

### pages

- 类型： `Page[]`

- 详情：

  [Page](#page) 对象数组。

  它仅在 [onInitialized](./plugin-api.md#oninitialized) 以及之后的 Hooks 中才可用。

## App 方法

### dir

- 工具函数：
  - `dir.cache()`： 解析至缓存目录
  - `dir.temp()`： 解析至临时文件目录
  - `dir.source()`： 解析至源文件目录
  - `dir.dest()`： 解析至输出目录
  - `dir.client()`： 解析至 `@vuepress/client` 目录
  - `dir.public()`： 解析至 Public 文件目录

- 函数签名：

```ts
type AppDirFunction = (...args: string[]) => string
```

- 详情：

  用于解析对应目录下的文件绝对路径的一些工具函数。

  如果你不传入任何参数，就会返回对应目录的绝对路径。

- 示例：

```ts
// 解析 `${sourceDir}/README.md` 文件的绝对路径
const homeSourceFile = app.dir.source('README.md')
```

### writeTemp

- 函数签名：

```ts
writeTemp(file: string, content: string): Promise<string>
```

- 参数：

| 参数      | 类型      | 描述                                      |
|-----------|----------|-------------------------------------------|
| file      | `string` | 要写入的临时文件的路径，相对于临时文件目录。 |
| content   | `string` | 要写入的临时文件路径的内容。                |

- 详情：

  用于写入临时文件的方法。

  写入的文件可以在客户端文件中通过 `@temp` 别名来引入。

- 示例：

```ts
export default {
  // 在 onPrepared hook 中写入临时文件
  async onPrepared() {
    await app.writeTemp('foo.js', 'export const foo = \'bar\'')
  }
}
```

```ts
// 在客户端文件中引入临时文件
import { foo } from '@temp/foo'
```

### init

- 函数签名：

```ts
init(): Promise<void>
```

- 详情：

  初始化 VuePress App 。

- 参考：
  - [深入 > 架构 > 核心流程与 Hooks](../advanced/architecture.md#核心流程与-hooks)

### prepare

- 函数签名：

```ts
prepare(): Promise<void>
```

- 详情：

  准备客户端临时文件。

- 参考：
  - [深入 > 架构 > 核心流程与 Hooks](../advanced/architecture.md#核心流程与-hooks)

### build

- 函数签名：

```ts
build(): Promise<void>
```

- 详情：

  生成静态站点文件。

  该方法仅在 [BuildApp](#createbuildapp) 中可用。

- 参考：
  - [深入 > 架构 > 核心流程与 Hooks](../advanced/architecture.md#核心流程与-hooks)

### dev

- 函数签名：

```ts
dev(): Promise<() => Promise<void>>
```

- 详情：

  启动开发服务器。

  该方法仅在 [DevApp](#createdevapp) 中可用。

- 参考：
  - [深入 > 架构 > 核心流程与 Hooks](../advanced/architecture.md#核心流程与-hooks)

## Page

### createPage

- 函数签名：

```ts
const createPage: (app: App, options: PageOptions) => Promise<Page>
```

- 参数：

| 参数      | 类型          | 描述                        |
|-----------|---------------|----------------------------|
| app       | `App`         | VuePress App 实例。        |
| options   | `PageOptions` | 创建 VuePress Page 的选项。 |

- 详情：

  创建一个 VuePress Page 对象。

- 示例：

```ts
import { createPage } from '@vuepress/core'

export default {
  // 在 onInitialized hook 中创建一个额外页面
  async onInitialized(app) {
    app.pages.push(
      await createPage(app, {
        path: '/foo.html',
        frontmatter: {
          layout: 'Layout',
        },
        content: `\
# 某个 Page

你好，世界。
`,
      })
    )
  },
}
```

- 参考：
  - [Node API > App 属性 > pages](#pages)
  - [Cookbook > 添加额外页面](../advanced/cookbook/adding-extra-pages.md)

## Page 属性

### key

- 类型： `string`

- 详情：

  该 Page 的标识。

  Page Key 会被用作页面路由的 [name](https://router.vuejs.org/api/#name-2)。

- 参考：
  - [Built-in Components > Content](./components.md#content)

### path

- 类型： `string`

- 详情：

  该 Page 的路由路径。

- 参考：
  - [指南 > 页面 > 路由](../guide/page.md#路由)
  - [Node API > Page 属性 > pathInferred](#pathinferred)

### title

- 类型： `string`

- 详情：

  该 Page 的标题。

- 参考：
  - [Frontmatter > title](./frontmatter.md#title)

### lang

- 类型： `string`

- 详情：

  该 Page 的语言。

- 示例：
  - `'en-US'`
  - `'zh-CN'`

- 参考：
  - [Frontmatter > lang](./frontmatter.md#title)

### frontmatter

- 类型： `PageFrontmatter`

- 详情：

  该 Page 的 Frontmatter 。

- 参考：
  - [Frontmatter](./frontmatter.md)

### headers

- 类型： `PageHeader[]`

```ts
interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}
```

- 详情：

  该 Page 的小标题。

- 参考：
  - [配置 > markdown.headers](./config.md#markdown-headers)

### data

- 类型： `PageData`

```ts
interface PageData {
  key: string
  path: string
  title: string
  lang: string
  frontmatter: PageFrontmatter
  headers: PageHeader[]
}
```

- 详情：

  该 Page 的数据。

  Page 数据可以在客户端代码中使用。

- 参考：
  - [客户端 API > usePageData](./client-api.md#usepagedata)
  - [插件 API > extendsPage](./plugin-api.md#extendspage)

### content

- 类型： `string`

- 详情：

  该 Page 的未经渲染的原始内容。

### contentRendered

- 类型： `string`

- 详情：

  该 Page 的渲染后的内容。

### date

- 类型： `string`

- 详情：

  该 Page 的日期，遵从 'yyyy-MM-dd' 格式。

- 示例：
  - `'0000-00-00'`
  - `'2021-08-16`'

- 参考：
  - [Frontmatter > date](./frontmatter.md#date)

### deps

- 类型： `string[]`

- 详情：

  该 Page 的依赖。

  举例来说，如果在页面中导入了代码片段，那么被导入文件的绝对路径就会被添加到 `deps` 中。

- 参考：
  - [配置 > markdown.importCode](./config.md#markdown-importcode)

### links

- 类型： `MarkdownLink[]`

```ts
interface MarkdownLink {
  raw: string
  relative: string
  absolute: string
}
```

- 详情：

  该 Page 内容中包含的链接。


### markdownEnv

- 类型： `Record<string, unknown>`

- 详情：

  在使用 markdown-it 解析 Markdown 内容时的 `env` 对象。

  一些 markdown-it 插件可能会在这个对象中存储一些额外的信息，你可以使用它们来进行高级定制化。

  需要注意的是，其他的一些 Page 属性其实也是从 `env` 对象中获取到的，但是我们已经把这些属性从 `page.markdownEnv` 中移除掉了。

- 参考：
  - [markdown-it > API Documentation > MarkdownIt > parse](https://markdown-it.github.io/markdown-it/#MarkdownIt.parse)

### pathInferred

- 类型： `string | null`

- 详情：

  该 Page 根据文件路径推断出的路由路径。

  默认情况下，路由路径是根据 Markdown 源文件的相对文件路径推断出来的。然而，用户可能会显式指定页面路由，比如通过 [permalink](#permalink) 来指定该页面最终使用的路由路径。因此我们在 Page 属性中保留推断出来的路径，以便于你在某些情况下可能会用到它。

  如果该 Page 不是来自于 Markdown 源文件，那么该属性会为 `null` 。

- 示例：
  - `'/'`
  - `'/foo.html'`

- 参考：
  - [指南 > 页面 > 路由](../guide/page.md#路由)
  - [Node API > Page 属性 > path](#path)

### pathLocale

- 类型： `string`

- 详情：

  该 Page 路由路径的 Locale 前缀。

  它是根据页面的 Markdown 源文件相对路径、以及用户配置的 `locales` 的键推断得到的。

- 示例：
  - `'/'`
  - `'/en/'`
  - `'/zh/'`

- 参考：
  - [配置 > locales](./config.md#locales)

### permalink

- 类型： `string | null`

- 详情：

  该 Page 的永久链接。

- 参考：
  - [Frontmatter > permalink](./frontmatter.md#permalink)
  - [Frontmatter > permalinkPattern](./frontmatter.md#permalinkpattern)


### meta

- 类型： `Record<string, unknown>`

- 详情：

  附加到 vue-router 路由记录上的额外数据。

- 参考：
  - [Frontmatter > meta](./frontmatter.md#meta)
  - [vue-router > API 参考 > RouteRecordRaw > meta](https://router.vuejs.org/zh/api/#meta)

::: tip Route Meta 和 Page Data 的区别是什么？
[Route Meta](#meta) 和 [Page Data](#data) 都可以在客户端代码中使用。然而， Route Meta 是附加在路由记录上的，因此当用户进入你的站点时，所有页面的 Route Meta 都会立即被加载。相比之下， Page Data 是存储在单独的文件中的，只有在用户进入对应页面时才会被加载。

因此，不建议在 Route Meta 中存储大量的信息，否则在站点有很多页面时，将会影响站点的初始加载速度。
:::

### sfcBlocks

- 类型： `MarkdownSfcBlocks`

- 详情：

  该 Page 中提取出的 Vue SFC Blocks 。

- 参考：
  - [配置 > markdown.sfc](./config.md#markdown-sfc)

### slug

- 类型： `string`

- 详情：

  该 Page 的 Slug 。

  它是根据页面的 Markdown 源文件的文件名推断得到的。

### filePath

- 类型： `string | null`

- 详情：

  该 Page 的 Markdown 源文件的绝对路径。

  如果该 Page 不是来自于 Markdown 源文件，那么该属性会为 `null` 。

### filePathRelative

- 类型： `string | null`

- 详情：

  该 Page 的 Markdown 源文件的相对路径。

  如果该 Page 不是来自于 Markdown 源文件，那么该属性会为 `null` 。
