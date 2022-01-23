# Markdown 与 Vue SFC

每一个 Markdown 文件，首先都会编译为 HTML ，然后转换为一个 Vue 单文件组件 (SFC) 。换句话说，你可以像写 Vue SFC 一样来写 Markdown 文件：

- `<script>` 和 `<style>` 标签会直接被当作 Vue SFC 中的标签。换句话说，它们是从 `<template>` 标签中提升到了 SFC 的顶层。
- 所有 `<script>` 和 `<style>` 标签的以外的内容，会先被编译为 HTML ，然后被当作 Vue SFC 的 `<template>` 标签。

::: warning
由于 Vue 单文件组件只能包含一个 `<script>` 标签，你应该避免在 VuePress Markdown 中使用多于一个 `<script>` 标签。
:::

我们来看一个例子：

**输入**

```vue
_你好， {{ msg }}_

<RedDiv>

_当前计数为： {{ count }}_

</RedDiv>

<button @click="count++">点我！</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Markdown 中的 Vue'
const count = ref(0)
</script>

<style>
.red-div {
  color: red;
}
</style>
```

**输出**

_你好， {{ msg }}_

<RedDiv>

_当前计数为： {{ count }}_

</RedDiv>

<button @click="count++">点我！</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Markdown 中的 Vue'
const count = ref(0)
</script>

<style>
.red-div {
  color: red;
}
</style>
