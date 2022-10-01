# Сборщик

VuePress использует [Webpack](https://webpack.js.org/) в качестве сборщика для разработки и создания сайтов. Начиная с VuePress v2, другие сборщики также поддерживаются, и теперь мы используем [Vite](https://vitejs.dev/) в качестве сборщика по умолчанию. Конечно, вы всё равно можете использовать Webpack.

## Выберите сборщик

При использовании пакета [vuepress](https://www.npmjs.com/package/vuepress) пакет Vite устанавливается и используется автоматически.

Если вы хотите вместо этого использовать сборщик Webpack, вы можете удалить его и вместо него установить пакет [vuepress-webpack](https://www.npmjs.com/package/vuepress-webpack):

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
На самом деле пакет [vuepress](https://www.npmjs.com/package/vuepress) является просто обёрткой пакета [vuepress-vite](https://www.npmjs.com/package/vuepress-vite).
:::

## Настройка сборщика

Как правило, вы можете использовать сборщик без дополнительной настройки, потому что мы уже правильно настроили его для работы с VuePress.

Вы можете настроить сборщик с помощью опции [bundler](../reference/config.md#bundler):

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

Вы можете обратиться к [Сборщики > Vite](../reference/bundler/vite.md) и [Сборщики > Webpack](../reference/bundler/webpack.md), чтобы проверить все параметры соответствующего сборщика.
