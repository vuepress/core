# Built-in Components

<NpmBadge package="@vuepress/client" />

## ClientOnly

- Usage:

```md
<ClientOnly>
  <NonSsrFriendlyComponent />
</ClientOnly>
```

- Details:

  This component and its children will only be rendered in client-side. That means, it will not be rendered to HTML during build (SSR).

  If a component is trying to access Browser / DOM APIs directly in `setup()`, an error will occur during build because those APIs are unavailable in Node.js environment. In such case, you could do either:

  - Modify the component to only access Browser / DOM APIs in `onBeforeMount()` or `onMounted()` hook.
  - Wrap the component with `<ClientOnly>`.

## Content

- Props:
  - pageKey
    - Type: `string`
    - Required: No`

- Usage:

```md
<Content page-key="v-xxxxxx" />
```

- Details:

  This component will render the Markdown content of a page.

  The page key is the [name](https://router.vuejs.org/api/#name-2) of the page route. If the `pageKey` prop is not provided, it will render the page of current route.

  This component is mainly for developing themes. You won't need it in most cases.

- Also see:
  - [Node API > Page Properties > key](./node-api.md#key)

## VPLink

- Props:
  - to
    - Type: `string`
    - Required: Yes

- Usage:

```md
<VPLink to="/path/to/link" />
```

- Details:

   This component will render an `<a>` link that has SPA navigation capabilities, and will trigger `router.push` when clicked.

   Its `to` property is the link to navigate to.

   This component is mainly used to replace `<RouterLink>`, which has expensive initialization. If you need to place internal links and don't care about its exact rendering href and activate state, you should use it as first choice.
