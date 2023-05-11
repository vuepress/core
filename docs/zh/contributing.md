---
sidebar: auto
---

# 贡献指南

## 概览

项目仓库借助于 [pnpm 工作空间](https://pnpm.io/zh/workspaces) 来实现 [Monorepo](https://en.wikipedia.org/wiki/Monorepo) ，存放了多个互相关联的独立 Package 。

在 `packages` 目录下：

- `bundler-vite`: 基于 Vite 的 Bundler 模块。使用 Vite 对 VuePress App 执行 `dev` 和 `build` 操作。
- `bundler-webpack`: 基于 Webpack 的 Bundler 模块。使用 Webpack 对 VuePress App 执行 `dev` 和 `build` 操作。
- `cli`: 命令行接口 (CLI) 模块。包含解析用户配置文件、调用 `@vuepress/core` 创建 VuePress App 、执行对应命令等功能。
- `client`: Client 模块。包含客户端页面入口，并提供了客户端开发时可以用到的类型和工具函数。
- `core`: Core 模块。提供 Node API 来创建 VuePress App ，包括页面逻辑、插件系统、数据准备等功能。
- `markdown`: Markdown 模块。使用 `markdown-it` 作为 Markdown 解析器，并集成了一些 VuePress 中用到的插件。
- `shared`: 既可以在 Node 端使用、也可以在客户端使用的工具函数模块。
- `utils`: 仅可以在 Node 端使用的工具函数模块。

在 `ecosystem` 目录下：

- `plugin-${name}`: 官方插件。
- `theme-default`: 默认主题。
- `vuepress`: 是 `vuepress-vite` 的封装。
- `vuepress-vite`: 是 `@vuepress/cli` + `@vuepress/bundler-vite` + `@vuepress/theme-default` 的封装。如果用户想使用 默认主题 + Vite ，仅安装这个 Package 就可以了。
- `vuepress-webpack`: 是 `@vuepress/cli` + `@vuepress/bundler-webpack` + `@vuepress/theme-default` 的封装。如果用户想使用 默认主题 + Webpack ，仅安装这个 Package 就可以了。

## 开发配置

开发要求：

- [Node.js](http://nodejs.org) **version 18.16.0+**
- [pnpm](https://pnpm.io/zh/) **version 8+**

克隆代码仓库，并安装依赖：

```bash
pnpm install
```

构建源代码：

```bash
pnpm build
```

开始开发项目文档网站：

```bash
pnpm docs:dev
```

本项目开发使用的一些主要工具：

- [TypeScript](https://www.typescriptlang.org/) 作为开发语言
- [Vitest](https://vitest.dev/) 用于单元测试
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) 用于代码检查和格式化

## 开发脚本

### `pnpm build`

`build` 命令会使用 `tsc` 和 `tsup` 将 TypeScript 源文件编译为 JavaScript 文件。

此外，它还会将必要的资源文件从源文件目录复制到输出目录。这是因为一些资源文件不会被 `tsc` 或 `tsup` 处理，但它们仍需要被放置到输出目录，并保持它们的项目对路径不变。

你在克隆代码仓库后，可能需要先执行该命令来确保项目代码可以顺利运行，因为编译后的输出目录被 `.gitignore` 排除在仓库以外了。

### `pnpm clean`

`clean` 命令会执行所有子 Package 中的 `clean` 命令，清除所有的输出文件目录和缓存文件。换言之，它将移除所有通过 `build` 和 `copy` 命令生成的文件。

当你想要从最初状态重新构建源代码时，你可以执行该命令。

### `pnpm docs:*`

#### `pnpm docs:build`, `pnpm docs:dev`, `pnpm docs:clean`

`docs:` 前缀表明，这些命令是针对文档 (documentation) 进行操作的，即 `docs` 目录。

VuePress 使用它自己来构建自己的文档网站。

你需要先执行 `pnpm build` 来构建 VuePress 源代码，然后再运行这些 `docs:` 开头的命令来开发或构建文档。

#### `pnpm docs:serve`

在本地启动文档网站服务器。

你需要先运行 `pnpm docs:build` 来生成文档网站的输出文件，然后再通过该命令来启动文档网站。

### `pnpm lint`

`lint` 命令使用 ESLint 来检查所有源文件。

### `pnpm test`

`test` 命令使用 Vitest 来运行单元测试。

## 文档

VuePress 的文档是由 VuePress 自己驱动的，是由该仓库中的源码构建而来。

所有的 Markdown 源文件都放置在 `docs` 目录下。我们维护了两种翻译：

- 英语 (en-US) 在 `/` 路径下
- 中文 (zh-CN) 在 `/zh/` 路径下

我们部署了两套站点：

- 在 [Netlify](https://www.netlify.com) 部署的 Release 版本。该站点是从最新发布的版本中构建而来，因此用户不会看到未发布的改动。域名为 [https://v2.vuepress.vuejs.org](https://v2.vuepress.vuejs.org)。
- 在 [GitHub Pages](https://pages.github.com) 部署的 Developer 版本。该站点是从最新的提交中构建而来，因此开发者可以预览最新的改动。域名为 [https://vuepress.github.io](https://vuepress.github.io)。
