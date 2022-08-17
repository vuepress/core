# Bundler

VuePress has been using [Webpack](https://webpack.js.org/) as the bundler to dev and build sites. Since VuePress v2, other bundlers are also supported, and now we are using [Vite](https://vitejs.dev/) as the default bundler. Of course, you can still choose to use Webpack.

## Choose a Bundler

When using the [vuepress](https://www.npmjs.com/package/vuepress) package, Vite bundler is installed and used automatically.

If you want to use Webpack bundler instead, you can remove it and install the [vuepress-webpack](https://www.npmjs.com/package/vuepress-webpack) package instead:

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
In fact, the [vuepress](https://www.npmjs.com/package/vuepress) package is just a wrapper of the [vuepress-vite](https://www.npmjs.com/package/vuepress-vite) package.
:::

## Configure Bundler

Generally, you could use a bundler without extra configuration, because we have already configured them properly to work with VuePress.

You can configure bundler for advanced usage via the [bundler](../reference/config.md#bundler) option:

```ts
import { viteBundler } from 'vuepress'
// import { webpackBundler } from 'vuepress-webpack'

export default {
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

You can refer to [Bundlers > Vite](../reference/bundler/vite.md) and [Bundlers > Webpack](../reference/bundler/webpack.md) to check out all options of the corresponding bundler.
