# theme-data

<NpmBadge package="@vuepress/plugin-theme-data" />

为你的主题提供配置数据，包含 VuePress 的 [多语言支持](../../guide/i18n.md) 。

该插件主要用于开发主题，并且已经集成到默认主题中。大部分情况下你不需要直接使用它。

对于主题作者，该插件可以提供与 VuePress 及默认主题相同的多语言支持机制。但是如果你的主题不需要提供多语言支持，或者你想用你自己的方式来实现多语言支持，那么你不需要使用该插件。

## 使用方法

```bash
npm i -D @vuepress/plugin-theme-data@next
```

```ts
import { themeDataPlugin } from '@vuepress/plugin-theme-data'

export default {
  plugins: [
    themeDataPlugin(),
  ],
}
```

## 客户端 API

### defineThemeData

- 详情：

  在你的 [客户端配置文件](../../guide/configuration.md#客户端配置文件) 中设置主题数据。

- 示例：

```ts
// .vuepress/client.ts
import { defineClientConfig } from '@vuepress/client'
import { defineThemeData, type ThemeData } from '@vuepress/plugin-theme-data/client'

type MyThemeData = ThemeData<{
  foo: string
}>

defineThemeData<MyThemeData>({
  foo: 'foo',
  locales: {
    '/zh/': {
      foo: 'zh-foo',
    },
  },
})

export default defineClientConfig()
```

### useThemeData

- 详情：

  返回主题数据的 Ref 对象。
  
  通常情况下，用户在客户端配置中通过 [defineThemeData](#defineThemeData) 方法来设置主题数据，然后你可以在主题中通过 `useThemeData` 来使用主题数据。

- 示例：

```ts
import { useThemeData, type ThemeData } from '@vuepress/plugin-theme-data/client'

type MyThemeData = ThemeData<{
  foo: string
}>

export default {
  setup() {
    const themeData = useThemeData<MyThemeData>()
    console.log(themeData.value)
  },
}
```

### useThemeLocaleData

- 详情：

  返回当前 locale 下主题数据的 Ref 对象。

  当前 locale 中的字段已被合并到顶层字段中。

- 示例：

```ts
import { useThemeData, type ThemeData } from '@vuepress/plugin-theme-data/client'

type MyThemeData = ThemeData<{
  foo: string
}>

export default {
  setup() {
    const themeLocaleData = useThemeLocaleData<MyThemeData>()
    console.log(themeLocaleData.value)
  },
}
```
