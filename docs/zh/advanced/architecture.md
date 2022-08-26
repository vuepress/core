# 架构

## 概览

![vuepress-architecture-overview](/images/guide/vuepress-architecture-overview.png)

上图展示了 VuePress 的简要架构：

- Node App 会生成临时文件，包括页面、路由等。
- Bundler 会将 Client App 和临时文件一起进行打包，就像处理一个普通的 Vue SPA 一样。

作为开发者，你必须要意识到 VuePress 分为两个主要部分： **Node App** 和 **Client App** ，这一点对于开发插件和主题来说都十分重要。

- 插件或者主题的入口文件会在 Node App 中被加载。
- 客户端文件会在 Client App 中被加载，也就是会被 Bundler 处理。比如组件、客户端配置文件等。

## 核心流程与 Hooks

![vuepress-core-process](/images/guide/vuepress-core-process.png)

上图展示了 VuePress 的核心流程以及 [插件 API](../reference/plugin-api.md) 的 Hooks ：

- 在 **init** 阶段：
  - 主题和插件会被加载。这意味着插件需要在初始化之前使用。
  - 由于我们要使用 markdown-it 来解析 Markdown 文件，因此需要在加载页面文件之前创建 markdown-it 实例：
    - [extendsMarkdownOptions](../reference/plugin-api.md#extendsmarkdownoptions) Hook 会被调用，用以创建 markdown-it 实例。
    - [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown) Hook 会被调用，用以扩展 markdown-it 实例。
  - 页面文件会被加载：
    - [extendsPageOptions](../reference/plugin-api.md#extendspageoptions) Hook 会被调用，用以创建页面。
    - [extendsPage](../reference/plugin-api.md#extendspage) Hook 会被调用，用以扩展页面对象。
- 在 **prepare** 阶段：
  - 临时文件会被生成，因此所有和客户端文件相关的 Hooks 会在此处调用。
- 在 **dev / build** 阶段：
  - Bundler 会被加载：
    - [extendsBundlerOptions](../reference/plugin-api.md#extendsbundleroptions) Hook 会被调用，用以生成 Bundler 的配置。
    - [alias](../reference/plugin-api.md#alias) Hook 和 [define](../reference/plugin-api.md#define) Hook 会被用在 Bundler 的配置中，所以它们会在此处调用。
