# external-link-icon

<NpmBadge package="@vuepress/plugin-external-link-icon" />

该插件会为你 Markdown 内容中的外部链接添加一个图标，即 <ExternalLinkIcon />

该插件已经集成到默认主题中。

## 安装

```bash
npm i -D @vuepress/plugin-external-link-icon@next
```

## 配置项

### locales

- 类型： `Record<string, { openInNewWindow: string }>`

- 详情：

  外部链接图标在不同 locales 下的 A11y 文字。

  如果没有指定该配置项，它会降级使用默认文字。

- 示例：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/plugin-external-link-icon',
      {
        locales: {
          '/': {
            openInNewWindow: 'open in new window',
          },
          '/zh/': {
            openInNewWindow: '在新窗口打开',
          },
        },
      },
    ],
  ],
}
```

- 参考：
  - [指南 > 多语言支持](../../guide/i18n.md)

## Frontmatter

### externalLinkIcon

- 类型： `boolean`

- 详情：

  是否在当前页面的外部链接的后面添加外部链接图标。

## 样式

你可以通过 CSS 变量来自定义外部链接图标的样式：

@[code css](@vuepress/plugin-external-link-icon/src/client/styles/vars.css)

## 组件

### ExternalLinkIcon

- 详情：

  该插件会全局注册一个 `<ExternalLinkIcon />` 组件，你可以不传入任何 Props 来使用它。

::: tip
该组件主要用于主题开发。在大多数情况下你不需要直接使用该组件。
:::
