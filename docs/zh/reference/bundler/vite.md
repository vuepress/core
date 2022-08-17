# Vite

<NpmBadge package="@vuepress/bundler-vite" />

Vite 打包工具是由 [@vuepress/bundler-vite](https://www.npmjs.com/package/@vuepress/bundler-vite) 包提供的。它是 [vuepress](https://www.npmjs.com/package/vuepress) 包的依赖之一，当然你也可以单独安装它：

```bash
npm i -D @vuepress/bundler-vite@next
```

## 配置项

Vite 打包工具的配置项：

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
