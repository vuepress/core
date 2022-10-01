# Plugin API

<NpmBadge package="@vuepress/core" />

Plugin API is supported by [@vuepress/core](https://www.npmjs.com/package/@vuepress/core) package. You could check out [Node API](./node-api.md) for how to use the VuePress app instance in plugin hooks.

## Overview

Plugins should be used before initialization. The basic options will be handled once the plugin is used:

- [name](#name)
- [multiple](#multiple)

The following hooks will be processed when initializing app:

- [extendsMarkdownOptions](#extendsmarkdownoptions)
- [extendsMarkdown](#extendsmarkdown)
- [extendsPageOptions](#extendspageoptions)
- [extendsPage](#extendspage)
- [onInitialized](#oninitialized)

The following hooks will be processed when preparing files:

- [clientConfigFile](#clientconfigfile)
- [onPrepared](#onprepared)

The following hooks will be processed in dev / build:

- [extendsBundlerOptions](#extendsbundleroptions)
- [alias](#alias)
- [define](#define)
- [onWatched](#onwatched)
- [onGenerated](#ongenerated)

> Check out [Advanced > Architecture > Core Process and Hooks](../advanced/architecture.md#core-process-and-hooks) to understand the process better.

## Basic Options

### name

- Type: `string`

- Details:

  Name of the plugin.

  It will be used for identifying plugins to avoid using a same plugin multiple times, so make sure to use a unique plugin name.

  It should follow the naming convention:

  - Non-scoped: `vuepress-plugin-foo`
  - Scoped: `@org/vuepress-plugin-foo`

- Also see:
  - [Plugin API > multiple](#multiple)

### multiple

- Type: `boolean`

- Default: `false`

- Details:

  Declare whether the plugin can be used multiple times.

  If set to `false`, when using plugins with the same name, the one used previously will be replaced by the one used later.

  If set to `true`, plugins with the same name could be used multiple times and won't be replaced.

- Also see:
  - [Plugin API > name](#name)

## Development Hooks

### alias

- Type: `Record<string, any> | ((app: App, isServer: boolean) => Record<string, any>)`

- Details:

  Path aliases definition.

  This hook accepts an object or a function that returns an object.

- Example:

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

- Type: `string | ((app: App) => string | Promise<string>)`

- Details:

  Path of client config file.

  This hook accepts an absolute file path, or a function that returns the path.

- Example:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  clientConfigFile: path.resolve(
    __dirname,
    './path/to/clientConfig.js'
  ),
}
```

- Also see:
  - [Client API > defineClientConfig](./client-api.md#defineclientconfig)
  - [Advanced > Cookbook > Usage of Client Config](../advanced/cookbook/usage-of-client-config.md)

### define

- Type: `Record<string, any> | ((app: App, isServer: boolean) => Record<string, any>)`

- Details:

  Define global constants replacements.

  This hook accepts an object or a function that returns an object.

  This can be useful for passing variables to client files. Note that the values will be automatically processed by `JSON.stringify()`.

- Example:

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

- Type: `(options: BundlerOptions, app: App) => void | Promise<void>`

- Details:

  Bundler options extension.

  This hook accepts a function that will receive the bundler options.

  This hook can be used for modifying bundler options.

  You could determine which bundler the user is using by `app.options.bundler.name`.

- Example:

Adding default [app.compilerOptions.isCustomElement](https://vuejs.org/api/application.html#app-config-compileroptions) option:

```ts
export default {
  extendsBundlerOptions: (bundlerOptions, app) => {
    // extends options of @vuepress/bundler-vite
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

    // extends options of @vuepress/bundler-webpack
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

- Also see:
  - [Bundlers > Vite](./bundler/vite.md)
  - [Bundlers > Webpack](./bundler/webpack.md)

### extendsMarkdownOptions

- Type: `(options: MarkdownOptions, app: App) => void | Promise<void>`

- Details:

  Markdown options extension.

  This hook accepts a function that will receive the markdown options.

  This hook can be used for modifying markdown options.

- Example:

Modifying the default header levels that going to be extracted:

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

- Also see:
  - [Config > markdown](./config.md#markdown)

### extendsMarkdown

- Type: `(md: Markdown, app: App) => void | Promise<void>`

- Details:

  Markdown enhancement.

  This hook accepts a function that will receive an instance of `Markdown` powered by [markdown-it](https://github.com/markdown-it/markdown-it) in its arguments.

  This hook can be used for using extra markdown-it plugins and implementing customizations.

- Example:

```ts
export default {
  extendsMarkdown: (md) => {
    md.use(plugin1)
    md.linkify.set({ fuzzyEmail: false })
  },
}
```

### extendsPageOptions

- Type: `(options: PageOptions, app: App) => void | Promise<void>`

- Details:

  Page options extension.

  This hook accepts a function that will receive the options of `createPage`.
  
  This hook can be used for modifying page options

- Example:

Set permalink pattern for pages in `_posts` directory:

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

- Also see:
  - [Node API > Page > createPage](./node-api.md#createpage)

### extendsPage

- Type: `(page: Page, app: App) => void | Promise<void>`

- Details:

  Page extension.

  This hook accepts a function that will receive a `Page` instance.

  This hook can be used for adding extra properties or modifying current properties on `Page` object.

  Notice that changes to `page.data` and `page.routeMeta` can be used in client side code.

- Example:

```ts
export default {
  extendsPage: (page) => {
    page.foo = 'foo'
    page.data.bar = 'bar'
  },
}
```

In client component:

```ts
import { usePageData } from '@vuepress/client'

export default {
  setup() {
    const page = usePageData()
    console.log(page.value.bar) // bar
  },
}
```

- Also see:
  - [Client API > usePageData](./client-api.md#usepagedata)
  - [Node API > Page Properties > data](./node-api.md#data)
  - [Node API > Page Properties > routeMeta](./node-api.md#routemeta)

## Lifecycle Hooks

### onInitialized

- Type: `(app: App) => void | Promise<void>`

- Details:

  This hook will be invoked once VuePress app has been initialized.

### onPrepared

- Type: `(app: App) => void | Promise<void>`

- Details:

  This hook will be invoked once VuePress app has finished preparation.

### onWatched

- Type: `(app: App, watchers: Closable[], restart: () => Promise<void>) => void | Promise<void>`

- Details:

  This hook will be invoked once VuePress app has started dev-server and watched files change.

  The `watchers` is an array of file watchers. When changing config file, the dev command will be restarted and those watchers will be closed. If you are adding new watchers in this hook, you should push your watchers to the `watchers` array, so that they can be closed correctly when restarting.

  The `restart` is a method to restart the dev command. When calling this method, the `watchers` array will be closed automatically.

### onGenerated

- Type: `(app: App) => void | Promise<void>`

- Details:

  This hook will be invoked once VuePress app has generated static files.
