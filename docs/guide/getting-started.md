# Getting Started

::: warning
VuePress v2 is currently in `beta` stage. It's ready to be used for building your site, but the config and API are not stable enough, which is likely to have breaking changes between minor releases. So make sure to read the [changelog](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md) carefully each time you upgrade a beta version.
:::

## Prerequisites

- [Node.js v14.18.0+](https://nodejs.org/)
- [Yarn v1 classic](https://classic.yarnpkg.com/en/) (Optional)

::: tip
- With [pnpm](https://pnpm.io/), you may need to install `vue` and `@vuepress/client` as peer-dependencies, i.e. `pnpm add -D vue @vuepress/client@next`.
- With [yarn 2](https://yarnpkg.com/), you need to set `nodeLinker: 'node-modules'` in your [`.yarnrc.yml`](https://yarnpkg.com/configuration/yarnrc#nodeLinker) file.
:::

## Manual Installation

This section will help you build a basic VuePress documentation site from ground up. If you already have an existing project and would like to keep documentation inside the project, start from Step 3.

- **Step 1**: Create and change into a new directory

```bash
mkdir vuepress-starter
cd vuepress-starter
```

- **Step 2**: Initialize your project

<CodeGroup>
  <CodeGroupItem title="YARN" active>

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

- **Step 3**: Install VuePress locally

<CodeGroup>
  <CodeGroupItem title="YARN" active>

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

- **Step 4**: Add some [scripts](https://classic.yarnpkg.com/en/docs/package-json#toc-scripts) to `package.json`

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

- **Step 5**: Add the default temp and cache directory to `.gitignore` file

```bash
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

- **Step 6**: Create your first document

```bash
mkdir docs
echo '# Hello VuePress' > docs/README.md
```

- **Step 7**: Serve the documentation site in the local server

<CodeGroup>
  <CodeGroupItem title="YARN" active>

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

  VuePress will start a hot-reloading development server at [http://localhost:8080](http://localhost:8080). When you modify your markdown files, the content in the browser will be auto updated.

By now, you should have a basic but functional VuePress documentation site. Next, learn about the basics of [configuration](./configuration.md) in VuePress.
