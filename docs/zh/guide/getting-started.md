# 快速上手

::: warning
VuePress v2 目前仍处于 `beta` 阶段。你已经可以用它来构建你的站点，但是它的配置和 API 还不够稳定，很可能会在 Minor 版本中发生 Breaking Changes 。因此，在每次更新 beta 版本之后，请一定要仔细阅读 [更新日志](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md)。
:::

## 依赖环境

- [Node.js v16.19.0+](https://nodejs.org/)
- [Yarn v1 classic](https://classic.yarnpkg.com/zh-Hans/) （可选）

::: tip

- 使用 [pnpm](https://pnpm.io/zh/) 时，你可能需要安装 `vue` 和 `@vuepress/client` 作为 peer-dependencies ，即 `pnpm add -D vue @vuepress/client@next` 。
- 使用 [yarn 2](https://yarnpkg.com/) 时，你需要在 [`.yarnrc.yml`](https://yarnpkg.com/configuration/yarnrc#nodeLinker) 文件中设置 `nodeLinker: 'node-modules'` 。
  :::

## 手动安装

这一章节会帮助你从头搭建一个简单的 VuePress 文档网站。如果你想在一个现有项目中使用 VuePress 管理文档，从步骤 3 开始。

- **步骤 1**: 创建并进入一个新目录

```bash
mkdir vuepress-starter
cd vuepress-starter
```

- **步骤 2**: 初始化项目

<CodeGroup>
  <CodeGroupItem title="PNPM" active>

```bash
git init
pnpm init
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash
git init
yarn init
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
git init
npm init
```

  </CodeGroupItem>
</CodeGroup>

- **步骤 3**: 将 VuePress 安装为本地依赖

<CodeGroup>
  <CodeGroupItem title="PNPM" active>

```bash
pnpm add -D vuepress@next @vuepress/client@next vue
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash
yarn add -D vuepress@next
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install -D vuepress@next
```

  </CodeGroupItem>
</CodeGroup>

- **步骤 4**: 在 `package.json` 中添加一些 [scripts](https://classic.yarnpkg.com/zh-Hans/docs/package-json#toc-scripts)

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

- **步骤 5**: 将默认的临时目录和缓存目录添加到 `.gitignore` 文件中

```bash
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

- **步骤 6**: 创建你的第一篇文档

```bash
mkdir docs
echo '# Hello VuePress' > docs/README.md
```

- **步骤 7**: 在本地启动服务器来开发你的文档网站

<CodeGroup>
  <CodeGroupItem title="PNPM" active>

```bash
pnpm docs:dev
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash
yarn docs:dev
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm run docs:dev
```

  </CodeGroupItem>
</CodeGroup>

VuePress 会在 [http://localhost:8080](http://localhost:8080) 启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新。

现在，你应该已经有了一个简单可用的 VuePress 文档网站。接下来，了解一下 VuePress [配置](./configuration.md) 相关的内容。
