# Vite

<NpmBadge package="@vuepress/bundler-vite" />

Vite 打包工具是由 [@vuepress/bundler-vite](https://www.npmjs.com/package/@vuepress/bundler-vite) 包提供的。它是 [vuepress](https://www.npmjs.com/package/vuepress) 包的依赖之一，当然你也可以单独安装它：

```bash
npm i -D @vuepress/bundler-vite@next
```

## 配置项

Vite 打包工具的配置项：

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
const { viteBundler } = require('@vuepress/bundler-vite')

module.exports = {
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from '@vuepress/cli'

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
})
```

  </CodeGroupItem>
</CodeGroup>

### viteOptions

- 详情：

  接收 Vite 的所有配置项。

- 参考：
  - [Vite > Config](https://cn.vitejs.dev/config/)

### vuePluginOptions

- 详情：

  接收 [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue) 的所有配置项。

- 参考：
  - [Vite > 插件 > 官方插件](https://cn.vitejs.dev/plugins/#vitejsplugin-vue)

## 常见问题

### SSR Externals 问题

当你引入一个第三方库（如 `foo-lib`）时，你可能会在构建时遇到一个常见的错误：

```sh
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /path/to/foo-lib
```

此时，你需要设置 `ssr.noExternal` 配置项来解决它：

```ts
export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      // @ts-expect-error: vite 还没有给 ssr 配置项提供类型
      ssr: {
        noExternal: ['foo-lib'],
      },
    },
  }),
})
```

VuePress 使用 Vite 服务端渲染 (SSR) 来将 Markdown 预渲染成 HTML 文件。尽管它可以在 VuePress 中正常使用，但该功能仍然被标记为实验性能力，因此可能会有一些小问题。想要完全理解上面的报错原因，你可以去了解一下 [Vite SSR Externals 文档](https://cn.vitejs.dev/guide/ssr.html#ssr-externals) 。
