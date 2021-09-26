# Vite

<NpmBadge package="@vuepress/bundler-vite" />

Vite bundler is provided by [@vuepress/bundler-vite](https://www.npmjs.com/package/@vuepress/bundler-vite) package. It is a dependency of the [vuepress-vite](https://www.npmjs.com/package/vuepress-vite) package, and you can also install it separately.

```bash
npm i -D @vuepress/bundler-vite@next
```

## Options

Reference of vite bundler config, which can be set via [bundlerConfig](../config.md#bundlerconfig).

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  // when using vuepress-vite package, you can omit this field
  // because vite is the default bundler
  bundler: '@vuepress/bundler-vite',
  // bundler options
  bundlerConfig: {
    // see below
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import { defineUserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // when using vuepress-vite package, you can omit this field
  // because vite is the default bundler
  bundler: '@vuepress/bundler-vite',
  // options for vite bundler
  bundlerConfig: {
    // see below
  },
})
```

  </CodeGroupItem>
</CodeGroup>

### viteOptions

- Details:

  Accepts all options of Vite.

- Also see:
  - [Vite > Config](https://vitejs.dev/config/)

### vuePluginOptions

- Details:

  Accepts all options of [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue).

- Also see:
  - [Vite > Plugins > Official Plugins](https://vitejs.dev/plugins/#vitejs-plugin-vue)
