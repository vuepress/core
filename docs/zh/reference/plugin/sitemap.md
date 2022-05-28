# sitemap

<NpmBadge package="@vuepress/plugin-sitemap" />

为你的 VuePress 项目生成 Sitemap。默认情况下，Sitemap 会包含项目内所有除 404 外的所有页面。

## 使用方法

```bash
npm i -D @vuepress/plugin-sitemap@next
```

```js
const { sitemapPlugin } = require('@vuepress/plugin-sitemap')

module.exports = {
  plugins: [
    sitemapPlugin({
      // 配置项
    }),
  ],
}
```

## Sitemap 介绍

网站地图 (Sitemap) 提供搜索引擎优化 (SEO):

- 为搜索引擎爬虫提供可以浏览整个网站的链接；
- 为搜索引擎爬虫提供一些链接，指向动态页面或者采用其他方法比较难以到达的页面；
- 如果访问者试图访问网站所在域内并不存在的 URL，那么这个访问者就会被转到“无法找到文件”的错误页面，而网站地图可以作为导航页。

网站地图通过使所有页面可被找到来增强搜索引擎优化的效果。

大部分搜索引擎只跟踪页面内有限数量的链接，因此当网站非常大的时候，网站地图对于使搜索引擎和访问者可以访问网站中的所有内容就变得必不可少了。

Sitemaps 是站点管理员向搜索引擎爬虫公布站点可被抓取页面的协议，sitemap 文件内容必须遵循 XML 格式的定义。每个 URL 可以包含更新的周期和时间、URL 在整个站点中的优先级。这样可以让搜索引擎更佳有效的抓取网站内容。

::: warning 同步配置 robots.txt

由于 Sitemap 面向搜索引擎，配合此插件使用时，你最好保证你在 `.vuepress/public` 文件夹下放置了有效的 `rotbot.txt`，以允许搜索引擎收录。一个最简单的 robots.txt 如下（允许所有搜索引擎访问所有路径）

```txt
User-agent: *

Allow: /
```

:::

## 配置项

### hostname

- 类型： `string`

- 必填: 是

- 详情：

  当前网站部署到的域名，插件需要此选项才能工作。

### extraUrls

- 类型： `string[]`

- 默认值： `[]`

- 详情：

  需要额外包含的网址。

  如果你有一些不包含在 VuePress 路由中的链接 (如：存放在 public 文件夹下的页面或其他插件或工具直接生成的页面)，你可能需要设置此项。

  例如：`['/about.html', '/api/']`

### excludeUrls

- 类型： `string[]`

- 默认值： `['/404.html']`

- 详情：

  不需要收录的页面路径，请以绝对路径开头。

  默认情况下 VuePress 自动生成的所有路径 (除 404 页) 都会被添加进 Sitemap。

### sitemapFilename

- 类型： `string`

- 默认值： `'sitemap.xml'`

- 详情：

  输出的文件名，相对于输出目录。

### changefreq

- 类型： `'always' | 'hourly' | 'daily' | 'weekly' |'monthly' | 'yearly' | 'never'`

- 默认值： `'daily'`

- 详情：

  页面默认更新频率，会被 Frontmatter 中的 [changefreq](#sitemap-changefreq) 选项覆盖。

### priority

- 类型： `number`

- 默认值： `0.5`

- 详情：

  页面优先级，范围 `0` 至 `1`。

### modifyTimeGetter

- 类型： `(page: Page) => string`

- 详情：

  最后修改事件的获得器，需要返回一个 ISO 字符形式的时间，默认会自动通过 Git 插件生成。

- 例子：

```ts
// 基于文件最后修改时间
{
  modifyTimeGetter: (page) =>
    fs.statSync(app.dir.source(page.filePathRelative)).mtime.toISOString()
}
```

## Frontmatter

### sitemap.changefreq

- 类型： `'always' | 'hourly' | 'daily' | 'weekly' |'monthly' | 'yearly' | 'never'`

- 默认值： `'daily'`

- 详情：

  页面默认更新频率。它会覆盖插件选项中的 [changefreq](#changefreq) 选项。

### sitemap.exclude

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否不输出此页面到 Sitemap

### sitemap.priority

- 类型： `number`

- 默认值： `0.5`

- 详情：

  页面优先级，范围 `0` 至 `1`。
