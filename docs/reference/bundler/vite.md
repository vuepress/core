# Vite

<NpmBadge package="@vuepress/bundler-vite" />

Vite bundler is provided by [@vuepress/bundler-vite](https://www.npmjs.com/package/@vuepress/bundler-vite) package. It is a dependency of the [vuepress](https://www.npmjs.com/package/vuepress) package, and you can also install it separately.

```bash
npm i -D @vuepress/bundler-vite@next
```

## Options

Reference of vite bundler options:

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
const { viteBundler } = require('@vuepress/bundler-vite')

module.exports = {
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from '@vuepress/cli'

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
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

## FAQ

### SSR Externals Issue

When you are importing a third-party library (called `foo-lib`), a common error your might meet in build is:

```sh
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /path/to/foo-lib
```

To get grid of it, you need to set `ssr.noExternal` option:

```ts
export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      // @ts-expect-error: vite does not provide types for ssr options yet
      ssr: {
        noExternal: ['foo-lib'],
      },
    },
  }),
})
```

VuePress is using Vite server-side rendering (SSR) to pre-render markdown to HTML files. Although it's quite usable and work well with VuePress, it's still marked as experimental and might have some issues. To fully understand what the above error is, reading [Vite SSR Externals Guide](https://vitejs.dev/guide/ssr.html#ssr-externals) would be helpful.
