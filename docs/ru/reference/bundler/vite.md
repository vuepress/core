# Vite

<NpmBadge package="@vuepress/bundler-vite" />

Vite bundler is provided by [@vuepress/bundler-vite](https://www.npmjs.com/package/@vuepress/bundler-vite) package. It is a dependency of the [vuepress](https://www.npmjs.com/package/vuepress) package, and you can also install it separately.

```bash
npm i -D @vuepress/bundler-vite@next
```

## Options

Reference of vite bundler options:

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
