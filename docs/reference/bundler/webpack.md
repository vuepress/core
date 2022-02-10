# Webpack

<NpmBadge package="@vuepress/bundler-webpack" />

Webpack bundler is provided by [@vuepress/bundler-webpack](https://www.npmjs.com/package/@vuepress/bundler-webpack) package. It is a dependency of the [vuepress-webpack](https://www.npmjs.com/package/vuepress-webpack) package, and you can also install it separately.

```bash
npm i -D @vuepress/bundler-webpack@next
```

## Options

Reference of webpack bundler config, which can be set via [bundlerConfig](../config.md#bundlerconfig).

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  // when using vuepress-webpack package, you can omit this field
  // because webpack is the default bundler
  bundler: '@vuepress/bundler-webpack',
  // options for webpack bundler
  bundlerConfig: {
    // see below
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import { defineUserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export default defineUserConfig<DefaultThemeOptions, WebpackBundlerOptions>({
  // when using vuepress package, you can omit this field
  // because webpack is the default bundler
  bundler: '@vuepress/bundler-webpack',
  // options for webpack bundler
  bundlerConfig: {
    // see below
  },
})
```

  </CodeGroupItem>
</CodeGroup>

### configureWebpack

- Type: `(config: WebpackConfiguration, isServer: boolean, isBuild: boolean) => WebpackConfiguration | void`

- Details:

  Edit the internal webpack config.

  This option accepts a function that will receive a webpack config object as the 1st argument, an `isServer` flag as the 2nd argument and an `isBuild` flag as the 3rd argument. You can either mutate the config directly, or return an object to be merged by [webpack-merge](https://github.com/survivejs/webpack-merge).

### chainWebpack

- Type: `(config: WebpackChainConfig, isServer: boolean, isBuild: boolean) => void`

- Details:

  Edit the internal webpack config with [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

  This option accepts a function that will receive a `Config` instance that provided by `webpack-chain` as the 1st argument an `isServer` flag as the 2nd argument and an `isBuild` flag as the 3rd argument.

### devServerSetupMiddlewares

- Type: `(middlewares: Middleware[], devServer: Server) => Middleware[]`

- Details:

  A hook to be called in `devServer.setupMiddlewares` of webpack.

  The arguments of the function are those of `devServer.setupMiddlewares`.

- Also see:
  - [Webpack > Configuration > DevServer > devServer.setupMiddlewares](https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares)

### vue

- Type: `VueLoaderOptions`

- Details:

  Options for `vue-loader`.

- Also see:
  - [vue-loader > Options Reference](https://vue-loader.vuejs.org/options.html)

### postcss

- Type: `PostcssLoaderOptions`

- Details:

  Options for `postcss-loader`.

- Also see:
  - [postcss-loader > Options](https://github.com/webpack-contrib/postcss-loader#options)

### stylus

- Type: `StylusLoaderOptions`

- Details:

  Options for `stylus-loader`.

- Also see:
  - [stylus-loader > Options](https://github.com/webpack-contrib/stylus-loader#options)

### scss

- Type: `SassLoaderOptions`

- Details:

  Options for `sass-loader` for `.scss` files.

- Also see:
  - [sass-loader > Options](https://github.com/webpack-contrib/sass-loader#options)

### sass

- Type: `SassLoaderOptions`

- Details:

  Options for `sass-loader` for `.sass` files.

- Also see:
  - [sass-loader > Options](https://github.com/webpack-contrib/sass-loader#options)

### less

- Type: `LessLoaderOptions`

- Details:

  Options for `less-loader`.

- Also see:
  - [less-loader > Options](https://github.com/webpack-contrib/less-loader#options)

### evergreen

- Type: `boolean`

- Default: `true`

- Details:

  Set to `true` if you are only targeting evergreen browsers. This will disable some transpilation and polyfills, and result in faster builds and smaller files.
