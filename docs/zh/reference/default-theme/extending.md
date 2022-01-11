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

在它们的帮助下，你可以很容易地添加或替换内容。下面通过一个示例来介绍一下如何使用布局插槽来继承默认主题。

首先，创建主题目录和主题入口 `.vuepress/theme/index.js` ：

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

你的本地主题将会继承默认主题，并且覆盖 `Layout` 布局。

接下来，创建 `.vuepress/theme/layouts/Layout.vue` ，并使用由默认主题的 `Layout` 布局提供的插槽：

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

最后，记得在 `.vuepress/config.js` 中使用你的本地主题：

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

你将会在除了首页外的所有页面添加一个自定义的页脚：

![extending-a-theme](/images/cookbook/extending-a-theme-01.png)

## 组件替换

布局插槽十分实用，但有时候你可能会觉得它不够灵活。默认主题同样提供了替换单个组件的能力。

默认主题将所有 [非全局的组件](https://github.com/vuepress/vuepress-next/tree/main/packages/%40vuepress/theme-default/src/client/components) 都注册了一个带 `@theme` 前缀的 [alias](../plugin-api.md#alias) 。例如，`HomeFooter.vue` 的别名是 `@theme/HomeFooter.vue` 。

接下来，如果你想要替换 `HomeFooter.vue` 组件，只需要覆盖这个别名即可：

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

实际上，你不需要继承默认主题就可以进行组件替换。上面提到的 [alias](../plugin-api.md#alias) 配置项是 [插件 API](../plugin-api.md) 的一部分，因此你只需要在你的配置文件中设置别名就可以替换组件了：

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
