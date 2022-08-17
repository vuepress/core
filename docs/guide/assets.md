# Assets

## Relative URLs

You can reference any assets using relative URLs in your Markdown content:

```md
![An image](./image.png)
```

This is generally the suggested way to import images, as users usually place images near the Markdown file that references them.

## Public Files

You can put some static assets inside public directory, and they will be copied to the root of the generated directory.

The default public directory is `.vuepress/public`, which can be changed by [public](../reference/config.md#public) option.

It would be useful in some cases:

- You may need to provide static assets that are not directly referenced in any of your Markdown files, for example, favicon and PWA icons.
- You may need to serve some shared static assets, which may even be referenced outside your site, for example, logo images.
- You may want to reference images using absolute URLs in your Markdown content.

Take our documentation source files as an example, we are putting the logo of VuePress inside the public directory:

```bash
└─ docs
   ├─ .vuepress
   |  └─ public
   |     └─ images
   |        └─ hero.png  # <- Logo file
   └─ guide
      └─ assets.md       # <- Here we are
```

We can reference our logo in current page like this:

**Input**

```md
![VuePress Logo](/images/hero.png)
```

**Output**

![VuePress Logo](/images/hero.png)

### Base Helper

If your site is deployed to a non-root URL, for example, `https://foo.github.io/bar/`, then the [base](../reference/config.md#base) should be set to `'/bar/'`. Obviously, your public files would be served like `https://foo.github.io/bar/images/hero.png` after deployment.

In most cases, you don't need to worry about the reference path of those public files, as VuePress will automatically handle `base` for you:

```md
<!-- you don't need to prepend `/bar/` to `/images/hero.png` manually -->
![VuePress Logo](/images/hero.png)
```

However, sometimes you may have some dynamical links referencing public files, especially when you are authoring a custom theme. In such case, the `base` could not be handled automatically. To help with that, VuePress provides a [withBase](../reference/client-api.md#withbase) helper to prepend `base` for you:

```vue
<template>
  <img :src="withBase(logoPath)">
</template>

<script setup>
import { ref } from 'vue'
import { withBase } from '@vuepress/client'

const logoPath = ref('/images/hero.png')
</script>
```

You can also access the helper by `$withBase` directly:

```md
<img :src="$withBase('/images/hero.png')" alt="VuePress Logo">
```

## Packages and Path Aliases

Although it is not a common usage, you can reference images from dependent packages:

```bash
npm install -D package-name
```

```md
![Image from dependency](package-name/image.png)
```

The path aliases that set in config file are also supported:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  alias: {
    '@alias': path.resolve(__dirname, './path/to/some/dir'),
  },
}
```

```md
![Image from path alias](@alias/image.png)
```

::: tip
Config reference: [alias](../reference/plugin-api.md#alias)
:::
