# 继承

VuePress 默认主题有着大量的用户，因此我们对它进行了一些便于继承的设计，以便用户轻松进行定制化。

VuePress 提供了继承主题的基础能力，但不同的主题可能会提供不同的可继承的功能。因此，如果你使用的是一个社区主题的话，你最好参考主题本身的文档来了解如何继承它。

## 布局插槽

默认主题的 `Layout` 布局提供了一些插槽：

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

在它们的帮助下，你可以很容易地添加或替换内容。下面通过一个示例来介绍一下如何使用布局插槽来继承默认主题。

首先，创建一个客户端配置文件 `.vuepress/client.ts` ：

```ts
import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  layouts: {
    Layout,
  },
})
```

接下来，创建 `.vuepress/layouts/Layout.vue` ，并使用由默认主题的 `Layout` 布局提供的插槽：

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

此时默认的 `Layout` 布局已经被你的本地布局覆盖，将会在除了首页外的所有页面添加一个自定义的页脚：

![extending-a-theme](/images/cookbook/extending-a-theme-01.png)

## 组件替换

布局插槽十分实用，但有时候你可能会觉得它不够灵活。默认主题同样提供了替换单个组件的能力。

默认主题将所有 [非全局的组件](https://github.com/vuepress/vuepress-next/tree/main/ecosystem/theme-default/src/client/components) 都注册了一个带 `@theme` 前缀的 [alias](../plugin-api.md#alias) 。例如，`HomeFooter.vue` 的别名是 `@theme/HomeFooter.vue` 。

接下来，如果你想要替换 `HomeFooter.vue` 组件，只需要在配置文件 `.vuepress/config.ts` 中覆盖这个别名即可：

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

## 开发一个子主题

除了在 `.vuepress/config.ts` 和 `.vuepress/client.ts` 中直接扩展默认主题以外，你可以通过继承默认主题来开发一个你自己的主题：

```ts
import type { Theme } from '@vuepress/core'
import { defaultTheme, type DefaultThemeOptions } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const childTheme = (options: DefaultThemeOptions): Theme => {
  return {
    name: 'vuepress-theme-child',
    extends: defaultTheme(options),

    // 在子主题的客户端配置文件中覆盖布局
    clientConfigFile: path.resolve(__dirname, './client.js'),

    // 覆盖组件别名
    alias: {
      '@theme/HomeFooter.vue': path.resolve(__dirname, './components/MyHomeFooter.vue'),
    },
  }
}
```
