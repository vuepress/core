# Webpack

<NpmBadge package="@vuepress/bundler-webpack" />

Webpack bundler is provided by [@vuepress/bundler-webpack](https://www.npmjs.com/package/@vuepress/bundler-webpack) package. It is a dependency of the [vuepress-webpack](https://www.npmjs.com/package/vuepress-webpack) package, and you can also install it separately.

```bash
npm i -D @vuepress/bundler-webpack@next
```

## Options

Reference of webpack bundler options:

```ts
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defineUserConfig } from '@vuepress/cli'

export default defineUserConfig({
  bundler: webpackBundler({
    postcss: {},
    vue: {},
  }),
})
```

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

## FAQ

### Referencing Public Files after Changing `base`

Unlike Vite, Webpack won't handle `base` for public files automatically. So if you change the `base` of your site, you'd better to use [Base Helper](../../guide/assets.md#base-helper) when referencing an public image file.

### Using with Default Theme

Default theme is using [SASS](https://sass-lang.com/) as CSS pre-processor, so you might need to install [sass-loader](https://www.npmjs.com/package/sass-loader) as a peer dependency to make it work with Webpack, especially when you are using [pnpm](https://pnpm.io/).
