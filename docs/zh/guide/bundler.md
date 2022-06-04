# 打包工具

VuePress 一直以来都在使用 [Webpack](https://webpack.js.org/) 作为打包工具来进行网站的开发和构建。从 VuePress v2 开始，我们还支持使用其他的打包工具，并且现在使用 [Vite](https://vitejs.dev/) 作为默认的打包工具。当然，你仍然可以选择使用 Webpack 。 

## 选择一个打包工具

在使用 [vuepress](https://www.npmjs.com/package/vuepress) 包时，会自动安装和使用 Vite 打包工具。

如果你想改为使用 Webpack 打包工具，那么你可以移除它，改为安装 [vuepress-webpack](https://www.npmjs.com/package/vuepress-webpack) 包：

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn remove vuepress
yarn add -D vuepress-webpack@next
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm uninstall vuepress
npm install -D vuepress-webpack@next
```

  </CodeGroupItem>
</CodeGroup>

::: tip
实际上， [vuepress](https://www.npmjs.com/package/vuepress) 包只是 [vuepress-vite](https://www.npmjs.com/package/vuepress-vite) 包的一个封装而已。
:::

## 配置打包工具

一般情况下，你不要任何额外配置就可以使用打包工具，因为我们已经帮你配置好了它们。

通过 [bundler](../reference/config.md#bundler) 配置项，你可以对打包工具进行进阶配置：

```js
const { viteBundler } = require('vuepress')
// const { webpackBundler } = require('vuepress-webpack')

module.exports = {
  bundler: viteBundler({
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'center',
        },
      },
    },
  }),
}
```

你可以参考 [打包工具 > Vite](../reference/bundler/vite.md) 和 [打包工具 > Webpack](../reference/bundler/webpack.md) 来查看对应打包工具的所有配置项。
