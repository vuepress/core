# Making a Theme Extendable

Sometimes users might want make some minor changes to a theme, but they don't want to fork and modify the entire project.

With the help of [Theme API](../../reference/theme-api.md), you can make your theme extendable, allowing users to make their own modifications easily.

You must have known that how to [extend default theme](../../reference/default-theme/extending.md). Here we'll introduce how to make your own theme extendable like default theme.

## Layout Slots

This approach requires you to determine which parts of your theme could be extended. It is more suitable for those common customizations like page footer or header.

You just need to provide slots in your layouts, and tell users how to make use of them:

```vue
<template>
  <div class="my-theme-layout">
    <slot name="page-header" />
    <Content />
    <slot name="page-footer" />
  </div>
</template>
```

## Component Aliases

This approach requires you to consider which components of your theme should be replaceable, and you also need to split components into a suitable granularity.

First, set `alias` for replaceable components of you theme:

```js
module.exports = {
  name: 'vuepress-theme-foo',
  alias: {
    // set alias for replaceable components
    '@theme/Navbar.vue': path.resolve(__dirname, 'components/Navbar.vue'),
    '@theme/Sidebar.vue': path.resolve(__dirname, 'components/Sidebar.vue'),
  },
}
```

Next, use those components via aliases in your theme:

```vue
<script setup lang="ts">
import Navbar from '@theme/Navbar.vue'
import Sidebar from '@theme/Sidebar.vue'
</script>

<template>
  <div class="my-theme-layout">
    <Navbar />
    <Sidebar />
    <Content />
  </div>
</template>
```

Then, users can replace specific components by overriding the `alias` when extending or using your theme.
