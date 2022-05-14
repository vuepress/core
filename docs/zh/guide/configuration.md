# 配置

## 配置文件

如果没有任何配置，你的 VuePress 站点仅有一些最基础的功能。为了更好地自定义你的网站，让我们首先在你的文档目录下创建一个 `.vuepress` 目录，所有 VuePress 相关的文件都将会被放在这里。你的项目结构可能是这样：

```
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
```

VuePress 站点的基本配置文件是 `.vuepress/config.js` ，但也同样支持 TypeScript 配置文件。你可以使用 `.vuepress/config.ts` 来得到更好的类型提示。

具体而言，我们对于配置文件的路径有着约定（按照优先顺序）：

- 当前工作目录 `cwd` 下：
  - `vuepress.config.ts`
  - `vuepress.config.js`
  - `vuepress.config.cjs`
- 源文件目录 `sourceDir` 下：
  - `.vuepress/config.ts`
  - `.vuepress/config.js`
  - `.vuepress/config.cjs`

你也可以通过 [命令行接口](./cli.md) 的 `--config` 选项来指定配置文件：

```sh
vuepress dev docs --config my-config.js
```

一个基础的配置文件是这样的：

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
})
```

  </CodeGroupItem>
</CodeGroup>

::: tip
前往 [配置参考](../reference/config.md) 查看所有 VuePress 配置。
:::

## 客户端配置文件

在大多数情况下，配置文件已经足够帮助你配置好你的 VuePress 站点。不过，有些时候用户们可能希望直接添加一些客户端代码。 VuePress 通过客户端配置文件来支持这种需求：

```
├─ docs
│  ├─ .vuepress
│  │  ├─ client.js   <--- 客户端配置文件
│  │  └─ config.js   <--- 配置文件
│  └─ README.md
├─ .gitignore
└─ package.json
```

同样的，我们也有关于客户端配置文件的路径约定（按照优先顺序）：

- 当前工作目录 `cwd` 下：
  - `vuepress.client.ts`
  - `vuepress.client.js`
  - `vuepress.client.mjs`
- 源文件目录 `sourceDir` 下：
  - `.vuepress/client.ts`
  - `.vuepress/client.js`
  - `.vuepress/client.mjs`

需要注意的是，客户端配置文件需要使用 ESM 格式：

```ts
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: [],
})
```

::: tip
和配置文件不同，客户端配置文件不能通过命令行接口的选项来指定。

可以前往 [深入 > Cookbook > 客户端配置的使用方法](../advanced/cookbook/usage-of-client-config.md) 来了解更多信息。
:::
