# Bundler

VuePress has been using [webpack](https://webpack.js.org/) as the bundler to dev and build sites. Since VuePress v2, other tools like [Vite](https://vitejs.dev/) are also supported.

Although it is possible to create other bundler packages by community users, currently we only suggest to use the bundlers provided by VuePress team.

## Choose a Bundler

When using the [vuepress](https://www.npmjs.com/package/vuepress) package, webpack bundler is installed and used automatically.

If you want to use vite bundler instead, you can switch to [vuepress-vite](https://www.npmjs.com/package/vuepress-vite) package:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn remove vuepress
yarn add -D vuepress-vite@next
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm uninstall vuepress
npm install -D vuepress-vite@next
```

  </CodeGroupItem>
</CodeGroup>

## Bundler Config

Generally, you could use a bundler without extra configuration, because we have already configured them properly to work with VuePress.

Similar to [themeConfig](../reference/config.md#themeconfig), VuePress also allows users to set bundler config via [bundlerConfig](../reference/config.md#bundlerconfig).

You can refer to [Bundlers > Webpack](../reference/bundler/webpack.md) and [Bundlers > Vite](../reference/bundler/vite.md) to check out all options of the corresponding bundler.
