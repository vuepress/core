# Config

<NpmBadge package="@vuepress/cli" />
<NpmBadge package="@vuepress/core" />

## Site Config

### base

- Type: `string`

- Default: `/`

- Details:

  The base URL the site will be deployed at.

  You will need to set this if you plan to deploy your site under a sub path. It should always start and end with a slash. For example, if you plan to deploy your site to GitHub pages at `https://foo.github.io/bar/`, then you should set `base` to `"/bar/"`.

  The `base` is automatically prepended to all the URLs that start with `/` in other options, so you only need to specify it once.

- Also see:
  - [Guide > Assets > Base Helper](../guide/assets.md#base-helper)
  - [Guide > Deployment](../guide/deployment.md)

### lang

- Type: `string`

- Default: `en-US`

- Details:

  Language for the site.

  This will be the `lang` attribute of the `<html>` tag in the rendered HTML.

  This can be specified in different locales.

- Also see:
  - [Config > locales](#locales)
  - [Frontmatter > lang](./frontmatter.md#lang)

### title

- Type: `string`

- Default: `''`

- Details:

  Title for the site.

  This will be the suffix for all page titles, and displayed in the navbar in the default theme.

  This can be specified in different locales.

- Also see:
  - [Config > locales](#locales)

### description

- Type: `string`

- Default: `''`

- Details:

  Description for the site.

  This will be the `content` attribute of `<meta name="description" />` tag in the rendered HTML, which will be overrode by the `description` field of page frontmatter.

  This can be specified in different locales.

- Also see:
  - [Config > locales](#locales)
  - [Frontmatter > description](./frontmatter.md#description)

### head

- Type: `HeadConfig[]`

- Default: `[]`

- Details:

  Extra tags to inject into the `<head>` tag in the rendered HTML.

  You can specify each tag in the form of `[tagName, { attrName: attrValue }, innerHTML?]`.

  This can be specified in different locales.

- Example:

  To add a custom favicon:

```ts
export default  {
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
}
```

Rendered as：

```html
<head>
  <link rel="icon" href="/images/logo.png" />
</head>
```

- Also see:
  - [Config > locales](#locales)
  - [Frontmatter > head](./frontmatter.md#head)

### locales

- Type: `{ [path: string]: Partial<SiteLocaleData> }`

- Default: `{}`

- Details:

  Specify locales for i18n support.

  Acceptable fields:

  - [lang](#lang)
  - [title](#title)
  - [description](#description)
  - [head](#head)

- Also see:
  - [Guide > I18n](../guide/i18n.md)

## Theme Config

### theme

- Type: `Theme`

- Details:

  Set the theme of your site.

  If this option is not set, the default theme will be used.

- Also see:
  - [Guide > Theme](../guide/theme.md)
  - [Default Theme > Config](./default-theme/config.md)

## Bundler Config

### bundler

- Type: `Bundler`

- Details:

  Set the bundler of your site.

  If this option is not set, the default bundler will be used:

  - With `vuepress` or `vuepress-vite`, the default bundler is vite.
  - With `vuepress-webpack`, the default bundler is webpack.

- Also see:
  - [Guide > Bundler](../guide/bundler.md)
  - [Bundlers > Vite](./bundler/vite.md)
  - [Bundlers > Webpack](./bundler/webpack.md)

## Common Config

### dest

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/dist` ``

- Details:

  Specify the output directory for `vuepress build` command.

### temp

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/.temp` ``

- Details:

  Specify the directory for temporary files.

::: warning
Since VuePress will load temp files during dev and build, the temp directory should be inside project root to resolve dependencies correctly.
:::

### cache

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/.cache` ``

- Details:

  Specify the directory for cache files.

### public

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/public` ``

- Details:

  Specify the directory for public files.

- Also see:
  - [Guide > Assets > Public Files](../guide/assets.md#public-files)

### debug

- Type: `boolean`

- Default: `false`

- Details:

  Enable debug mode or not.

  This would be helpful for developers. Also, we are using [debug](https://github.com/visionmedia/debug) package for debug logging, which can be enabled via `DEBUG=vuepress*` environment variable.

### pagePatterns

- Type: `string[]`

- Default: `['**/*.md', '!.vuepress', '!node_modules']`

- Details:

  Specify the patterns of files you want to be resolved as pages. The patterns are relative to the source directory.

### permalinkPattern

- Type: `string | null`

- Default: `null`

- Details:

  Specify the pattern to generate permalink.

  This will be overrode by the `permalinkPattern` field of page frontmatter.

- Also see:
  - [Frontmatter > permalinkPattern](./frontmatter.md#permalinkpattern)

## Dev Config

### host

- Type: `string`

- Default: `'0.0.0.0'`

- Details:

  Specify the host to use for the dev server.

### port

- Type: `number`

- Default: `8080`

- Details:

  Specify the port to use for the dev server.

### open

- Type: `boolean`

- Default: `false`

- Details:

  Whether to open the browser after dev-server had been started.

### templateDev

- Type: `string`

- Default: `'@vuepress/client/templates/dev.html'`

- Details:

  Specify the path of the HTML template to be used for dev.

## Build Config

### shouldPreload

- Type: `((file: string, type: string) => boolean)) | boolean`

- Default: `true`

- Details:

  A function to control what files should have `<link rel="preload">` resource hints generated. Set to `true` or `false` to enable or disable totally.

  By default, only those files that are required by current page will be preloaded. So you can keep it `true` in most cases.

### shouldPrefetch

- Type: `((file: string, type: string) => boolean)) | boolean`

- Default: `true`

- Details:

  A function to control what files should have `<link rel="prefetch">` resource hints generated. Set to `true` or `false` to enable or disable for all files.

  If you set it to `true`, all files that required by other pages will be prefetched. This is good for small sites, which will speed up the navigation, but it might not be a good idea if you have lots of pages in your site.

### templateBuild

- Type: `string`

- Default: `'@vuepress/client/templates/build.html'`

- Details:

  Specify the path of the HTML template to be used for build.

## Markdown Config

### markdown

- Type: `MarkdownOptions`

- Default: `{}`

- Details:

  Configure VuePress built-in Markdown syntax extensions.

  It accepts all options of [markdown-it](https://github.com/markdown-it/markdown-it), and the following additional options.

- Also see:
  - [markdown-it > Init with presets and options](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)
  - [Guide > Markdown > Syntax Extensions](../guide/markdown.md#syntax-extensions)

### markdown.anchor

- Type: `AnchorPluginOptions | false`

- Default:

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

- Details:

  Options for [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor).

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Header Anchors](../guide/markdown.md#header-anchors)

### markdown.assets

- Type: `AssetsPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it assets plugin.

  Set to `false` to disable this plugin.

::: danger
You should not configure it unless you understand what it is for.
:::

### markdown.code

- Type: `CodePluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it code plugin.

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks](../guide/markdown.md#code-blocks)

#### markdown.code.highlightLines

- Type: `boolean`

- Default: `true`

- Details:

  Enable code line highlighting or not.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Line Highlighting](../guide/markdown.md#line-highlighting)

#### markdown.code.lineNumbers

- Type: `boolean | number`

- Default: `true`

- Details:

  Configure code line numbers.

  - A `boolean` value is to enable line numbers or not.
  - A `number` value is the minimum number of lines to enable line numbers. For example, if you set it to `4`, line numbers will only be enabled when your code block has at least 4 lines of code.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Line Numbers](../guide/markdown.md#line-numbers)

#### markdown.code.preWrapper

- Type: `boolean`

- Default: `true`

- Details:

  Enable the extra wrapper of the `<pre>` tag or not.

  The wrapper is required by the `highlightLines` and `lineNumbers`. That means, if you disable `preWrapper`, the line highlighting and line numbers will also be disabled.

::: tip
You can disable it if you want to implement them in client side. For example, [Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) or [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/).
:::

#### markdown.code.vPre.block

- Type: `boolean`

- Default: `true`

- Details:

  Add `v-pre` directive to `<pre>` tag of code block or not.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Wrap with v-pre](../guide/markdown.md#wrap-with-v-pre)

#### markdown.code.vPre.inline

- Type: `boolean`

- Default: `true`

- Details:

  Add `v-pre` directive to `<code>` tag of inline code or not.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Wrap with v-pre](../guide/markdown.md#wrap-with-v-pre)

### markdown.component

- Type: `undefined | false`

- Details:

  Options for [@mdit-vue/plugin-component](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-component).

  Set to `false` to disable this plugin.

::: danger
You should not configure it unless you understand what it is for.
:::

### markdown.emoji

- Type: `EmojiPluginOptions | false`

- Details:

  Options for [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji).

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Emoji](../guide/markdown.md#emoji)

### markdown.frontmatter

- Type: `FrontmatterPluginOptions | false`

- Default:

```ts
const defaultOptions = {
  grayMatterOptions: {
    excerpt: true,
    excerpt_separator: '<!-- more -->',
  },
}
```

- Details:

  Options for [@mdit-vue/plugin-frontmatter](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-frontmatter).

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Page > Frontmatter](../guide/page.md#frontmatter)
  - [Node API > Page Properties > frontmatter](./node-api.md#frontmatter)
  - [Node API > Page Properties > excerpt](./node-api.md#excerpt)

::: danger
You should not configure it unless you understand what it is for.
:::

### markdown.headers

- Type: `HeadersPluginOptions | false`

- Default:

```ts
const defaultOptions = {
  level: [2, 3],
}
```

- Details:

  Options for [@mdit-vue/plugin-headers](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-headers).

  Set to `false` to disable this plugin.

- Also see:
  - [Node API > Page Properties > headers](./node-api.md#headers)

### markdown.importCode

- Type: `ImportCodePluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it import-code plugin.

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Import Code Blocks](../guide/markdown.md#import-code-blocks)

#### markdown.importCode.handleImportPath

- Type: `(str: string) => string`

- Default: `(str) => str`

- Details:

  A function to handle the import path of the import code syntax.

### markdown.links

- Type: `LinksPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it links plugin.

  It will convert internal links to `<RouterLink>`, and add extra attributes and icon to external links.

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Links](../guide/markdown.md#links)

#### markdown.links.internalTag

- Type: `'a' | 'RouterLink'`

- Default: `'RouterLink'`

- Details:

  Tag for internal links.

  By default, this plugin will transform internal links to `<RouterLink>`. You can set this option to `'a'` to disable this feature.

#### markdown.links.externalAttrs

- Type: `Record<string, string>`

- Default: `{ target: '_blank', rel: 'noopener noreferrer' }`

- Details:

  Additional attributes for external links.

### markdown.sfc

- Type: `SfcPluginOptions | false`

- Details:

  Options for [@mdit-vue/plugin-sfc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-sfc).

  Set to `false` to disable this plugin.

- Also see:
  - [Cookbook > Markdown and Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md)
  - [Node API > Page Properties > sfcBlocks](./node-api.md#sfcblocks)

### markdown.slugify

- Type: `(str: string) => string`

- Details:

  The default slugify function.

### markdown.title

- Type: `undefined | false`

- Details:

  Options for [@mdit-vue/plugin-title](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-title).

  Set to `false` to disable this plugin.

::: danger
You should not configure it unless you understand what it is for.
:::

### markdown.toc

- Type: `TocPluginOptions | false`

- Default:

```ts
const defaultOptions = {
  level: [2, 3],
}
```

- Details:

  Options for [@mdit-vue/plugin-toc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc).

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Table of Contents](../guide/markdown.md#table-of-contents)

## Plugin Config

### plugins

- Type: `(Plugin | Plugin[])[]`

- Details:

  Plugins to use.

  This option accepts an array, each item of which could be a plugin or an array of plugins.

- Also see:
  - [Guide > Plugin](../guide/plugin.md)

## Plugin API

User config file also works as a VuePress plugin, so all of the Plugin APIs are available except the `name` and `multiple` options.

Please check out [Plugin API Reference](./plugin-api.md) for a full list of Plugin APIs.
