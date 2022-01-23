# Markdown and Vue SFC

Each Markdown file is first compiled into HTML, and then converted to a Vue SFC. In other words, you can write a Markdown file like a Vue SFC:

- Blocks `<script>` and `<style>` are treated as Vue SFC blocks as they are. In other words, they are hoisted from the `<template>` block to the top-level of SFC.
- Everything outside `<script>` and `<style>` will be compiled into HTML, and be treated as Vue SFC `<template>` block.

::: warning
As Vue SFC can contain only one `<script>` element, you should avoid using more than one `<script>` in VuePress markdown.
:::

Here comes an example:

**Input**

```vue
_Hello, {{ msg }}_

<RedDiv>

_Current count is: {{ count }}_

</RedDiv>

<button @click="count++">Click Me!</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Vue in Markdown'
const count = ref(0)
</script>

<style>
.red-div {
  color: red;
}
</style>
```

**Output**

_Hello, {{ msg }}_

<RedDiv>

_Current count is: {{ count }}_

</RedDiv>

<button @click="count++">Click Me!</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Vue in Markdown'
const count = ref(0)
</script>

<style>
.red-div {
  color: red;
}
</style>
