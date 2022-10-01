# docsearch

<NpmBadge package="@vuepress/plugin-docsearch" />

Integrate [Algolia DocSearch](https://docsearch.algolia.com/) into VuePress, which can provide search to your documentation site.

::: tip
Default theme will add DocSearch to the navbar once you configure this plugin correctly.

This plugin may not be used directly in other themes, so you'd better refer to the documentation of your theme for more details.
:::

## Usage

```bash
npm i -D @vuepress/plugin-docsearch@next
```

```ts
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  plugins: [
    docsearchPlugin({
      // options
    }),
  ],
}
```

## Get Search Index

You need to [submit the URL of your site](https://docsearch.algolia.com/apply/) to join the DocSearch program. The DocSearch team will send [apiKey](#apikey) and [indexName](#indexname) to your email once the index is generated. Then you can configure this plugin to enable DocSearch in VuePress.

Alternatively, you can [run your own crawler](https://docsearch.algolia.com/docs/run-your-own/) to generate the index, and then use your own [appId](#appId), [apiKey](#apikey) and [indexName](#indexname) to configure this plugin.

::: details Official crawler config

```js{35-50,59}
new Crawler({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_API_KEY',
  rateLimit: 8,
  startUrls: [
    // These are urls which algolia start to craw
    // If your site is divided in to mutiple parts,
    // you may want to set mutiple entry links
    'https://YOUR_WEBSITE_URL/',
  ],
  sitemaps: [
    // if you are using sitemap plugins (e.g.: vuepress-plugin-sitemap2), you may provide one
    'https://YOUR_WEBSITE_URL/sitemap.xml',
  ],
  ignoreCanonicalTo: false,
  exclusionPatterns: [
    // You can use this to stop algolia crawing some paths
  ],
  discoveryPatterns: [
    // These are urls which algolia looking for,
    'https://YOUR_WEBSITE_URL/**',
  ],
  // Crawler schedule, set it according to your docs update frequency
  schedule: 'at 02:00 every 1 day',
  actions: [
    // you may have mutiple actions, especially when you are deploying mutiple docs under one domain
    {
      // name the index with name you like
      indexName: 'YOUR_INDEX_NAME',
      // paths where the index take effect
      pathsToMatch: ['https://YOUR_WEBSITE_URL/**'],
      // controls how algolia extracts records from your site
      recordExtractor: ({ $, helpers }) => {
        // options for @vuepress/theme-default
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
    // controls how index are initialized
    // only has effects before index are initialize
    // you may need to delete your index and recraw after modification
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

The above `recordProps` is the configuration used for the default theme. You can modify them according to the theme you are using.

Notice that the `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` fields must include `'lang'` to make this plugin work properly.
:::

::: tip
If you are not using default theme, or you meet any problems when using docsearch, you can also check the above example crawler config, and ahead to [Algolia Crawler](https://crawler.algolia.com/admin/crawlers/), and edit your config with 'Editor' panel in project sidebar.
:::

## Options

### apiKey

- Type: `string`

- Required: `true`

- Details:

  The `apiKey` that you received from the DocSearch team, or generated by yourself.

- Also see:
  - [DocSearch > Options > apiKey](https://docsearch.algolia.com/docs/api#apikey)

### indexName

- Type: `string`

- Required: `true`

- Details:

  The `indexName` that you received from the DocSearch team, or generated by yourself.

- Also see:
  - [DocSearch > Options > indexName](https://docsearch.algolia.com/docs/api#indexname)

### appId

- Type: `string`

- Required: `true`

- Details:

  It defines your own application ID.

- Also see:
  - [DocSearch > Options > appId](https://docsearch.algolia.com/docs/api#appid)

### searchParameters

- Type: `SearchParameters`

- Details:

  Parameters of Algolia Search API.

- Also see:
  - [DocSearch > Options > searchParameters](https://docsearch.algolia.com/docs/api/#searchparameters)
  - [Algolia > Search API Parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/)

### placeholder

- Type: `string`

- Default: `'Search docs'`

- Details:

  The placeholder attribute of the search input.

- Also see:
  - [DocSearch > Options > placeholder](https://docsearch.algolia.com/docs/api/#placeholder)

### disableUserPersonalization

- Type: `boolean`

- Default: `false`

- Details:

  Whether to disable all personalized features: recent searches, favorite searches, etc.

- Also see:
  - [DocSearch > Options > disableUserPersonalization](https://docsearch.algolia.com/docs/api/#disableuserpersonalization)

### initialQuery

- Type: `string`

- Details:

  The initial query when the modal opens.

- Also see:
  - [DocSearch > Options > initialQuery](https://docsearch.algolia.com/docs/api/#initialquery)

### translations

- Type: `Partial<DocSearchTranslations>`

- Details:

  Allow replacing the default text in the DocSearch button or modal.

- Also see:
  - [DocSearch > Options > translations](https://docsearch.algolia.com/docs/api/#translations)

### locales

- Type: `Record<string, DocsearchPluginOptions>`

- Details:

  Options of this plugin in different locales.

  All other options of this plugin are acceptable in locale config.

- Example:

```ts
export default {
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

- Also see:
  - [Guide > I18n](../../guide/i18n.md)

## Styles

You can customize styles via CSS variables that provided by [@docsearch/css](https://docsearch.algolia.com/docs/styling):

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

## Components

### Docsearch

- Details:

  This plugin will register a `<Docsearch />` component globally, and you can use it without any props.

  Put this component to where you want to place the docsearch button. For example, default theme puts this component to the end of the navbar.

::: tip
This component is mainly used for theme development. You don't need to use it directly in most cases.
:::
