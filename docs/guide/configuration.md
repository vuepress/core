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

The essential file for configuring a VuePress site is `.vuepress/config.js`, while TypeScript config file is also supported. You can use `.vuepress/config.ts` instead to get better types hint for VuePress Config.

To be more specific, we have a convention for config file paths (in order of precedence):

- In current working directory `cwd`:
  - `vuepress.config.ts`
  - `vuepress.config.js`
- In source directory `sourceDir`:
  - `.vuepress/config.ts`
  - `.vuepress/config.js`

You can also specify the config file via `--config` option of [CLI](./cli.md).

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
