# Client API

<NpmBadge package="@vuepress/client" />

Client API is provided by [@vuepress/client](https://www.npmjs.com/package/@vuepress/client) package, which is used for developing client files.

## Composition API

### usePageData

- Details:

  Returns the page data ref object of current page.

- Also see:
  - [Node API > Page Properties > data](./node-api.md#data)
  - [Plugin API > extendsPage](./plugin-api.md#extendspage)

### usePageFrontmatter

- Details:

  Returns the frontmatter ref object of current page.

  The value is the `frontmatter` property of the page data.

### usePageHead

- Details:

  Returns the head config ref object of current page.

  The value is obtained by merging and deduplicating [head](./frontmatter.md#head) frontmatter and [head](./config.md#head) config.

### usePageHeadTitle

- Details:

  Returns the head title ref object of current page.

  The value is obtained by joining the page title and site title.

### usePageLang

- Details:

  Returns the language ref object of current page.

  The value is the `lang` property of the page data.

### useRouteLocale

- Details:

  Returns the locale path ref object of current route.

  The value is one of the keys of the [locales](./config.md#locales) config.

### useSiteData

- Details:

  Returns the site data ref object.

### useSiteLocaleData

- Details:

  Returns the site data ref object of current locale.

  The properties of current locale have been merged into the root-level properties.

## Helpers

### defineClientConfig

- Details:

  Helper for creating [clientConfigFile](./plugin-api.md#clientconfigfile).

- Also see:
  - [Advanced > Cookbook > Usage of Client Config](../advanced/cookbook/usage-of-client-config.md)

### withBase

- Details:

  Prefix URL with site [base](./config.md#base).

- Also see:
  - [Guide > Assets > Base Helper](../guide/assets.md#base-helper)

## Constants

There are some constants that available in the client side code.

To shim the types of these constants in client side code, add `@vuepress/client/types` to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@vuepress/client/types"]
  }
}
```

### `__VUEPRESS_VERSION__`

- Type: `string`

- Details:

  Version of VuePress core package.

### `__VUEPRESS_DEV__`

- Type: `boolean`

- Details:

  An environment flag indicating whether it is currently running in `dev` mode.

### `__VUEPRESS_SSR__`

- Type: `boolean`

- Details:

  An environment flag indicating whether it is currently running in server-side-rendering (SSR) build.

## Advanced

### resolvers <Badge text="experimental" />

- Type: `Record<string, Function>`

- Details:

  An reactive object, methods of which determining how to resolve global computed.

- Example:

Customizing the format of `<title>` in client config file:

```ts
import { defineClientConfig, resolvers } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    resolvers.resolvePageHeadTitle = (page, siteLocale) =>
      `${siteLocale.title} > ${page.title}`
  },
})
```

::: danger
`resolvers` will affect the basic functionality of VuePress. Please make sure you have fully understood its purpose before modifying it.
:::
