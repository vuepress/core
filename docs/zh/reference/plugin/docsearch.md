# docsearch

<NpmBadge package="@vuepress/plugin-docsearch" />

将 [Algolia DocSearch](https://docsearch.algolia.com/) 集成到 VuePress 中，为你的文档网站提供搜索功能。

::: tip
当你正确配置该插件后，默认主题会把 DocSearch 按钮添加到导航栏。

该插件不一定能在其他主题中直接使用，因此你应参考主题本身的文档来获取更多信息。
:::

## 使用方法

```bash
npm i -D @vuepress/plugin-docsearch@next
```

```js
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')

module.exports = {
  plugins: [
    docsearchPlugin({
      // 配置项
    }),
  ],
}
```

## 获取搜索索引

你需要 [提交你的网站 URL](https://docsearch.algolia.com/apply/) 来加入 DocSearch 项目。当你的索引成功创建后， DocSearch 团队会将 [apiKey](#apikey) 和 [indexName](#indexname) 发送到你的邮箱。接下来，你就可以配置该插件，在 VuePress 中启用 DocSearch 了。

或者，你也可以 [运行你自己的爬虫](https://docsearch.algolia.com/docs/run-your-own/) 来创建索引，然后使用你自己的 [appId](#appId), [apiKey](#apikey) 和 [indexName](#indexname) 来配置该插件。

::: details 官方爬虫配置示例

```js{34-49,57}
new Crawler({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_API_KEY',
  rateLimit: 8,
  startUrls: [
    // 这是 Algolia 开始抓取网站的初始地址
    // 如果你的网站被分为数个独立部分，你可能需要在此设置多个入口链接
    'https://YOUR_WEBSITE_URL/',
  ],
  sitemaps: [
    // 如果你在使用 Sitemap 插件 (如: vuepress-plugin-sitemap2)，你可以提供 Sitemap 链接
    'https://YOUR_WEBSITE_URL/sitemap.xml',
  ],
  ignoreCanonicalTo: false,
  exclusionPatterns: [
    // 你可以通过它阻止 Algolia 抓取某些 URL
  ],
  discoveryPatterns: [
    // 这是 Algolia 抓取 URL 的范围
    'https://YOUR_WEBSITE_URL/**',
  ],
  // 爬虫执行的计划时间，可根据文档更新频率设置
  schedule: 'at 02:00 every 1 day',
  actions: [
    // 你可以拥有多个 action，特别是你在一个域名下部署多个文档时
    {
      // 使用适当的名称为索引命名
      indexName: 'YOUR_INDEX_NAME',
      // 索引生效的路径
      pathsToMatch: ['https://YOUR_WEBSITE_URL/**'],
      // 控制 Algolia 如何抓取你的站点
      recordExtractor: ({ $, helpers }) => {
        // @vuepress/theme-default 的选项
        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: '.sidebar-heading.active',
              defaultValue: 'Documentation',
            },
            lvl1: '.theme-default-content h1',
            lvl2: '.theme-default-content h2',
            lvl3: '.theme-default-content h3',
            lvl4: '.theme-default-content h4',
            lvl5: '.theme-default-content h5',
            lvl6: '.theme-default-content h6',
            content: '.theme-default-content p, .theme-default-content li',
          },
          indexHeadings: true,
        })
      },
    },
  ],
  initialIndexSettings: {
    // 控制索引如何被初始化，这仅当索引尚未生成时有效
    // 你可能需要在修改后手动删除并重新生成新的索引
    YOUR_INDEX_NAME: {
      attributesForFaceting: ['type', 'lang'],
      attributesToRetrieve: ['hierarchy', 'content', 'anchor', 'url'],
      attributesToHighlight: ['hierarchy', 'hierarchy_camel', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'hierarchy_radio', 'content'],
      searchableAttributes: [
        'unordered(hierarchy_radio_camel.lvl0)',
        'unordered(hierarchy_radio.lvl0)',
        'unordered(hierarchy_radio_camel.lvl1)',
        'unordered(hierarchy_radio.lvl1)',
        'unordered(hierarchy_radio_camel.lvl2)',
        'unordered(hierarchy_radio.lvl2)',
        'unordered(hierarchy_radio_camel.lvl3)',
        'unordered(hierarchy_radio.lvl3)',
        'unordered(hierarchy_radio_camel.lvl4)',
        'unordered(hierarchy_radio.lvl4)',
        'unordered(hierarchy_radio_camel.lvl5)',
        'unordered(hierarchy_radio.lvl5)',
        'unordered(hierarchy_radio_camel.lvl6)',
        'unordered(hierarchy_radio.lvl6)',
        'unordered(hierarchy_camel.lvl0)',
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy_camel.lvl1)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy_camel.lvl2)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy_camel.lvl3)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy_camel.lvl4)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy_camel.lvl5)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy_camel.lvl6)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom',
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
    },
  },
})
```

上述 `recordProps` 是用于默认主题的配置，你可以根据你使用的主题来修改它们。

注意 `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` 字段**必须**包含 `'lang'`，否则该插件将无法正常工作。

:::

::: tip
如果你使用的不是默认主题，或者在使用 Docsearch 的时候遇到了任何问题，你也可以检查上述的爬虫配置示例，然后前往 [Algolia Crawler](https://crawler.algolia.com/admin/crawlers/) 仓库，在你项目侧边栏中的 Editor 页面中修改你的配置。
:::

## 配置项

### apiKey

- 类型： `string`

- 是否必需： `true`

- 详情：

  从 DocSearch 团队收到的 `apiKey` ，或者由你自己生成。

- 参考：
  - [DocSearch > Options > apiKey](https://docsearch.algolia.com/docs/api#apikey)

### indexName

- 类型： `string`

- 是否必需： `true`

- 详情：

  从 DocSearch 团队收到的 `indexName` ，或者由你自己生成。

- 参考：
  - [DocSearch > Options > indexName](https://docsearch.algolia.com/docs/api#indexname)

### appId

- 类型： `string`

- 是否必需： `true`

- 详情：

  用于设置你的 Application ID。

- 参考：
  - [DocSearch > Options > appId](https://docsearch.algolia.com/docs/api#appid)

### searchParameters

- 类型： `SearchParameters`

- 详情：

  Algolia 搜索 API 参数。

- 参考：
  - [DocSearch > Options > searchParameters](https://docsearch.algolia.com/docs/api/#searchparameters)
  - [Algolia > Search API Parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/)

### placeholder

- 类型： `string`

- 默认值： `'Search docs'`

- 详情：

  搜索输入框的 placeholder 属性。

- 参考：
  - [DocSearch > Options > placeholder](https://docsearch.algolia.com/docs/api#placeholder)

### disableUserPersonalization

- 类型： `boolean`

- 默认值： `false`

- 详情：

  是否禁用所有的个性化功能：最近的搜索、收藏的搜索结果等。

- 参考：
  - [DocSearch > Options > disableUserPersonalization](https://docsearch.algolia.com/docs/api#disableuserpersonalization)

### initialQuery

- 类型： `string`

- 详情：

  打开弹窗时的初始请求。

- 参考：
  - [DocSearch > Options > initialQuery](https://docsearch.algolia.com/docs/api#initialquery)

### translations

- 类型： `Partial<DocSearchTranslations>`

- 详情：

  允许替换 DocSearch 按钮和弹窗内的默认文字。

- 参考：
  - [DocSearch > Options > translations](https://docsearch.algolia.com/docs/api/#translations)

### locales

- 类型： `Record<string, DocsearchPluginOptions>`

- 详情：

  在不同 locales 下对该插件进行不同的配置。

  该插件的所有其他选项都可以在 locale 中进行配置。

- 示例：

```js
module.exports = {
  plugins: [
    docsearchPlugin({
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>',
      locales: {
        '/': {
          placeholder: 'Search Documentation',
          translations: {
            button: {
              buttonText: 'Search Documentation',
            },
          },
        },
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
      },
    }),
  ],
}
```

- 参考：
  - [指南 > 多语言支持](../../guide/i18n.md)

## 样式

你可以通过 [@docsearch/css](https://docsearch.algolia.com/docs/styling) 提供的 CSS 变量来自定义样式：

```css
:root {
  --docsearch-primary-color: rgb(84, 104, 255);
  --docsearch-text-color: rgb(28, 30, 33);
  --docsearch-spacing: 12px;
  --docsearch-icon-stroke-width: 1.4;
  --docsearch-highlight-color: var(--docsearch-primary-color);
  --docsearch-muted-color: rgb(150, 159, 175);
  --docsearch-container-background: rgba(101, 108, 133, 0.8);
  --docsearch-logo-color: rgba(84, 104, 255);

  /* modal */
  --docsearch-modal-width: 560px;
  --docsearch-modal-height: 600px;
  --docsearch-modal-background: rgb(245, 246, 247);
  --docsearch-modal-shadow: inset 1px 1px 0 0 rgba(255, 255, 255, 0.5), 0 3px
      8px 0 rgba(85, 90, 100, 1);

  /* searchbox */
  --docsearch-searchbox-height: 56px;
  --docsearch-searchbox-background: rgb(235, 237, 240);
  --docsearch-searchbox-focus-background: #fff;
  --docsearch-searchbox-shadow: inset 0 0 0 2px var(--docsearch-primary-color);

  /* hit */
  --docsearch-hit-height: 56px;
  --docsearch-hit-color: rgb(68, 73, 80);
  --docsearch-hit-active-color: #fff;
  --docsearch-hit-background: #fff;
  --docsearch-hit-shadow: 0 1px 3px 0 rgb(212, 217, 225);

  /* key */
  --docsearch-key-gradient: linear-gradient(
    -225deg,
    rgb(213, 219, 228) 0%,
    rgb(248, 248, 248) 100%
  );
  --docsearch-key-shadow: inset 0 -2px 0 0 rgb(205, 205, 230), inset 0 0 1px 1px
      #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4);

  /* footer */
  --docsearch-footer-height: 44px;
  --docsearch-footer-background: #fff;
  --docsearch-footer-shadow: 0 -1px 0 0 rgb(224, 227, 232), 0 -3px 6px 0 rgba(69, 98, 155, 0.12);
}
```

## 组件

### Docsearch

- 详情：

  该插件会全局注册一个 `<Docsearch />` 组件，你可以不传入任何 Props 来使用它。

  将该组件放置在你想要显示 docsearch 按钮的地方。例如，默认主题将这个组件放在了导航栏的末尾。

::: tip
该组件主要用于主题开发。在大多数情况下你不需要直接使用该组件。
:::
