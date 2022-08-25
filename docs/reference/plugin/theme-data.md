# theme-data

<NpmBadge package="@vuepress/plugin-theme-data" />

Provide config data for your theme, with VuePress [i18n](../../guide/i18n.md) support.

This plugin is mainly used to develop themes, and has been integrated into the default theme. You won't need to use it directly in most cases.

For theme authors, this plugin will help you to use the same i18n mechanism as VuePress and the default theme. But if you don't want to provide i18n support, or you want to implement in your own way, you don't need this plugin.

## Usage

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

## Client API

### defineThemeData

- Details:

  Set theme data in your [client config file](../../guide/configuration.md#client-config-file).

- Example:

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

- Details:

  Returns the theme data ref object.

  Typically, users will set theme data via [defineThemeData](#defineThemeData) method in their client config, and you can use theme data via `useThemeData` in your theme.

- Example:

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

- Details:

  Returns the theme data ref object in current locale.

  The properties of current locale has been merged into the root-level properties.

- Example:

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
