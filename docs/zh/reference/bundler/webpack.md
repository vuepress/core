# Webpack

<NpmBadge package="@vuepress/bundler-webpack" />

Webpack 打包工具是由 [@vuepress/bundler-webpack](https://www.npmjs.com/package/@vuepress/bundler-webpack) 包提供的。它是 [vuepress-webpack](https://www.npmjs.com/package/vuepress-webpack) 包的依赖之一，当然你也可以单独安装它：

```bash
npm i -D @vuepress/bundler-webpack@next
```

## 配置项

Webpack 打包工具配置的参考文档，可以通过 [bundlerConfig](../config.md#bundlerconfig) 来设置这些配置。

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  // 在使用 vuepress-webpack 包的时候，你可以忽略这个字段，因为 Webpack 是默认打包工具
  bundler: '@vuepress/bundler-webpack',
  // Webpack 打包工具的配置项
  bundlerConfig: {
    // 查看下方
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
  // 在使用 vuepress 包的时候，你可以忽略这个字段，因为 Webpack 是默认打包工具
  bundler: '@vuepress/bundler-webpack',
  // Webpack 打包工具的配置项
  bundlerConfig: {
    // 查看下方
  },
})
```

  </CodeGroupItem>
</CodeGroup>

### configureWebpack

- 类型： `(config: WebpackConfiguration, isServer: boolean, isBuild: boolean) => WebpackConfiguration | void`

- 详情：

  用于修改内部的 Webpack 配置。

  该配置项接收一个函数，该函数的第一个参数是 Webpack 配置对象，第二个参数是 `isServer` 标志位，第三个参数是 `isBuild` 标志位。

### chainWebpack

- 类型： `(config: WebpackChainConfig, isServer: boolean, isBuild: boolean) => void`

- 详情：

  通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 来修改内部的 Webpack 配置。

  该配置项接收一个函数，该函数的第一个参数是由 `webpack-chain` 提供的 `Config` 实例，第二个参数是 `isServer` 标志位，第三个参数是 `isBuild` 标志位。

### devServerSetupMiddlewares

- 类型： `(middlewares: Middleware[], devServer: Server) => Middleware[]`

- 详情：

  在 Webpack 的 `devServer.setupMiddlewares` 中调用的 Hook 。

  函数的参数即是 `devServer.setupMiddlewares` 的参数。

- 参考：
  - [Webpack > Configuration > DevServer > devServer.setupMiddlewares](https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares)

### vue

- 类型： `VueLoaderOptions`

- 详情：

  `vue-loader` 的配置项。

- 参考：
  - [vue-loader > 选项参考](https://vue-loader.vuejs.org/zh/options.html)

### postcss

- 类型： `PostcssLoaderOptions`

- 详情：

  `postcss-loader` 的配置项。

- 参考：
  - [postcss-loader > Options](https://github.com/webpack-contrib/postcss-loader#options)

### stylus

- 类型： `StylusLoaderOptions`

- 详情：

  `stylus-loader` 的配置项。

- 参考：
  - [stylus-loader > Options](https://github.com/webpack-contrib/stylus-loader#options)

### scss

- 类型： `SassLoaderOptions`

- 详情：

  针对 `.scss` 文件的 `sass-loader` 的配置项。

- 参考：
  - [sass-loader > Options](https://github.com/webpack-contrib/sass-loader#options)

### sass

- 类型： `SassLoaderOptions`

- 详情：

  针对 `.sass` 文件的 `sass-loader` 的配置项。

- 参考：
  - [sass-loader > Options](https://github.com/webpack-contrib/sass-loader#options)

### less

- 类型： `LessLoaderOptions`

- 详情：

  `less-loader` 的配置项。

- 参考：
  - [less-loader > Options](https://github.com/webpack-contrib/less-loader#options)

### evergreen

- 类型： `boolean`

- 默认值： `true`

- 详情：

  如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 `true` 。这将会禁用一些转译过程和 Polyfills ，带来更快的构建速度和更小的文件体积。
