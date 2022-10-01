# Extending

VuePress default theme is widely used by users, so it is designed to be extendable, allowing users to make their own customization with ease.

VuePress provides basic ability to extend a theme, but different themes may have different features to be extended. Thus, if you are using a community theme, you'd better refer to the theme's own documentation for how to extending it.

## Layout Slots

Default theme's `Layout` provides some slots:

- `navbar`
- `navbar-before`
- `navbar-after`
- `sidebar`
- `sidebar-top`
- `sidebar-bottom`
- `page`
- `page-top`
- `page-bottom`
- `page-content-top`
- `page-content-bottom`

With the help of them, you can add or replace content easily. Here comes an example to introduce how to extend default theme with layout slots.

Firstly, create a client config file `.vuepress/client.ts`:

```ts
import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  layouts: {
    Layout,
  },
})
```

Next, create the `.vuepress/layouts/Layout.vue`, and make use of the slots that provided by the `Layout` of default theme:

```vue
<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="my-footer">This is my custom page footer</div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.my-footer {
  text-align: center;
}
</style>
```

Then the default `Layout` layout has been overridden by your own local layout, which will add a custom footer to every normal pages in default theme (excluding homepage):

![extending-a-theme](/images/cookbook/extending-a-theme-01.png)

## Components Replacement

The layout slots are useful, but sometimes you might find it's not flexible enough. Default theme also provides the ability to replace a single component.

Default theme has registered [alias](../plugin-api.md#alias) for every [non-global components](https://github.com/vuepress/vuepress-next/tree/main/ecosystem/theme-default/src/client/components) with a `@theme` prefix. For example, the alias of `HomeFooter.vue` is `@theme/HomeFooter.vue`.

Then, if you want to replace the `HomeFooter.vue` component, just override the alias in your config file `.vuepress/config.ts`:

```ts
import { getDirname, path } from '@vuepress/utils'
import { defaultTheme, defineUserConfig } from 'vuepress'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  theme: defaultTheme(),
  alias: {
    '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
  },
})
```

## Developing a Child Theme

Instead of extending the default theme directly in `.vuepress/config.ts` and `.vuepress/client.ts`, you can also develop your own theme extending the default theme:

```ts
import type { Theme } from '@vuepress/core'
import { defaultTheme, type DefaultThemeOptions } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const childTheme = (options: DefaultThemeOptions): Theme => {
  return {
    name: 'vuepress-theme-child',
    extends: defaultTheme(options),

    // override layouts in child theme's client config file
    clientConfigFile: path.resolve(__dirname, './client.js'),

    // override component alias
    alias: {
      '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
    },
  }
}
```
