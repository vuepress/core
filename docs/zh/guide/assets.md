# 静态资源

## 相对路径

你可以在你的 Markdown 内容中使用相对路径来引用静态资源：

```md
![图片](./image.png)
```

一般情况下，我们推荐你使用这种方式来引用图片，因为人们通常会把图片放在引用它的 Markdown 文件附近。

## Public 文件

你可以把一些静态资源放在 Public 目录中，它们会被复制到最终生成的网站的根目录下。

默认的 Public 目录是 `.vuepress/public` ，可以通过 [public](../reference/config.md#public) 配置项来修改。

在下列这些情况中，你可能会用到它：

- 你可能需要提供一些静态资源，但是它们并不直接被你的 Markdown 文件引用，比如 favicon 和 PWA 图标。
- 你可能想要托管一些共享的静态资源，甚至可能需要在你的网站外部引用它，比如 Logo 图片。
- 你可能想在你的 Markdown 内容中通过绝对路径来引入图片。

以我们文档的源文件为例，我们把 VuePress 的 Logo 放在了 Public 目录下：

```bash
└─ docs
   ├─ .vuepress
   |  └─ public
   |     └─ images
   |        └─ hero.png  # <- Logo 文件
   └─ guide
      └─ assets.md       # <- 我们在这里
```

我们可以这样在当前页面引用 Logo ：

**Input**

```md
![VuePress Logo](/images/hero.png)
```

**Output**

![VuePress Logo](/images/hero.png)

### Base Helper

如果你的网站部署在非根路径下，例如 `https://foo.github.io/bar/` ，那么你应该把 [base](../reference/config.md#base) 设置为 `'/bar/'`。显然，此时你的 Public 文件会被部署在 `https://foo.github.io/bar/images/hero.png` 这样的链接下。

在大多数情况下，你不需要担心这些 Public 文件的引用路径，因为 VuePress 会自动帮你处理 `base` 前缀：

```md
<!-- 你不需要给 `/images/hero.png` 手动添加 `/bar/` 前缀 -->
![VuePress Logo](/images/hero.png)
```

然而，有些情况下，你可能会有一些指向 Public 文件的动态路径，尤其是在你开发一个自定义主题的时候。在这种情况下， `base` 无法被自动处理。为了解决这个问题，VuePress 提供了 [withBase](../reference/client-api.md#withbase) 工具函数，它可以帮助你添加 `base` 前缀：

```vue
<template>
  <img :src="withBase(logoPath)">
</template>

<script setup>
import { ref } from 'vue'
import { withBase } from '@vuepress/client'

const logoPath = ref('/images/hero.png')
</script>
```

你也可以通过 `$withBase` 来直接使用这个工具函数：

```md
<img :src="$withBase('/images/hero.png')" alt="VuePress Logo">
```

## 依赖包和路径别名

尽管这不是常见用法，但是你可以从依赖包中引用图片：

```bash
npm install -D package-name
```

```md
![来自依赖包的图片](package-name/image.png)
```

在配置文件中设置的路径别名也同样支持：

```js
module.exports = {
  alias: {
    '@alias': path.resolve(__dirname, './path/to/some/dir'),
  },
}
```

```md
![来自路径别名的图片](@alias/image.png)
```

::: tip
配置参考： [alias](../reference/plugin-api.md#alias)
:::
