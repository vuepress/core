# 插件 API

<NpmBadge package="@vuepress/core" />

插件 API 是由 [@vuepress/core](https://www.npmjs.com/package/@vuepress/core) 包支持的。你可以查看 [Node API](./node-api.md) 来了解如何使用插件 Hooks 中的 VuePress App 实例。

## 概览

插件需要在初始化之前使用。基础配置项会在使用插件时立即被处理：

- [name](#name)
- [multiple](#multiple)

下列 Hooks 会在初始化 App 时处理：

- [extendsMarkdownOptions](#extendsmarkdownoptions)
- [extendsMarkdown](#extendsmarkdown)
- [extendsPageOptions](#extendspageoptions)
- [extendsPage](#extendspage)
- [onInitialized](#oninitialized)

下列 Hooks 会在准备文件时处理：

- [clientConfigFile](#clientconfigfile)
- [onPrepared](#onprepared)

下列 Hooks 会在 dev / build 时处理：

- [extendsBundlerOptions](#extendsbundleroptions)
- [alias](#alias)
- [define](#define)
- [onWatched](#onwatched)
- [onGenerated](#ongenerated)

> 查看 [深入 > 架构 > 核心流程与 Hooks](../advanced/architecture.md#核心流程与-hooks) 来更好地理解该流程。

## 基础配置项

### name

- 类型： `string`

- 详情：

  插件的名称。

  它会被用来识别插件，以避免多次使用同一个插件，因此应确保你的插件名称是独一无二的。

  它应遵从如下命名约定：

  - 非 Scoped: `vuepress-plugin-foo`
  - Scoped: `@org/vuepress-plugin-foo`

- 参考：
  - [插件 API > multiple](#multiple)

### multiple

- 类型： `boolean`

- 默认值： `false`

- 详情：

  插件是否能够被多次使用。

  如果设置为 `false` ，当有相同名称的插件被使用时，先使用的会被后使用的替换掉。

  如果设置为 `true` ，相同名称的插件可以被多次使用且不会被替换。

- 参考：
  - [插件 API > name](#name)

## 开发 Hooks

### alias

- 类型： `Record<string, any> | ((app: App) => Record<string, any>)`

- 详情：

  定义路径别名。

  该 Hook 接收一个对象，或者一个返回对象的函数。

- 示例：

```js
export default {
  alias: {
    '@alias': path.resolve(__dirname, './path/to/alias'),
  },
}
```

### clientConfigFile

- 类型： `string | ((app: App) => string | Promise<string>)`

- 详情：

  客户端配置文件路径。

  该 Hook 接收文件绝对路径，或者一个返回路径的函数。

- 示例：

```js
const { path } = require('@vuepress/utils')

export default {
  clientConfigFile: path.resolve(
    __dirname,
    './path/to/clientConfig.js'
  ),
}
```

- 参考：
  - [客户端 API > defineClientConfig](./client-api.md#defineclientconfig)
  - [深入 > Cookbook > 客户端配置的使用方法](../advanced/cookbook/usage-of-client-config.md)

### define

- 类型： `Record<string, any> | ((app: App) => Record<string, any>)`

- 详情：

  定义全局常量。

  该 Hook 接收一个对象，或者一个返回对象的函数。

  它可以被用于向客户端文件传递变量。注意这里的值都会自动被 `JSON.stringify()` 处理。

- 示例：

```js
export default {
  define: {
    __GLOBAL_BOOLEAN__: true,
    __GLOBAL_STRING__: 'foobar',
    __GLOBAL_OBJECT__: { foo: 'bar' },
  },
}
```

### extendsBundlerOptions

- 类型： `(options: BundlerOptions, app: App) => void | Promise<void>`

- 详情：

  Bundler 配置项扩展。

  该 Hook 接收一个函数，在参数中会收到 Bundler 配置项。

  该 Hook 可以用于修改 Bundler 配置项。

  你可以通过 `app.options.bundler.name` 判断用户当前使用的 Bundler。

- 示例：

添加默认的 [app.compilerOptions.isCustomElement](https://vuejs.org/api/application.html#app-config-compileroptions) 配置：

```js
export default {
  extendsBundlerOptions: (bundlerOptions, app) => {
    // 修改 @vuepress/bundler-vite 的配置项
    if (app.options.bundler.name === '@vuepress/bundler-vite') {
      bundlerOptions.vuePluginOptions ??= {}
      bundlerOptions.vuePluginOptions.template ??= {}
      bundlerOptions.vuePluginOptions.template.compilerOptions ??= {}
      const isCustomElement = bundlerOptions.vuePluginOptions.template.compilerOptions.isCustomElement
      bundlerOptions.vuePluginOptions.template.compilerOptions.isCustomElement = (tag) => {
        if (isCustomElement?.(tag)) return true
        if (tag === 'my-custom-element') return true
      }
    }

    // 修改 @vuepress/bundler-webpack 的配置项
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

- 参考：
  - [打包工具 > Vite](./bundler/vite.md)
  - [打包工具 > Webpack](./bundler/webpack.md)

### extendsMarkdownOptions

- 类型： `(options: MarkdownOptions, app: App) => void | Promise<void>`

- 详情：

  Markdown 配置项扩展。

  该 Hook 接收一个函数，在参数中会收到 Markdown 配置项。

  该 Hook 可以用于修改 Markdown 配置项。

- 示例：

修改默认提取的子标题层级：

```js
export default {
  extendsMarkdownOptions: (markdownOptions, app) => {
    if (markdownOptions.extractHeaders === false) return
    markdownOptions.extractHeaders ??= {}
    if (markdownOptions.extractHeaders.level) return
    markdownOptions.extractHeaders.level = [2, 3, 4, 5, 6]
  },
}
```

- 参考：
  - [配置 > markdown](./config.md#markdown)

### extendsMarkdown

- 类型： `(md: Markdown, app: App) => void | Promise<void>`

- 详情：

  Markdown 增强。

  该 Hook 接收一个函数，在参数中会收到一个由 [markdown-it](https://github.com/markdown-it/markdown-it) 提供的 `Markdown` 实例。

  该 Hook 可以用来添加额外的 markdown-it 插件、应用额外的自定义功能。

- 示例：

```js
export default {
  extendsMarkdown: (md) => {
    md.use(plugin1)
    md.linkify.set({ fuzzyEmail: false })
  },
}
```

### extendsPageOptions

- 类型： `(options: PageOptions, app: App) => void | Promise<void>`

- 详情：

  页面配置项扩展。

  该 Hook 接收一个函数，在参数中会收到 `createPage` 传入的配置项。

  该 Hook 可以用于修改页面配置项。

- 示例：

为 `_posts` 目录下的页面设置永久链接 Pattern ：

```js
export default {
  extendsPageOptions: (pageOptions, app) => {
    if (pageOptions.filePath?.startsWith(app.dir.source('_posts/'))) {
      pageOptions.frontmatter = pageOptions.frontmatter ?? {}
      pageOptions.frontmatter.permalinkPattern = '/:year/:month/:day/:slug.html'
    }
  },
}
```

- 参考：
  - [Node API > Page > createPage](./node-api.md#createPage)

### extendsPage

- 类型： `(page: Page, app: App) => void | Promise<void>`

- 详情：

  页面扩展。

  该 Hook 接收一个函数，在参数中会收到一个 `Page` 实例。

  该 Hook 可以用来在 Page 对象上添加额外的属性，或修改现有的属性等。

  值得一提的是，针对 `page.data` 和 `page.routeMeta` 的改动可以在客户端代码中使用。

- 示例：

```js
export default {
  extendsPage: (page) => {
    page.foo = 'foo'
    page.data.bar = 'bar'
  },
}
```

在客户端组件中：

```js
import { usePageData } from '@vuepress/client'

export default {
  setup() {
    const page = usePageData()
    console.log(page.value.bar) // bar
  },
}
```

- 参考：
  - [客户端 API > usePageData](./client-api.md#usepagedata)
  - [Node API > Page 属性 > data](./node-api.md#data)
  - [Node API > Page 属性 > routeMeta](./node-api.md#routemeta)

## 生命周期 Hooks

### onInitialized

- 类型： `(app: App) => void | Promise<void>`

- 详情：

  该 Hook 会在 VuePress App 初始化后被立即调用。

### onPrepared

- 类型： `(app: App) => void | Promise<void>`

- 详情：

  该 Hook 会在 VuePress App 完成文件准备后被立即调用。

### onWatched

- 类型： `(app: App, watchers: Closable[], restart: () => Promise<void>) => void | Promise<void>`

- 详情：

  该 Hook 会在 VuePress App 启动开发服务器并开始监听文件修改后被调用。

  `watchers` 是一个文件监听器的数组。在修改配置文件导致重启 dev 命令时，这些监听器会被自动关闭。如果你在当前 Hook 中添加了新的监听器，你应该把它们也加入到这个数组中，确保在重启 dev 命令时它们能被正确关闭。

  `restart` 方法用来重启 dev 命令。调用该方法时， `watchers` 数组中的监听器也会被自动关闭。

### onGenerated

- 类型： `(app: App) => void | Promise<void>`

- 详情：

  该 Hook 会在 VuePress App 完成静态文件生成后被立即调用。
