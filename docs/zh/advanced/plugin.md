# 开发插件

::: tip
在阅读该指南之前，你最好先了解一下 VuePress 的 [架构](./architecture.md) 。
:::

## 创建一个插件

插件是一个符合 [插件 API](../reference/plugin-api.md) 的普通 JavaScript 对象，称之为 *插件对象* ：

```js
const fooPlugin = {
  name: 'vuepress-plugin-foo',
  // ...
}
```

插件还可以是一个接收 [App 实例](../reference/node-api.md#app) 作为参数，且返回值为 *插件对象* 的函数，称之为 *插件函数* ：

```js
const barPlugin = (app) => {
  return {
    name: 'vuepress-plugin-bar',
    // ...
  }
}
```

插件通常需要允许用户传入配置，因此我们一般都会提供给用户一个函数来接收配置，然后将 *插件对象* 或者 *插件函数* 作为返回值。于是，你的插件应该转换成这样的形式：

```js
const fooPlugin = (options) => {
  return {
    name: 'vuepress-plugin-foo',
    // ...
  }
}

const barPlugin = (options) => {
  return (app) => {
    return {
      name: 'vuepress-plugin-bar',
      // ...
    }
  }
}
```

## 发布到 NPM

在创建了插件之后，你需要在 [package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) 文件中遵循一定的约定，然后再将其发布到 NPM 上：

```json
{
  "name": "vuepress-plugin-foo",
  "keywords": [
    "vuepress-plugin"
  ]
}
```

- 将 `name` 按照约定命名，即 `vuepress-plugin-xxx` 或 `@org/vuepress-plugin-xxx` ，它应该和 *插件对象* 的 [name](../reference/plugin-api.md#name) 字段保持一致。
- 在 `keywords` 中包含 `vuepress-plugin` ，这样用户可以在 NPM 上搜索到你的插件。
