# 开发主题

::: tip
在阅读该指南之前，你最好先了解一下 [开发插件](./plugin.md) 指南。
:::

## 创建一个主题

VuePress 主题是一个特殊的插件，它应该符合 [主题 API](../reference/theme-api.md) 。和插件一样，主题可以是一个 *主题对象* 或一个 *主题函数* ，并且通常通过一个函数来接收配置项：

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

const fooTheme = (options) => {
  // 返回一个主题对象
  return {
    name: 'vuepress-theme-foo',

    // 主题的客户端配置文件的路径
    clientConfigFile: path.resolve(__dirname, 'client.js'),

    // 设置自定义 dev / build 模板
    // 如果没有指定模板，将会使用 `@vuepress/client` 提供的默认模板
    templateBuild: path.resolve(__dirname, 'templates/build.html'),
    templateDev: path.resolve(__dirname, 'templates/dev.html'),

    // 使用插件
    plugins: [
      // ...
    ],

    // 其他的插件 API 也都可用
  }
}

const barTheme = (options) => {
  // 返回一个主题函数
  return (app) => {
    return {
      name: 'vuepress-theme-bar',
      // ...
    }
  }
}
```

然后，创建主题的客户端配置文件 `client.js` :

```ts
import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

export default defineClientConfig({
  layouts: {
    Layout,
    NotFound,
  },
})
```

`layouts` 字段声明了你的主题提供的布局。一个主题必须提供至少两个布局：`Layout` 和 `NotFound` 。前者用于提供一般页面的默认布局，后者用于提供 404 页面的布局。

`Layout` 布局应该包含 [Content](../reference/components.md#content) 组件来展示 Markdown 内容：

```vue
<template>
  <div>
    <Content />
  </div>
</template>
```

`NotFound` 布局会被用于 `404.html` 页面：

```vue
<template>
  <div>404 Not Found</div>
</template>
```

你可以提供多个布局，用户可以通过 [layout](../reference/frontmatter.md#layout) Frontmatter 来修改布局。

## 发布到 NPM

同样的，对于主题也有 [package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) 相关的约定：

```json
{
  "name": "vuepress-theme-foo",
  "keywords": [
    "vuepress-theme"
  ]
}
```

- 将 `name` 按照约定命名： `vuepress-theme-xxx` 或 `@org/vuepress-theme-xxx` ，它应该和 *主题对象* 的 [name](../reference/theme-api.md#name) 字段保持一致。
- 在 `keywords` 中包含 `vuepress-theme` ，这样用户可以在 NPM 上搜索到你的主题。
