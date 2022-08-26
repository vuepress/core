# Frontmatter

<NpmBadge package="@vuepress/client" />
<NpmBadge package="@vuepress/markdown" />

## date

- Type: `string`

- Details:

  Created date for the page.

  You should specify the date in the form of `yyyy-MM-dd`, or follow the [YAML Timestamp Type](https://yaml.org/type/timestamp.html).

- Also see:
  - [Node API > Page Properties > date](./node-api.md#date)

## description

- Type: `string`

- Details:

  Description for the page.

  This will override the `description` option in your site config.

- Also see:
  - [Config > description](./config.md#description)

## head

- Type: `HeadConfig[]`

- Details:

  Extra tags in `<head>` tag for the page.

- Example:

```md
---
head:
  - - meta
    - name: foo
      content: yaml array syntax
  - [meta, { name: bar , content: square brackets syntax }]
---
```

  Rendered as:

```html
<head>
  <meta name="foo" content="yaml array syntax" />
  <meta name="bar" content="square brackets syntax" />
</head>
```

- Also see:
  - [Config > head](./config.md#head)

## lang

- Type: `string`

- Details:

  Language for the page.

  This will override the `lang` option in your site config.

- Also see:
  - [Config > lang](./config.md#lang)
  - [Node API > Page Properties > lang](./node-api.md#lang)

## layout

- Type: `string`

- Details:

  Layout for the page.

  Layouts are provided by theme. If you don't specify this frontmatter, the default layout will be used. You should refer to the theme's own documentation to find what layouts it provides.

  If the theme layouts cannot meet your needs, you can use a custom layout component.

- Example:

Register a layout component in `.vuepress/client.ts` file:

```ts
import { defineClientConfig } from '@vuepress/client'
import CustomLayout from './CustomLayout.vue'

export default defineClientConfig({
  layouts: {
    CustomLayout,
  },
})
```

Set custom layout in frontmatter:

```md
---
layout: CustomLayout
---
```

## permalink

- Type: `string`

- Details:

  Permalink for the page.

  This will override the default route path that determined by the file path of the page.

- Also see:
  - [Frontmatter > permalinkPattern](#permalinkpattern)
  - [Guide > Page > Routing](../guide/page.md#routing)
  - [Node API > Page Properties > permalink](./node-api.md#permalink)

## permalinkPattern

- Type: `string | null`

- Details:

  Pattern to generate permalink for the page.

  This will override the `permalinkPattern` option in your site config.

  This won't take effect if the `permalink` frontmatter has been set.

- Usage:

  |  Pattern  |         Description         |
  |-----------|-----------------------------|
  | `:year`   | Year part of created date   |
  | `:month`  | Month part of created date  |
  | `:day`    | Day part of created date    |
  | `:slug`   | Slug of page filename       |
  | `:raw`    | Raw route path              |

  The `:year`, `:month` and `:day` patterns are resolved according to the following priority:

  - The `date` frontmatter.
  - The filename that matches the date pattern `yyyy-MM-dd-foobar.md` or `yyyy-MM-foobar.md`.
  - The dirname that matches the date pattern `yyyy/MM/dd/foobar.md` or `yyyy/MM/foobar.md`.
  - Fallback to `0000-00-00`.

- Example 1:

  The page filename is `foo-bar.md`.

  The page frontmatter is:

```md
---
date: 2021-01-03
permalinkPattern: :year/:month/:day/:slug.html
---
```

  Then the permalink of the page would be `2021/01/03/foo-bar.html`.

- Example 2:

  The page filename is `2021-01-03-bar-baz.md`.

  The page frontmatter is:

```md
---
permalinkPattern: :year/:month/:day/:slug.html
---
```

  Then the permalink of the page would be `2021/01/03/bar-baz.html`.

- Also see:
  - [Config > permalinkPattern](./config.md#permalinkpattern)
  - [Frontmatter > date](#date)
  - [Frontmatter > permalink](#permalink)
  - [Node API > Page Properties > permalink](./node-api.md#permalink)

## routeMeta

- Type: `Record<string, unknown>`

- Details:

  Custom data to be attached to the page route.

- Also see:
  - [Node API > Page Properties > routeMeta](./node-api.md#routeMeta)

## title

- Type: `string`

- Details:

  Title for the page.

  If you don't specify `title` in frontmatter, content of the first level-one header (i.e. `# title`) will be used as the title.

- Also see:
  - [Node API > Page Properties > title](./node-api.md#title)
