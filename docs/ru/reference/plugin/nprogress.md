---
title: nprogress
---

<!-- `# nprogress` will be rendered as `<h1 id="nprogress">`, and the id will conflict with the nprogress bar (stupid) -->

<!-- so we add a 'plugin' suffix in the h1 title, and use title frontmatter to set the page title -->

# nprogress Plugin

<NpmBadge package="@vuepress/plugin-nprogress" />

Integrate [nprogress](https://github.com/rstacruz/nprogress) into VuePress, which can provide a progress bar when navigating to another page.

This plugin has been integrated into the default theme.

## Usage

```bash
npm i -D @vuepress/plugin-nprogress@next
```

```ts
import { nprogressPlugin } from '@vuepress/plugin-nprogress'

export default {
  plugins: [
    nprogressPlugin(),
  ],
}
```

## Styles

You can customize the style of the progress bar via CSS variables:

@[code css](@vuepress/plugin-nprogress/src/client/styles/vars.css)
