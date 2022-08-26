# Usage of Client Config

You can make use of the [client config file](../../guide/configuration.md#client-config-file) directly in your project, or specify the file path in your plugin or theme via [clientConfigFile](../../reference/plugin-api.md#clientconfigfile) hook:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

const pluginOrTheme = {
  clientConfigFile: path.resolve(__dirname, './path/to/clientConfig.ts'),
}
```

Inside the client config file, `@vuepress/client` package provides a helper function [defineClientConfig](../../reference/client-api.md#defineclientconfig) to help you define the client config: 

```ts
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }){},
  setup(){},
  layouts: {},
  rootComponents: [],
})
```

## enhance

The `enhance` function could be either synchronous or asynchronous. It accepts a context param with following properties:

- `app` is the Vue application instance that created by [createApp](https://vuejs.org/api/application.html#createapp).
- `router` is the Vue Router instance that created by [createRouter](https://router.vuejs.org/api/#createrouter).
- `siteData` is a ref of an object that generated from user config, including [base](../../reference/config.md#base), [lang](../../reference/config.md#lang), [title](../../reference/config.md#title), [description](../../reference/config.md#description), [head](../../reference/config.md#head) and [locales](../../reference/config.md#locales).

The `enhance` function will be invoked after the client app is created. It's possible to implement any enhancements to the Vue application.

### Register Vue Components

You can register global Vue components via the [app.component](https://vuejs.org/api/application.html#app-component) method:

```ts
import { defineClientConfig } from '@vuepress/client'
import MyComponent from './MyComponent.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('MyComponent', MyComponent)
  },
})
```

### Use Non-SSR-Friendly Features

VuePress will generate a SSR application to pre-render pages during build. Generally speaking, if a code snippet is using Browser / DOM APIs before client app is mounted, we call it non-SSR-friendly.

We already provides a [ClientOnly](../../reference/components.md#clientonly) component to wrap non-SSR-friendly content.

In the `enhance` function, you can make use of the [`__VUEPRESS_SSR__`](../../reference/client-api.md#ssr) flag for that purpose.

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

### Use Router Methods

You can make use of the [Router Methods](https://router.vuejs.org/api/#router-methods) that provided by vue-router. For example, add navigation guard:

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
It's not recommended to use `addRoute` method to add dynamic routes here, because those routes will **NOT** be pre-rendered in build mode.

But you can still do that if you understand the drawback.
:::

## setup

The `setup` function would be invoked inside the [setup](https://vuejs.org/api/composition-api-setup.html) hook of the client vue app.

### Use Composition API

You can take the `setup` function as part of the [setup](https://vuejs.org/api/composition-api-setup.html) hook of the root component. Thus, all composition APIs are available here.

```ts
import { defineClientConfig } from '@vuepress/client'
import { provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineClientConfig({
  setup() {
    // get the current route location
    const route = useRoute()
    // get the vue-router instance
    const router = useRouter()
    // provide a value that can be injected by layouts, pages and other components
    const count = ref(0)
    provide('count', count)
  }
})
```

### Use Non-SSR-Friendly Features

In the `setup` function, the [`__VUEPRESS_SSR__`](../../reference/client-api.md#ssr) flag is also available.

Another way to use non-ssr-friendly features is to put them inside the [onMounted](https://vuejs.org/api/composition-api-lifecycle.html#onmounted) hook:

```ts
import { defineClientConfig } from '@vuepress/client'
import { onMounted } from 'vue'

export default defineClientConfig({
  setup() {
    onMounted(() => {
      // use DOM API after mounted
      document.querySelector('#app')
    })
  }
})
```

## layouts

The `layouts` options is to set layout components. After layout components are registered here, users can use it via [layout](../../reference/frontmatter.md#layout) frontmatter.

```ts
import { defineClientConfig } from '@vuepress/client'
import MyLayout from './layouts/MyLayout.vue'

export default defineClientConfig({
  layouts: {
    MyLayout,
  },
})
```

## rootComponents

The `rootComponents` is a components array to be placed directly into the root node of the client vue app.

Typical usage of this option is to put some global UI components, like global popup or so:

```ts
import { defineClientConfig } from '@vuepress/client'
import GlobalPopup from './components/GlobalPopup.vue'

export default defineClientConfig({
  rootComponents: [GlobalPopup],
})
```
