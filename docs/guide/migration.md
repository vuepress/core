# Migrating from v1

::: warning
Plugins and themes of VuePress v1 are not compatible with VuePress v2. You need to update them to corresponding v2 version.
:::

Some major changes and enhancements of VuePress v2:

- VuePress v2 is now using Vue 3, so make sure your components and other client files are compatible with Vue 3.
- VuePress v2 is developed with TypeScript, so it provides better TS support now. It's highly recommended to use TypeScript to develop plugins and themes. VuePress config file also supports TypeScript, and you can use `.vuepress/config.ts` directly.
- VuePress v2 supports both Webpack and Vite as bundler. Now Vite is the default bundler, while you can still choose to use Webpack. You can even use Vite in dev mode to get better development experience, and use Webpack in build mode to get better browser compatibility.
- VuePress v2 is now released as pure ESM packages, and CommonJS config files are no longer supported.

Core ideas and processes of VuePress v2 are the same with v1, while v2 API has been re-designed and becomes more normalized. So you might encounter breaking changes when migrating an existing v1 project to v2. This guide is here to help you migrating v1 sites / plugins / themes to v2.

- If you are a common user, you need to read the guide [for users](#for-users).
- If you are a plugin author, you need to read the guide [for plugin authors](#for-plugin-authors).
- If you are a theme author, you need to read the guide [for theme authors](#for-theme-authors).

## For Users

### User Config Change

Config file should be in ESM format, and CommonJS format config file is no longer supported.

```diff
// .vuepress/config.js

- module.exports = {
-   // user config
- }

+ export default {
+   // user config
+ }
```

#### theme

Using a theme via string is not supported. Import the theme directly.

```diff
- module.exports = {
-   theme: '@vuepress/theme-default',
-   themeConfig: {
-     // default theme config
-   },
- }

+ import { defaultTheme } from '@vuepress/theme-default'
+ export default {
+   theme: defaultTheme({
+     // default theme config
+   })
+ }
```

#### themeConfig

Removed. Set config to the theme directly.

#### plugins

Using a plugin via string is not supported. Import the plugin directly.

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

Default value is changed from `() => true` to `true`.

#### extraWatchFiles

Removed.

You can watch files manually in [onWatched](../reference/plugin-api.md#onwatched) hook.

#### patterns

Renamed to `pagePatterns`

#### markdown.lineNumbers

Moved to [markdown.code.lineNumbers](../reference/config.md#markdown-code-linenumbers).

Default value is changed from `false` to `true`.

#### markdown.pageSuffix

Removed.

#### markdown.externalLinks

Moved to [markdown.links.externalAttrs](../reference/config.md#markdown-links).

#### markdown.toc

Changed.

See [Config > markdown.toc](../reference/config.md#markdown-toc)

#### markdown.plugins

Removed.

Use markdown-it plugins in [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) hook.

#### markdown.extendMarkdown

Removed.

Use [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) hook.

#### markdown.extractHeaders

Moved to [markdown.headers](../reference/config.md#markdown-headers).

#### Webpack Related Configs

All webpack related configs are moved to options of `@vuepress/bundler-webpack`, including:

- `postcss`
- `stylus`
- `scss`
- `sass`
- `less`
- `chainWebpack`
- `configureWebpack`
- `evergreen`: default value is changed from `false` to `true`

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

Please refer to [Guide > Bundler](./bundler.md).

### Frontmatter Change

#### meta

Removed.

Use [head](../reference/frontmatter.md#head) instead. For example:

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
    - console.log('hello from frontmatter');
```

Has the same structure with:

```ts
// .vuepress/config.ts
export default {
  // ...
  head: [
    ['meta', { name: 'foo', content: 'bar' }],
    ['link', { rel: 'canonical', href: 'foobar' }],
    ['script', {}, `console.log('hello from frontmatter');`],
  ],
  // ...
}
```

### Permalink Patterns Change

- `:i_month`: removed
- `:i_day`: removed
- `:minutes`: removed (undocumented in v1)
- `:seconds`: removed (undocumented in v1)
- `:regular`: renamed to `:raw`

See [Frontmatter > permalinkPattern](../reference/frontmatter.md#permalinkpattern).

### Palette System Change

The stylus palette system of VuePress v1 (i.e. `styles/palette.styl` and `styles/index.styl`) is no longer provided by VuePress Core.

The palette system is extracted to [@vuepress/plugin-palette](../reference/plugin/palette.md).

Theme authors can use their own way to allow users to customize styles, and not be limited with stylus.

If you are using default theme, the palette system is still available but migrated to SASS, while most variables have been migrated to CSS variables. See [Default Theme > Styles](../reference/default-theme/styles.md).

### Conventional Files Change

#### .vuepress/enhanceApp.js

Renamed to `.vuepress/client.{js,ts}`, and the usage has been changed, too.

See [Advanced > Cookbook > Usage of Client Config](../advanced/cookbook/usage-of-client-config.md).

#### .vuepress/components/

Files in this directory will not be registered as Vue components automatically.

You need to use [@vuepress/plugin-register-components](../reference/plugin/register-components.md), or register your components manually in `.vuepress/client.{js,ts}`.

#### .vuepress/theme/

This directory will not be used as local theme implicitly if it is existed.

You need to import and set your local theme via [theme](../reference/config.md#theme) option.

### Markdown slot Change

Markdown slot is no longer supported.

### CLI Change

#### eject command

Removed.

#### cache options

- `-c, --cache [cache]`: changed to `--cache <cache>`, which means that the shorthand `-c` is not for `cache` option, and the value of `cache` option is not optional.
- `--no-cache`: renamed to `--clean-cache` .

### Default Theme Change

#### Built-in Components

- `<CodeGroup />` and `<CodeBlock />` renamed to `<CodeGroup />` and `<CodeGroupItem />`
- `<Badge />`
  - `$badgeErrorColor` palette variable renamed to `$badgeDangerColor`
  - `type` prop only accepts `tip`, `warning` and `danger` now

#### Palette System

The palette system of default theme has migrated to SASS and CSS variables.

See [Default Theme > Styles](../reference/default-theme/styles.md).

#### Theme Config

Default theme config has been changed a lot. You'd better check the config reference of v2 default theme to migrate it properly.

See [Default Theme > Config](../reference/default-theme/config.md).

### Official Plugins Change

Check the v2 docs of official plugins.

### Community Themes and Plugins

Themes and plugins of v1 are not compatible with v2.

Please make sure that those themes and plugins you are using have supported v2, and refer to their own documentation for migration guide.

## For Plugin Authors

Some major breaking changes:

- You cannot use other plugins in your plugin anymore, which avoids lots of potential issues caused by plugin nesting. If your plugin depends on other plugins, you could list them in the docs to ask users import them manually. Alternatively, you can provide users with an array of plugins for convenience.
- Most of the v1 hooks have equivalents in v2. The only exception is `extendsCli`, which has been removed.
- Webpack related hooks are removed, because VuePress Core has decoupled with webpack. You can try to use [extendsBundlerOptions](../reference/plugin-api.md#extendsbundleroptions) hook for similar purpose, and make sure to work with all bundlers.

For more detailed guide about how to write a plugin in v2, see [Advanced > Writing a Plugin](../advanced/plugin.md).

### Plugin API Change

- `plugins`: removed
- `ready`: renamed to `onPrepared`
- `updated`: renamed to `onWatched`
- `generated`: renamed to `onGenerated`
- `additionalPages`: removed, use `app.pages.push(createPage())` in `onInitialized` hook
- `clientDynamicModules`: removed, use `app.writeTemp()` in `onPrepared` hook
- `enhanceAppFiles`: removed, use `clientConfigFile` hook
- `globalUIComponents`: removed, use `clientConfigFile` hook
- `clientRootMixin`: removed, use `clientConfigFile` hook
- `extendMarkdown`: renamed to `extendsMarkdown`
- `chainMarkdown`: removed
- `extendPageData`: renamed to `extendsPage`
- `extendsCli`: removed
- `configureWebpack`: removed
- `chainWebpack`: removed
- `beforeDevServer`: removed
- `afterDevServer`: removed

See [Plugin API](../reference/plugin-api.md).

## For Theme Authors

Although we do not allow using other plugins in a plugin anymore, you can still use plugins in your theme.

Some major breaking changes:

- There is no **conventional theme directory structure** anymore.
  - The file `theme/enhanceApp.js` will not be used as client app enhance file implicitly. You need to specify it explicitly in `clientConfigFile` hook.
  - Files in `theme/global-components/` directory will not be registered as Vue components automatically. You need to use [@vuepress/plugin-register-components](../reference/plugin/register-components.md), or register components manually in `clientConfigFile`.
  - Files in `theme/layouts/` directory will not be registered as layout components automatically. You need to specify it explicitly in `layouts` option in `clientConfigFile`.
  - Files in `theme/templates/` directory will not be used as dev / ssr template automatically. You need to specify theme explicitly in `templateBuild` and `templateDev` option.
  - Always provide a valid js entry file, and do not use `"main": "layouts/Layout.vue"` as the theme entry anymore.
- `themeConfig` is removed from user config and site data. To access the `themeConfig` as you would via `this.$site.themeConfig` in v1, we now recommend using the [@vuepress/plugin-theme-data](../reference/plugin/theme-data.md) plugin and its `useThemeData` composition API.
- Stylus is no longer the default CSS pre-processor, and the stylus palette system is not embedded. If you still want to use similar palette system as v1, [@vuepress/plugin-palette](../reference/plugin/palette.md) may help.
- Markdown code blocks syntax highlighting by Prism.js is not embedded by default. You can use either [@vuepress/plugin-prismjs](../reference/plugin/prismjs.md) or [@vuepress/plugin-shiki](../reference/plugin/shiki.md), or implement syntax highlighting in your own way.
- For scalability concerns, `this.$site.pages` is not available any more.

For more detailed guide about how to write a theme in v2, see [Advanced > Writing a Theme](../advanced/theme.md).

### Theme API Change

#### layouts

Removed.

Now you need to specify layout component in the client config file of your theme.

See [Advanced > Writing a theme](../advanced/theme.md).

#### extend

Renamed to `extends`.

You can still inherit a parent theme with `extends: parentTheme()`, which will extends the plugins, layouts, etc.

You can refer to [Default Theme > Extending](../reference/default-theme/extending.md) for how to extend default theme.

The `@theme` and `@parent-theme` aliases are removed by default, but you can still make a extendable theme with similar approach, see [Advanced > Cookbook > Making a Theme Extendable](../advanced/cookbook/making-a-theme-extendable.md).
