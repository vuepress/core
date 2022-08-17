# 配置

<NpmBadge package="@vuepress/cli" />
<NpmBadge package="@vuepress/core" />

## 站点配置

### base

- 类型： `string`

- 默认值： `/`

- 详情：

  部署站点的基础路径。

  如果你想让你的网站部署到一个子路径下，你将需要设置它。它的值应当总是以斜杠开始，并以斜杠结束。举例来说，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`。

  `base` 将会作为前缀自动地插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。

- 参考：
  - [指南 > 静态资源 > Base Helper](../guide/assets.md#base-helper)
  - [指南 > 部署](../guide/deployment.md)

### lang

- 类型： `string`

- 默认值： `en-US`

- 详情：

  站点的语言。

  它将会在最终渲染出的 HTML 中作为 `<html>` 标签的 `lang` 属性。

  它可以设置在不同语言的 locales 中。

- 参考：
  - [配置 > locales](#locales)

### title

- 类型： `string`

- 默认值： `''`

- 详情：

  站点的标题。

  它将会作为所有页面标题的后缀，并且在默认主题的导航栏中显示。

  它可以设置在不同语言的 locales 中。

- 参考：
  - [配置 > locales](#locales)

### description

- 类型： `string`

- 默认值： `''`

- 详情：

  站点的描述。

  它将会在最终渲染出的 HTML 中作为 `<meta name="description" />` 标签的 `content` 属性。它会被每个页面的 Frontmatter 中的 `description` 字段覆盖。

  它可以设置在不同语言的 locales 中。

- 参考：
  - [配置 > locales](#locales)
  - [Frontmatter > description](./frontmatter.md#description)

### head

- 类型： `HeadConfig[]`

- 默认值： `[]`

- 详情：

  在最终渲染出的 HTML 的 `<head>` 标签内加入的额外标签。

  你可以通过 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式来添加标签。

  它可以设置在不同语言的 locales 中。

- 示例：

  增加一个自定义的 favicon ：

```ts
export default {
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
}
```

渲染为：

```html
<head>
  <link rel="icon" href="/images/logo.png" />
</head>
```

- 参考：
  - [配置 > locales](#locales)
  - [Frontmatter > head](./frontmatter.md#head)

### locales

- 类型： `{ [path: string]: Partial<SiteLocaleData> }`

- 默认值： `{}`

- 详情：

  多语言支持的各个语言 locales 。

  可以使用的字段有：

  - [lang](#lang)
  - [title](#title)
  - [description](#description)
  - [head](#head)

- 参考：
  - [指南 > I18n](../guide/i18n.md)

## 主题配置

### theme

- 类型： `Theme`

- 详情：

  设置站点要使用的主题。

  如果不设置该选项，将会使用默认主题。

- 参考：
  - [指南 > 主题](../guide/theme.md)
  - [默认主题 > 配置](./default-theme/config.md)

## 打包工具配置

### bundler

- 类型： `Bundler`

- 详情：

  设置站点要使用的打包工具。

  如果不设置该选项，将会使用默认的打包工具：

  - 使用 `vuepress` 或 `vuepress-vite` 时，默认的打包工具是 Vite 。
  - 使用 `vuepress-webpack` 时，默认的打包工具是 Webpack 。

- 参考：
  - [指南 > 打包工具](../guide/bundler.md)
  - [打包工具 > Vite](./bundler/vite.md)
  - [打包工具 > Webpack](./bundler/webpack.md)

## 通用配置项

### dest

- 类型： `string`

- 默认值： `` `${sourceDir}/.vuepress/dist` ``

- 详情：

  指定 `vuepress build` 命令的输出目录。

### temp

- 类型： `string`

- 默认值： `` `${sourceDir}/.vuepress/.temp` ``

- 详情：

  指定临时文件目录。

::: warning
VuePress 在开发和构建时会加载临时文件，因此临时文件目录应位于项目根目录内部，以便可以正确地解析到依赖。
:::

### cache

- 类型： `string`

- 默认值： `` `${sourceDir}/.vuepress/.cache` ``

- 详情：

  指定缓存文件目录。

### public

- 类型： `string`

- 默认值： `` `${sourceDir}/.vuepress/public` ``

- 详情：

  指定 Public 文件目录。

- 参考：
  - [指南 > 静态资源 > Public 文件](../guide/assets.md#public-文件)

### debug

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否启用 Debug 模式。

  该配置项主要提供给开发者使用。同时，我们使用了 [debug](https://github.com/visionmedia/debug) 模块打印 Debug 日志，可以通过 `DEBUG=vuepress*` 环境变量来启用。

### pagePatterns

- 类型： `string[]`

- 默认值： `['**/*.md', '!.vuepress', '!node_modules']`

- 详情：

  指定页面文件的 Patterns 。这些 Patterns 是相对于 Source 目录的。

### permalinkPattern

- 类型： `string | null`

- 默认值： `null`

- 详情：

  指定为页面生成永久链接的 Pattern 。

  它会被每个页面的 Frontmatter 中的 `permalinkPattern` 字段覆盖。

- 参考：
  - [Frontmatter > permalinkPattern](./frontmatter.md#permalinkpattern)

## Dev 配置项

### host

- 类型： `string`

- 默认值： `'0.0.0.0'`

- 详情：

  指定开发服务器的主机名。

### port

- 类型： `number`

- 默认值： `8080`

- 详情：

  指定开发服务器的端口号。

### open

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否在开发服务器启动后打开浏览器。

### templateDev

- 类型： `string`

- 默认值： `'@vuepress/client/templates/dev.html'`

- 详情：

  指定开发时使用的 HTML 模板。

## Build 配置项

### shouldPreload

- 类型： `((file: string, type: string) => boolean)) | boolean`

- 默认值： `true`

- 详情：

  一个函数，用来控制哪些文件是需要生成对应的 `<link rel="preload">` 标签的。设置为 `true` 或者 `false` 来完全启用或禁用它。

  默认情况下，只有当前页面所需的文件会被预加载。所以在绝大部分情况下，你只需要使用 `true` 就可以了。

### shouldPrefetch

- 类型： `((file: string, type: string) => boolean)) | boolean`

- 默认值： `true`

- 详情：

  一个函数，用来控制哪些文件是需要生成对应的 `<link rel="prefetch">` 标签的。设置为 `true` 或者 `false` 来完全启用或禁用它。

  如果你将它设置为 `true` ，所有其它页面所需的文件都会被预拉取。这对于小型站点来说是十分有帮助的，因为它会大大提升页面切换的速度。但是在你的网站有很多页面时不建议你这么做。

### templateBuild

- 类型： `string`

- 默认值： `'@vuepress/client/templates/build.html'`

- 详情：

  指定构建时使用的 HTML 模板。

## Markdown 配置

### markdown

- 类型： `MarkdownOptions`

- 默认值： `{}`

- 详情：

  对 VuePress 内置的 Markdown 语法扩展进行配置。

  它可以接收 [markdown-it](https://github.com/markdown-it/markdown-it) 的所有配置项，以及下列额外的配置项。

- 参考：
  - [markdown-it > Init with presets and options](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
  - [指南 > Markdown > 语法扩展](../guide/markdown.md#语法扩展)

### markdown.anchor

- 类型： `AnchorPluginOptions | false`

- 默认值：

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

- 详情：

  [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) 的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 标题锚点](../guide/markdown.md#标题锚点)

### markdown.assets

- 类型： `AssetsPluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it assets 插件的配置项。

  设置为 `false` 可以禁用该插件。

::: danger
除非你了解它的用途，否则你不应该设置该配置项。
:::

### markdown.code

- 类型： `CodePluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it code 插件的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块](../guide/markdown.md#代码块)

#### markdown.code.highlightLines

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用代码块行高亮。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块 > 行高亮](../guide/markdown.md#行高亮)

#### markdown.code.lineNumbers

- 类型： `boolean | number`

- 默认值： `true`

- 详情：

  配置代码块行号。

  - 布尔值 `boolean` 代表是否启用代码块行号。
  - 数字 `number` 代表显示行号所需的最少行数。例如，如果你将它设置为 `4` ，那么只有在你的代码块包含至少 4 行代码时才会启用行号。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块 > 行号](../guide/markdown.md#行号)

#### markdown.code.preWrapper

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在 `<pre>` 标签外额外包裹一层。

  `highlightLines` 和 `lineNumbers` 依赖于这个额外的包裹层。这换句话说，如果你禁用了 `preWrapper` ，那么行高亮和行号也会被同时禁用。

::: tip
如果你想要在客户端来实现这些功能时，可以禁用该配置项。比如使用 [Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) 或者 [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/)。
:::

#### markdown.code.vPre.block

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在代码块的 `<pre>` 标签上添加 `v-pre` 指令。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块 > 添加 v-pre](../guide/markdown.md#添加-v-pre)

#### markdown.code.vPre.inline

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在行内代码的 `<code>` 标签上添加 `v-pre` 指令。

- 参考：
  - [指南 > Markdown > 语法扩展 > 代码块 > 添加 v-pre](../guide/markdown.md#添加-v-pre)

### markdown.component

- 类型： `undefined | false`

- 详情：

  [@mdit-vue/plugin-component](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-component) 插件的配置项。

  设置为 `false` 可以禁用该插件。

::: danger
除非你了解它的用途，否则你不应该设置该配置项。
:::

### markdown.emoji

- 类型： `EmojiPluginOptions | false`

- 详情：

  [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji) 的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > Emoji](../guide/markdown.md#emoji)

### markdown.frontmatter

- 类型： `FrontmatterPluginOptions | false`

- 默认值：

```ts
const defaultOptions = {
  grayMatterOptions: {
    excerpt: true,
    excerpt_separator: '<!-- more -->',
  },
}
```

- 详情：

  [@mdit-vue/plugin-frontmatter](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-frontmatter) 插件的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > 页面 > Frontmatter](../guide/page.md#frontmatter)
  - [Node API > Page 属性 > frontmatter](./node-api.md#frontmatter)
  - [Node API > Page 属性 > excerpt](./node-api.md#excerpt)

::: danger
除非你了解它的用途，否则你不应该设置该配置项。
:::

### markdown.headers

- 类型： `HeadersPluginOptions | false`

- 默认值：

```ts
const defaultOptions = {
  level: [2, 3],
}
```

- 详情：

  [@mdit-vue/plugin-headers](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-headers) 插件的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [Node API > Page 属性 > headers](./node-api.md#headers)

### markdown.title

- 类型： `undefined | false`

- 详情：

  [@mdit-vue/plugin-title](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-title) 插件的配置项。

  设置为 `false` 可以禁用该插件。

::: danger
除非你了解它的用途，否则你不应该设置该配置项。
:::

### markdown.importCode

- 类型： `ImportCodePluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it 导入代码插件的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 导入代码块](../guide/markdown.md#导入代码块)

#### markdown.importCode.handleImportPath

- 类型： `(str: string) => string`

- 默认值： `(str) => str`

- 详情：

  一个函数，用于处理导入代码语法中的文件导入路径。

### markdown.links

- 类型： `LinkPluginOptions | false`

- 详情：

  VuePress 内置的 markdown-it 链接插件的配置项。

  它可以把站内链接转换为 `<RouterLink>` ，并且可以在站外链接上添加额外的属性和图标。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 链接](../guide/markdown.md#链接)

#### markdown.links.internalTag

- 类型： `string`

- 默认值： `'RouterLink'`

- 详情：

  内部链接所使用的标签。

  默认情况下，该插件会把内部链接转换为 `<RouterLink>` 。你可以把该选项设置为 `'a'` 来禁用这个功能。

#### markdown.links.externalAttrs

- 类型： `Record<string, string>`

- 默认值： `{ target: '_blank', rel: 'noopener noreferrer' }`

- 详情：

  为外部链接添加额外的属性。

### markdown.sfc

- 类型： `SfcPluginOptions | false`

- 详情：

  [@mdit-vue/plugin-sfc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-sfc) 插件的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [Cookbook > Markdown 与 Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md)
  - [Node API > Page 属性 > sfcBlocks](./node-api.md#sfcblocks)

### markdown.slugify

- 类型： `(str: string) => string`

- 详情：

  默认使用的 slugify 函数。

### markdown.toc

- 类型： `TocPluginOptions | false`

- 默认值：

```ts
const defaultOptions = {
  level: [2, 3],
}
```

- 详情：

  [@mdit-vue/plugin-toc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc) 插件的配置项。

  设置为 `false` 可以禁用该插件。

- 参考：
  - [指南 > Markdown > 语法扩展 > 目录](../guide/markdown.md#目录)

## 插件配置

### plugins

- 类型： `PluginConfig[]`

- 详情：

  要使用的插件。

  该配置项接收一个数组，其中的每一个数组项是一个或一组插件。

- 参考：
  - [指南 > 插件](../guide/plugin.md)

## 插件 API

用户配置文件同样可以作为一个 VuePress 插件，所以除了 `name` 和 `multiple` 配置项以外的所有插件 API 都可以在配置文件中使用。

前往 [插件 API 参考](./plugin-api.md) 查看所有插件 API 。
