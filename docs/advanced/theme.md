# Writing a Theme

::: tip
Before reading this guide, you'd better learn the guide of [Writing a Plugin](./plugin.md) first.
:::

## Create a Theme

A VuePress theme is a special plugin, which should satisfy the [Theme API](../reference/theme-api.md). Like plugins, a theme should also be a *Theme Object* or a *Theme Function*, and could be wrapped with a function to receive options:

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

The `layouts` field declares the layouts provided by your theme. A theme must provide at least two layouts: `Layout` and `404`. The former is to provide default layout for common pages, while the latter is to provide layout for 404 page.

The `Layout` layout should contain the [Content](../reference/components.md#content) component to display the markdown content:

```vue
<template>
  <div>
    <Content />
  </div>
</template>
```

The `404` layout will be used for the `404.html` page:

```vue
<template>
  <div>404 Not Found</div>
</template>
```

You can provide more layouts, and users can change layout via [layout](../reference/frontmatter.md#layout) frontmatter.

## Publish to NPM

Also, there are some conventions for theme in [package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json):

```json
{
  "name": "vuepress-theme-foo",
  "keywords": [
    "vuepress-theme"
  ]
}
```

- Set `name` to follow the naming convention: `vuepress-theme-xxx` or `@org/vuepress-theme-xxx`, which should be consistent with the [name](../reference/theme-api.md#name) field of the *Theme Object*.
- Set `keywords` to include `vuepress-theme`, so that users can search your theme on NPM.
