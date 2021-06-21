# Vite

<NpmBadge package="@vuepress/bundler-vite" />

## Options

Reference of webpack bundler config, which can be set via [bundlerConfig](../config.md#bundlerconfig).

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

## Cautions

### Global Constant Replacement

We can define global constants via [define](../plugin-api.md#define) hook, and we also provide some [built-in constants](../client-api.md#constants). 

When using Vite in build mode, no matter where those constants appear, they will be [statically replaced](https://vitejs.dev/guide/env-and-mode.html#production-replacement), even in JavaScript strings and Vue templates.

Therefore, as a restriction of Vite, you should avoid "referencing" those global constants in your markdown content directly.

Plugin and theme authors should try to define constants as unique as possible to prevent users from unintentionally writing them in markdown content.
