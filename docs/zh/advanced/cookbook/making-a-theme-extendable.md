# 开发一个可继承的主题

有时用户可能希望对一个主题进行一些小改动，但是又不想 Fork 并修改整个项目。

借助于 [主题 API](../../reference/theme-api.md) ，你可以让用户继承你的主题，允许用户对你的主题进行改动。

你肯定已经知道了如何 [继承默认主题](../../reference/default-theme/extending.md) 。接下来我们将介绍如何让你的主题像默认主题一样被用户继承。

## 布局插槽

这种方式需要你来决定主题的哪些部分是可以被扩展的，它更适合用于一些常见的自定义需求，比如页眉或页脚。

你只需要在你的布局文件中提供 slots ，并告诉用户如何使用它们即可：

```vue
<template>
  <div class="my-theme-layout">
    <slot name="page-header" />
    <Content />
    <slot name="page-footer" />
  </div>
</template>
```

## 组件别名

这种方式需要你考虑清楚你的主题的哪些组件可以被替换，并且你需要将组件拆分到合适的粒度。

首先，为你主题的可替换组件设置 `alias` 别名：

```js
module.exports = {
  name: 'vuepress-theme-foo',
  alias: {
    // 为可替换的组件设置别名
    '@theme/Navbar.vue': path.resolve(__dirname, 'components/Navbar.vue'),
    '@theme/Sidebar.vue': path.resolve(__dirname, 'components/Sidebar.vue'),
  },
}
```

然后，在你的主题中通过别名来使用这些组件：

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

这样，用户在继承或使用你的主题时，就可以通过覆盖 `alias` 来替换特定的组件了。
