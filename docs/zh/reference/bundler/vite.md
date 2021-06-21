# Vite

<NpmBadge package="@vuepress/bundler-vite" />

## 配置项

Vite 打包工具配置的参考文档，可以通过 [bundlerConfig](../config.md#bundlerconfig) 来设置这些配置。

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

## 注意事项

### 全局常量替换

我们可以通过 [define](../plugin-api.md#define) Hook 来定义全局常量，同时我们也提供了一些 [内置常量](../../client-api.md#常量) 。

当我们在构建模式中使用 Vite 时，无论这些常量出现在哪里，它们都会被 [静态替换](https://cn.vitejs.dev/guide/env-and-mode.html#production-replacement) ，即使是在 JavaScript 字符串和 Vue 模板中也一样。

由于 Vite 的这种限制，你应该避免在你的 Markdown 内容中直接“引用”这些全局常量。

插件和主题作者也应该定义尽可能独特的常量名，以避免用户无意中在 Markdown 内容里写到它们。
