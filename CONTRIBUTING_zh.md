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

还有一些对上述 Package 进行封装后的 Package ：

- `vuepress`: 是上述包的封装，提供了 `vuepress` 命令行工具。用户需要在此包的基础上自行选择并安装打包工具和主题。

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

本项目开发使用的一些主要工具：

- [TypeScript](https://www.typescriptlang.org/) 作为开发语言
- [Vitest](https://vitest.dev/) 用于单元测试
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) 用于代码检查和格式化

## 开发脚本

### `pnpm build`

`build` 命令会使用 `tsup` 将 TypeScript 源文件编译为 JavaScript 文件。

你在克隆代码仓库后，可能需要先执行该命令来确保项目代码可以顺利运行，因为编译后的输出目录被 `.gitignore` 排除在仓库以外了。

### `pnpm clean`

`clean` 命令会执行所有子 Package 中的 `clean` 命令，清除所有的输出文件目录和缓存文件。换言之，它将移除所有通过 `build` 命令生成的文件。

当你想要从最初状态重新构建源代码时，你可以执行该命令。

### `pnpm lint`

`lint` 命令使用 ESLint 来检查所有源文件。

### `pnpm test`

`test` 命令使用 Vitest 来运行单元测试。

## 文档

VuePress 的文档在 [vuepress/docs](https://github.com/vuepress/docs) 仓库中进行维护。
