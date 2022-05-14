# Configuration

## Config File

Without any configuration, the VuePress site is pretty minimal. To customize your site, let’s first create a `.vuepress` directory inside your docs directory. This is where all VuePress-specific files will be placed. Your project structure is probably like this:

```
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
```

The essential file for configuring a VuePress site is `.vuepress/config.js`, while TypeScript config file is also supported. You can use `.vuepress/config.ts` instead to get better types hint for VuePress config.

To be more specific, we have a convention for config file paths (in order of precedence):

- In current working directory `cwd`:
  - `vuepress.config.ts`
  - `vuepress.config.js`
  - `vuepress.config.cjs`
- In source directory `sourceDir`:
  - `.vuepress/config.ts`
  - `.vuepress/config.js`
  - `.vuepress/config.cjs`

You can also specify the config file via `--config` option of [CLI](./cli.md):

```sh
vuepress dev docs --config my-config.js
```

A basic config file looks like this:

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  lang: 'en-US',
  title: 'Hello, VuePress!',
  description: 'This is my first VuePress site',
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Hello VuePress',
  description: 'Just playing around',
})
```

  </CodeGroupItem>
</CodeGroup>

::: tip
Check out the [Config Reference](../reference/config.md) for a full list of VuePress config.
:::

## Client Config File

In most cases, the config file is sufficient to configure your VuePress site. However, sometimes users may want to add some client-side code directly. To help with this, VuePress also supports a client config file:

```
├─ docs
│  ├─ .vuepress
│  │  ├─ client.js   <--- client config file
│  │  └─ config.js   <--- config file
│  └─ README.md
├─ .gitignore
└─ package.json
```

Similarly, we also have a convention for client config file paths (in order of precedence):

- In current working directory `cwd`:
  - `vuepress.client.ts`
  - `vuepress.client.js`
  - `vuepress.client.mjs`
- In source directory `sourceDir`:
  - `.vuepress/client.ts`
  - `.vuepress/client.js`
  - `.vuepress/client.mjs`

Notice that the client config file should be in ESM format:

```ts
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: [],
})
```

::: tip
Unlike config file, client config file could not be specified via CLI options.

To learn more about client config file, see [Advanced > Cookbook > Usage of Client Config](../advanced/cookbook/usage-of-client-config.md)
:::
