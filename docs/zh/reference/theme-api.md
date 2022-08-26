# 主题 API

<NpmBadge package="@vuepress/core" />

VuePress 主题同样是一个插件，因此主题 API 可以接收 [插件 API](./plugin-api.md) 的所有选项，但存在以下差别：

## 基础配置项

### name

- 类型： `string`

- 详情：

  主题的名称。

  它应遵从如下命名约定，并且在发布到 NPM 时应确保和包名保持一致：

  - 非 Scoped: `vuepress-theme-foo`
  - Scoped: `@org/vuepress-theme-foo`

### multiple

- 详情：

  主题永远不能被多次使用，因此主题 API 不支持该配置项。

## 主题特定配置项

### extends

- 类型： `Theme`

- 详情：

  要继承的主题。

  父主题的所有主题 API 都会被继承，但是子主题不会直接覆盖父主题。主题特定的配置项会根据以下规则进行覆盖：

  - [plugins](#plugins)： 当同一个插件在子主题和父主题中都被使用时，如果该插件不支持被多次使用，那么只有在子主题中使用的插件会生效。
  - [templateBuild](#templatebuild) / [templateDev](#templatedev)： 子主题的模板会覆盖父主题的模板。

  支持多级继承，即主题 B 可以继承主题 A ，然后主题 C 可以继承主题 B 。换句话说，一个主题可以有一个父主题、一个祖父主题等等。

- 示例：

```ts
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  // 继承默认主题
  extends: defaultTheme(),
}
```

### plugins

- 类型： `(Plugin | Plugin[])[]`

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
