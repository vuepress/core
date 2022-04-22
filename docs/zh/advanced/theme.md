# 开发主题

::: tip
在阅读该指南之前，你最好先了解一下 [开发插件](./plugin.md) 指南。
:::

## 创建一个主题

VuePress 主题是一个特殊的插件，它应该符合 [主题 API](../reference/theme-api.md) 。和插件一样，主题可以是一个 *主题对象* 或一个 *主题函数* ，并且通常通过一个函数来接收配置项：

```js
const { path } = require('@vuepress/utils')

const fooTheme = (options) => {
  return {
    name: 'vuepress-theme-foo',
    layouts: {
      Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
      404: path.resolve(__dirname, 'layouts/404.vue'),
    },
    // ...
  }
}

const barTheme = (options) => {
  return (app) => {
    return {
      name: 'vuepress-theme-bar',
      layouts: {
        Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
        404: path.resolve(__dirname, 'layouts/404.vue'),
      },
      // ...
    }
  }
}
```

`layouts` 字段声明了你的主题提供的布局。一个主题必须提供至少两个布局：`Layout` 和 `404` 。前者用于提供一般页面的默认布局，后者用于提供 404 页面的布局。

`Layout` 布局应该包含 [Content](../reference/components.md#content) 组件来展示 Markdown 内容：

```vue
<template>
  <div>
    <Content />
  </div>
</template>
```

`404` 布局会被用于 `404.html` 页面：

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
