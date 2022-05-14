# 客户端配置的使用方法

你可以直接在你的项目中使用 [客户端配置文件](../../guide/configuration.md#客户端配置文件) 。或者，在你的插件或者主题中，使用 [clientConfigFile](../../reference/plugin-api.md#clientconfigfile) Hook ：

```ts
import { path } from '@vuepress/utils'

const pluginOrTheme = {
  clientConfigFile: path.resolve(__dirname, './path/to/clientConfig.ts'),
}
```

在客户端配置文件中，`@vuepress/client` 包提供了一个 [defineClientConfig](../../reference/client-api.md#defineclientconfig) 函数来帮助你定义客户端配置：

```ts
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }){},
  setup(){},
  rootComponents: [],
})
```

## enhance

`enhance` 函数既可以是同步的，也可以是异步的。它接收一个 Context 参数，包含以下属性：

- `app` 是由 [createApp](https://staging-cn.vuejs.org/api/application.html#create-app) 创建的 Vue 应用实例。
- `router` 是由 [createRouter](https://router.vuejs.org/zh/api/index.html#createrouter) 创建的路由实例。
- `siteData` 是一个根据用户配置生成的 Ref 对象，包含 [base](../../reference/config.md#base), [lang](../../reference/config.md#lang), [title](../../reference/config.md#title), [description](../../reference/config.md#description), [head](../../reference/config.md#head) 和 [locales](../../reference/config.md#locales)。

`enhance` 函数会在客户端应用创建后被调用，你可以对 Vue 应用添加各种能力。

### 注册 Vue 组件

你可以通过 [app.component](https://staging-cn.vuejs.org/api/application.html#app-component) 方法来注册 Vue 全局组件：

```ts
import { defineClientConfig } from '@vuepress/client'
import MyComponent from './MyComponent.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('MyComponent', MyComponent)
  },
})
```

### 使用不支持 SSR 的功能

VuePress 会在构建过程中生成一个 SSR 应用，用以对页面进行预渲染。一般而言，如果一段代码在客户端应用 Mount 之前就使用了浏览器或 DOM API ，我们就认为其对 SSR 不友好，即不支持 SSR 。

我们已经提供了一个 [ClientOnly](../../reference/components.md#clientonly) 组件来包裹不支持 SSR 的内容。

在 `enhance` 函数中，你可以使用 [`__VUEPRESS_SSR__`](../../reference/client-api.md#ssr) 标记来处理这种情况。

```ts
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  async enhance() {
    if (!__VUEPRESS_SSR__) {
      const nonSsrFriendlyModule = await import('non-ssr-friendly-module')
      // ...
    }
  },
})
```

### 使用 Router 方法

你可以使用 vue-router 提供的 [Router 方法](https://router.vuejs.org/zh/api/index.html#router-方法) 。例如，添加导航钩子：

```ts
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ router }) {
    router.beforeEach((to) => {
      console.log('before navigation')
    })

    router.afterEach((to) => {
      console.log('after navigation')
    })
  },
})
```

::: warning
我们不推荐使用 `addRoute` 方法来添加动态路由，因为这些路由记录 **不会** 在构建模式中被预渲染出来。

当然，如果你了解了这种用法的缺点，你还是可以这样使用。
:::

## setup

`setup` 函数会在客户端 Vue 应用的 [setup](https://staging-cn.vuejs.org/api/composition-api-setup.html) Hook 中被调用。

### 使用组合式 API

你可以把 `setup` 函数当作根组件的 [setup](https://staging-cn.vuejs.org/api/composition-api-setup.html) Hook 中的一部分。因此，所有的组合式 API 都可以在这里使用。

```ts
import { defineClientConfig } from '@vuepress/client'
import { provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineClientConfig({
  setup() {
    // 获取当前的路由位置
    const route = useRoute()
    // 或者 vue-router 实例
    const router = useRouter()
    // 供给一个值，可以被布局、页面和其他组件注入
    const count = ref(0)
    provide('count', count)
  }
})
```

### 使用不支持 SSR 的功能

在 `setup` 函数中，[`__VUEPRESS_SSR__`](../../reference/client-api.md#ssr) 标记同样可用。

使用不支持 SSR 的功能的另一种方式就是将他们放在 [onMounted](https://staging-cn.vuejs.org/api/composition-api-lifecycle.html#onmounted) Hook 中：

```ts
import { defineClientConfig } from '@vuepress/client'
import { onMounted } from 'vue'

export default defineClientConfig({
  setup() {
    onMounted(() => {
      // 在 mounted 之后使用 DOM API
      document.querySelector('#app')
    })
  }
})
```

## rootComponents

`rootComponents` 是一个组件数组，它们将会直接被放置在客户端 Vue 应用的根节点下。

该选项的典型使用方式就是放置一些全局的 UI 组件，比如全局弹窗等：

```ts
import { defineClientConfig } from '@vuepress/client'
import GlobalPopup from './components/GlobalPopup.vue'

export default defineClientConfig({
  rootComponents: [GlobalPopup],
})
```
