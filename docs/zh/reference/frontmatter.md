# Frontmatter

<NpmBadge package="@vuepress/client" />
<NpmBadge package="@vuepress/markdown" />

## date

- 类型： `string`

- 详情：

  页面的创建日期。

  应按照 `yyyy-MM-dd` 的格式来指定日期，或者遵循 [YAML Timestamp Type](https://yaml.org/type/timestamp.html) 。

- 参考：
  - [Node API > Page 属性 > date](./node-api.md#date)

## description

- 类型： `string`

- 详情：

  页面的描述。

  它将会覆盖站点配置中的 `description` 配置项。

- 参考：
  - [配置 > description](./config.md#description)

## head

- 类型： `HeadConfig[]`

- 详情：

  页面 `<head>` 标签内添加的额外标签。

- 示例：

```md
---
head:
  - - meta
    - name: foo
      content: yaml 数组语法
  - [meta, { name: bar , content: 方括号语法 }]
---
```

  渲染为：

```html
<head>
  <meta name="foo" content="yaml 数组语法" />
  <meta name="bar" content="方括号语法" />
</head>
```

- 参考：
  - [配置 > head](./config.md#head)

## lang

- 类型： `string`

- 详情：

  页面的语言。

  它将会覆盖站点配置中的 `lang` 配置项

- 参考：
  - [配置 > lang](./config.md#lang)
  - [Node API > Page 属性 > lang](./node-api.md#lang)

## layout

- 类型： `string`

- 详情：

  页面的布局。

  布局是由主题提供的。如果你不指定该 Frontmatter ，则会使用默认布局。你应该参考主题自身的文档来了解其提供了哪些布局。

  如果主题布局无法满足你的需求，你可以使用自定义布局组件。

- 示例：

在 `.vuepress/client.ts` 文件中注册一个布局组件：

```ts
import { defineClientConfig } from '@vuepress/client'
import CustomLayout from './CustomLayout.vue'

export default defineClientConfig({
  layouts: {
    CustomLayout,
  },
})
```

在 Frontmatter 中设置自定义布局：

```md
---
layout: CustomLayout
---
```

## permalink

- 类型： `string`

- 详情：

  页面的永久链接。

  它将会覆盖根据文件路径来决定的默认路由路径。

- 参考：
  - [Frontmatter > permalinkPattern](#permalinkpattern)
  - [指南 > 页面 > 路由](../guide/page.md#路由)
  - [Node API > Page 属性 > permalink](./node-api.md#permalink)

## permalinkPattern

- 类型： `string | null`

- 详情：

  为页面生成永久链接的 Pattern 。

  它将会覆盖站点配置中的 `permalinkPattern` 配置项。

  如果 Frontmatter 中设置了 `permalink` ，那么这个字段则不会生效。

- 使用：

  |  Pattern  |       描述        |
  |-----------|-------------------|
  | `:year`   | 创建日期的 年 部分 |
  | `:month`  | 创建日期的 月 部分 |
  | `:day`    | 创建日期的 日 部分 |
  | `:slug`   | 页面文件名的 Slug  |
  | `:raw`    | 原始路由路径       |

  `:year`, `:month` 和 `:day` Pattern 根据如下优先级进行解析：

  - Frontmatter 中的 `date` 字段。
  - 符合 `yyyy-MM-dd-foobar.md` 或 `yyyy-MM-foobar.md` 日期格式的文件名。
  - 符合 `yyyy/MM/dd/foobar.md` 或 `yyyy/MM/foobar.md` 日期格式的目录名。
  - 默认值 `0000-00-00` 。

- 示例 1 ：

  页面文件名是 `foo-bar.md` 。

  页面 Frontmatter 是：

```md
---
date: 2021-01-03
permalinkPattern: :year/:month/:day/:slug.html
---
```

  那么页面的永久链接将会是 `2021/01/03/foo-bar.html` 。

- 示例 2 ：

  页面文件名是 `2021-01-03-bar-baz.md`。

  页面 Frontmatter 是：

```md
---
permalinkPattern: :year/:month/:day/:slug.html
---
```

  那么页面的永久链接将会是 `2021/01/03/bar-baz.html` 。

- 参考：
  - [配置 > permalinkPattern](./config.md#permalinkpattern)
  - [Frontmatter > date](#date)
  - [Frontmatter > permalink](#permalink)
  - [Node API > Page 属性 > permalink](./node-api.md#permalink)

## routeMeta

- 类型： `Record<string, unknown>`

- 详情：

  附加到页面路由的自定义数据。

- 参考：
  - [Node API > Page 属性 > routeMeta](./node-api.md#routeMeta)

## title

- 类型： `string`

- 详情：

  页面的标题。

  如果你不在 Frontmatter 中设置 `title` ，那么页面中第一个一级标题（即 `# title`）的内容会被当作标题使用。

- 参考：
  - [Node API > Page 属性 > title](./node-api.md#title)
