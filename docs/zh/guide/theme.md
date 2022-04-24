# 主题

VuePress 主题为你提供了布局、样式和其他功能，帮助你专注于 Markdown 内容的写作。

## 默认主题

VuePress 有一个开箱即用的默认主题，正使用在你当前正在浏览的文档网站上。

如果你不指定要使用的主题，那么就会自动使用默认主题。

为了配置默认主题，你需要在你的配置文件中通过 [theme](../reference/config.md#theme) 配置项来使用它：

```js
const { defaultTheme } = require('vuepress')

module.exports = {
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
    ],
  }),
}
```

默认主题为文档网站提供了基础且实用的功能，你可以前往 [默认主题配置参考](../reference/default-theme/config.md) 获取全部的配置列表。

然而，你可能觉得默认主题不够出色，又或者你不想搭建一个文档网站，而是一个其他类型的网站，比如博客。此时，你可以尝试使用社区主题或者创建本地主题。

## 社区主题

社区用户创建了很多主题，并将它们发布到了 [NPM](https://www.npmjs.com/search?q=keywords:vuepress-theme) 上。查看主题本身的文档可以获取更详细的指引。

## 本地主题

如果你想要使用自己的自定义主题，但是又不想发布它，你可以创建一个本地主题。前往 [深入 > 开发主题](../advanced/theme.md) 学习如何开发你自己的主题。
