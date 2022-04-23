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

```js
module.exports = {
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
  - [Bundlers > Webpack](./bundler/webpack.md)
  - [Bundlers > Vite](./bundler/vite.md)

## Common Config

### dest

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/dist` ``

- Details:

  Specify the output directory for `vuepress build` command.

::: warning
Since VuePress will generate temp files under the output directory during build process, the directory should be inside project root to resolve dependencies correctly.

You can manually move it to another location after building.
:::

### temp

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/.temp` ``

- Details:

  Specify the directory for temporary files.

### cache

- Type: `string`

- Default: `` `${sourceDir}/.vuepress/.cache` ``

- Details:

  Specify the directory for cache .

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

#### markdown.code.vPre

- Type: `boolean`

- Default: `true`

- Details:

  Enable the `v-pre` directive on `<pre>` tag or not.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Code Blocks > Wrap with v-pre](../guide/markdown.md#wrap-with-v-pre)

### markdown.customComponent

- Type: `undefined | false`

- Details:

  Options for VuePress built-in markdown-it custom-component plugin.

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

### markdown.extractHeaders

- Type: `ExtractHeadersPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it extract-headers plugin.

  It will extract page headers to page data, which would be used for generating sidebar, table of contents, etc. For example, the sidebar of current page is auto generated from the headers that extracted by this plugin.

  Set to `false` to disable this plugin.

- Also see:
  - [Node API > Page Properties > headers](./node-api.md#headers)

#### markdown.extractHeaders.level

- Type: `number[]`

- Default: `[2, 3]`

- Details:

  Header levels that going to be extracted.

  For example, if you set this option to `[2]`, only `##` headers will be extracted.

  Should be a subset of [markdown.anchor.level](#markdownanchor) option to ensure the extracted links are existed.

#### markdown.extractHeaders.slugify

- Type: `(str: string) => string`

- Details:

  A function to get the extracted slug of header from the raw header title.

  Should use the same slugify function with [markdown.anchor.slugify](#markdownanchor) to ensure the links are matched.

#### markdown.extractHeaders.format

- Type: `((str: string) => string) | undefined`

- Default: `undefined`

- Details:

  A function to format the extracted title of header from the raw header title.

### markdown.extractTitle

- Type: `undefined | false`

- Details:

  Options for VuePress built-in markdown-it extract-title plugin.

  It will extract title to page data, which will be used as the page title.

  Set to `false` to disable this plugin.

::: danger
You should not configure it unless you understand what it is for.
:::

### markdown.hoistTags

- Type: `HoistTagsPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it hoist-tags plugin.

  It will hoist specific HTML tags in your markdown to the top-level of SFC.

  Set to `false` to disable this plugin.

- Also see:
  - [Cookbook > Markdown and Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md)
  - [Node API > Page Properties > hoistedTags](./node-api.md#hoistedtags)

#### markdown.hoistTags.customBlocks

- Type: `string[]`

- Default: `[]`

- Details:

  SFC custom blocks to be hoisted.

  By default, only `<script>` and `<style>` tags will be hoisted. You can set this option to support SFC custom blocks in markdown.

  For example, if you set this option to `['foo']`, the `<foo>` tag in your markdown content will be hoisted as Vue SFC custom block. Remember that you need to configure the bundler correctly to handle custom blocks.

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

### markdown.toc

- Type: `TocPluginOptions | false`

- Details:

  Options for VuePress built-in markdown-it table-of-contents plugin.

  Set to `false` to disable this plugin.

- Also see:
  - [Guide > Markdown > Syntax Extensions > Table of Contents](../guide/markdown.md#table-of-contents)

#### markdown.toc.pattern

- Type: `RegExp`

- Default: `/^\[\[toc\]\]$/i`

- Details:

  The pattern serving as the TOC placeholder in your markdown.

#### markdown.toc.slugify

- Type: `(str: string) => string`

- Details:

  A function to get the TOC slug of header from the raw header title.

  Should use the same slugify function with [markdown.anchor.slugify](#markdownanchor) to ensure the links are matched.

#### markdown.toc.format

- Type: `((str: string) => string) | undefined`

- Default: `undefined`

- Details:

  A function to format the TOC title of header from the raw header title.

#### markdown.toc.level

- Type: `number[]`

- Default: `[2, 3]`

- Details:

  Header levels that going to be included in TOC.

  For example, if you set this option to `[2]`, only `##` headers will be included.

  Should be a subset of [markdown.anchor.level](#markdownanchor) option to ensure the links in the TOC are existed.

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
