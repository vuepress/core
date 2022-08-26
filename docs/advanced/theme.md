# Writing a Theme

::: tip
Before reading this guide, you'd better learn the guide of [Writing a Plugin](./plugin.md) first.
:::

## Create a Theme

A VuePress theme is a special plugin, which should satisfy the [Theme API](../reference/theme-api.md). Like plugins, a theme should also be a *Theme Object* or a *Theme Function*, and could be wrapped with a function to receive options:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

const fooTheme = (options) => {
  // returns a theme object
  return {
    name: 'vuepress-theme-foo',

    // path to the client config of your theme
    clientConfigFile: path.resolve(__dirname, 'client.js'),

    // set custom dev / build template
    // if the template is not specified, the default template from `@vuepress/client` will be used
    templateBuild: path.resolve(__dirname, 'templates/build.html'),
    templateDev: path.resolve(__dirname, 'templates/dev.html'),

    // use plugins
    plugins: [
      // ...
    ],

    // other plugin APIs are also available
  }
}

const barTheme = (options) => {
  // returns a theme function
  return (app) => {
    return {
      name: 'vuepress-theme-bar',
      // ...
    }
  }
}
```

Then, create theme's client config file `client.js` :

```ts
import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'

export default defineClientConfig({
  layouts: {
    Layout,
    NotFound,
  },
})
```

The `layouts` field declares the layouts provided by your theme. A theme must provide at least two layouts: `Layout` and `NotFound`. The former is to provide default layout for common pages, while the latter is to provide layout for 404-not-found page.

The `Layout` layout should contain the [Content](../reference/components.md#content) component to display the markdown content:

```vue
<template>
  <div>
    <Content />
  </div>
</template>
```

The `NotFound` layout will be used for the `404.html` page:

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
