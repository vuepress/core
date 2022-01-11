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

With the help of them, you can add or replace content easily. Here comes an example to introduce how to extend default theme with layout slots.

Firstly, create the theme directory and the theme entry `.vuepress/theme/index.js`:

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
const { path } = require('@vuepress/utils')

module.exports = {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import type { ThemeObject } from '@vuepress/core'
import { path } from '@vuepress/utils'

const localTheme: ThemeObject = {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}

export default localTheme
```

  </CodeGroupItem>
</CodeGroup>

Your local theme will extend default theme, and override the `Layout` layout.

Next, create `.vuepress/theme/layouts/Layout.vue`, and make use of the slots that provided by the `Layout` of default theme:

```vue
<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
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

Finally, remember to use your local theme in `.vuepress/config.js`:

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
const { path } = require('@vuepress/utils')

module.exports = {
  theme: path.resolve(__dirname, './theme'),
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  theme: path.resolve(__dirname, './theme'),
})
```

  </CodeGroupItem>
</CodeGroup>

You will add a custom footer to every normal pages in default theme (excluding homepage):

![extending-a-theme](/images/cookbook/extending-a-theme-01.png)

## Components Replacement

The layout slots are useful, but sometimes you might find it's not flexible enough. Default theme also provides the ability to replace a single component.

Default theme has registered [alias](../plugin-api.md#alias) for every [non-global components](https://github.com/vuepress/vuepress-next/tree/main/packages/%40vuepress/theme-default/src/client/components) with a `@theme` prefix. For example, the alias of `HomeFooter.vue` is `@theme/HomeFooter.vue`.

Then, if you want to replace the `HomeFooter.vue` component, just override the alias:

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
const { path } = require('@vuepress/utils')

module.exports = {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  alias: {
    '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import type { ThemeObject } from '@vuepress/core'
import { path } from '@vuepress/utils'

const localTheme: ThemeObject = {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  alias: {
    '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
  },
}

export default localTheme
```

  </CodeGroupItem>
</CodeGroup>

In fact, you can even use components replacement without extending default theme. The [alias](../plugin-api.md#alias) option is part of [Plugin API](../plugin-api.md), so you only need to set the aliases in your config file to replace components.

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
const { path } = require('@vuepress/utils')

module.exports = {
  alias: {
    '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  alias: {
    '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
  },
})
```

  </CodeGroupItem>
</CodeGroup>
