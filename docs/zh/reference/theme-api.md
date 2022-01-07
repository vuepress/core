# 主题 API

<NpmBadge package="@vuepress/core" />

VuePress 主题同样是一个插件，因此主题 API 可以接收 [插件 API](./plugin-api.md) 的所有选项，但存在以下差别：

## 基础配置项

### name

- 类型： `string`

- 详情：

  主题的名称。

  它应遵从如下命名约定：

  - 非 Scoped: `vuepress-theme-foo`
  - Scoped: `@org/vuepress-theme-foo`

### multiple

- 详情：

  主题永远不能被多次使用，因此不应设置该配置项。

## 主题特定配置项

### extends

- 类型： `string`

- 详情：

  要继承的主题名称。

  父主题的所有主题 API 都会被继承，但是子主题不会直接覆盖父主题。主题特定的配置项会根据以下规则进行覆盖：

  - [layouts](#layouts)： 当在子主题和父主题中注册了具有相同名称的布局时，则子主题的布局将具有更高的优先级。
  - [plugins](#plugins)： 当同一个插件在子主题和父主题中都被使用时，如果该插件不支持被多次使用，那么只有在子主题中使用的插件会生效。
  - [templateBuild](#templatebuild) / [templateDev](#templatedev)： 子主题的模板会覆盖父主题的模板。

  支持多级继承，即主题 B 可以继承主题 A ，然后主题 C 可以继承主题 B 。换句话说，一个主题可以有一个父主题、一个祖父主题等等。

- 示例：

```js
const { path } = require('@vuepress/utils')

module.exports = {
  // 继承默认主题
  extends: '@vuepress/theme-default',

  // 覆盖 `404` 布局
  layouts: {
    404: path.resolve(__dirname, 'path/to/404.vue'),
  },
}
```

### layouts

- 类型： `string | Record<string, string>`

- 详情：

  指定主题的布局组件。

  它可以接收布局目录的绝对路径。该目录下的所有 `.vue,.ts,.js` 文件都会被注册为布局组件。

  它还可以接收一个普通对象，其键是布局名称，值是布局文件的绝对路径。

  一个主题必须至少有两个布局： `Layout` 和 `404` 。

- 示例：

布局目录：

```bash
layouts
├─ Layout.vue
├─ 404.vue
└─ FooBar.vue
```

使用布局目录的绝对路径：

```js
const { path } = require('@vuepress/utils')

module.exports = {
  layouts: path.resolve(__dirname, 'path/to/layouts'),
}
```

使用普通对象是等效的：

```js
const { path } = require('@vuepress/utils')

module.exports = {
  layouts: {
    Layout: path.resolve(__dirname, 'path/to/layouts/Layout.vue'),
    404: path.resolve(__dirname, 'path/to/layouts/404.vue'),
    FooBar: path.resolve(__dirname, 'path/to/layouts/FooBar.vue'),
  },
}
```

### plugins

- 类型： `PluginConfig[]`

- 详情：

  主题中要使用的插件。

- 参考：
  - [配置 > plugins](./config.md#plugins)

### templateBuild

- 类型： `string`

- 详情：

  指定构建时使用的 HTML 模板。

  它会覆盖 [templateBuild](./config.md#templatebuild) 的默认值，但是也会被用户配置覆盖。

- 参考：
  - [配置 > templateBuild](./config.md#templatebuild)

### templateDev

- 类型： `string`

- 详情：

  指定开发时使用的 HTML 模板。

  它会覆盖 [templateDev](./config.md#templatedev) 的默认值，但是也会被用户配置覆盖。

- 参考：
  - [配置 > templateDev](./config.md#templatedev)
