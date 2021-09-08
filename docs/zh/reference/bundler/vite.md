# Vite

<NpmBadge package="@vuepress/bundler-vite" />

Vite 打包工具是由 [@vuepress/bundler-vite](https://www.npmjs.com/package/@vuepress/bundler-vite) 包提供的。它是 [vuepress-vite](https://www.npmjs.com/package/vuepress-vite) 包的依赖之一，当然你也可以单独安装它：

```bash
npm i -D @vuepress/bundler-vite@next
```

## 配置项

Vite 打包工具配置的参考文档，可以通过 [bundlerConfig](../config.md#bundlerconfig) 来设置这些配置。

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  // 在使用 vuepress-vite 包的时候，你可以忽略这个字段，因为 Vite 是默认打包工具
  bundler: '@vuepress/bundler-vite',
  // Vite 打包工具的配置项
  bundlerConfig: {
    // 查看下方
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import { defineUserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // 在使用 vuepress-vite 包的时候，你可以忽略这个字段，因为 Vite 是默认打包工具
  bundler: '@vuepress/bundler-vite',
  // Vite 打包工具的配置项
  bundlerConfig: {
    // 查看下方
  },
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
