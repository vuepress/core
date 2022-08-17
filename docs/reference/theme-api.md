# Theme API

<NpmBadge package="@vuepress/core" />

VuePress theme also works as a plugin, so Theme API can accept all the options of [Plugin API](./plugin-api.md) with following differences.

## Basic Options

### name

- Type: `string`

- Details:

  Name of the theme.

  It should follow the naming convention, and ensure consistency with the package name when publishing to NPM:

  - Non-scoped: `vuepress-theme-foo`
  - Scoped: `@org/vuepress-theme-foo`

### multiple

- Details:

  A theme should never be used multiple times, so this option is not supported in theme API.

## Theme Specific Options

### extends

- Type: `Theme`

- Details:

  The theme to inherit.

  All of the Theme API of the parent theme will be inherited, but the child theme will not override the parent theme directly. Theme specific options will override according to following rules:

  - [layouts](#layouts): When a layout with the same name is registered in both child and parent theme, the layout of the child theme will have a higher priority.
  - [plugins](#plugins): When a same plugin is used in both child and parent theme, if the plugin does not support to be used multiple times, only the one used in the child theme will take effect.
  - [templateBuild](#templatebuild) / [templateDev](#templatedev): Child theme templates will override parent theme templates.

  Multi-level inheritance is supported, i.e. theme B could be extended from theme A, and then theme C could be extended from theme B. In other words, a theme could have a parent theme, a grandparent theme and so on.

- Example:

```ts
import { defaultTheme } from '@vuepress/theme-default'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  // inherit the default theme
  extends: defaultTheme(),

  // override the `404` layout
  layouts: {
    404: path.resolve(__dirname, 'path/to/404.vue'),
  },
}
```

### layouts

- Type: `string | Record<string, string>`

- Details:

  Specify layout components of the theme.

  It accepts absolute path of the layouts directory. All the `.vue,.ts,.js` files in the directory will be registered as layout components.

  It also accepts a plain object, of which the key is the layout name and the value is the absolute path of the layout file.

  A theme must have at least two layouts: `Layout` and `404`.

- Example:

The layout directory:

```bash
layouts
├─ Layout.vue
├─ 404.vue
└─ FooBar.vue
```

Using the absolute path of layout directory:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  layouts: path.resolve(__dirname, 'path/to/layouts'),
}
```

Using a plain object is equivalent:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  layouts: {
    Layout: path.resolve(__dirname, 'path/to/layouts/Layout.vue'),
    404: path.resolve(__dirname, 'path/to/layouts/404.vue'),
    FooBar: path.resolve(__dirname, 'path/to/layouts/FooBar.vue'),
  },
}
```

### plugins

- Type: `(Plugin | Plugin[])[]`

- Details:

  Plugins to use in the theme.

- Also see:
  - [Config > plugins](./config.md#plugins)

### templateBuild

- Type: `string`

- Details:

  Specify the HTML template for build.

  It would override the default value of [templateBuild](./config.md#templatebuild), but could be overridden by user config.

- Also see:
  - [Config > templateBuild](./config.md#templatebuild)

### templateDev

- Type: `string`

- Details:

  Specify the HTML template for dev.

  It would override the default value of [templateDev](./config.md#templatedev), but could be overridden by user config.

- Also see:
  - [Config > templateDev](./config.md#templatedev)
