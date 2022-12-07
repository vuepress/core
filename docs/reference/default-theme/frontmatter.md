# Frontmatter

<NpmBadge package="@vuepress/theme-default" />

## All Pages

Frontmatter in this section will take effect in all types of pages.

### externalLinkIcon

- Type: `boolean`

- Details:

  Provided by [@vuepress/plugin-external-link-icon](../plugin/external-link-icon.md#externallinkicon).

- Also see:
  - [Default Theme > Config Reference > themePlugins.externalLinkIcon](./config.md#themeplugins-externallinkicon)

### navbar

- Type: `boolean`

- Details:

  Show navbar on this page or not.

  If you disable navbar in theme config, this frontmatter will not take effect.

- Also see:
  - [Default Theme > Config > navbar](./config.md#navbar)

### pageClass

- Type: `string`

- Details:

  Add extra class name to this page.

- Example:

```md
---
pageClass: custom-page-class
---
```

Then you can customize styles of this page in `.vuepress/styles/index.scss` file:

```scss
.theme-container.custom-page-class {
  /* page styles */
}
```

- Also see:
  - [Default Theme > Styles > Style File](./styles.md#style-file)

## Home Page

Frontmatter in this section will only take effect in home pages.

### home

- Type: `boolean`

- Details:

  Specify whether the page is homepage or a normal page.

  If you don't set this frontmatter or set it to `false`, the page would be a [normal page](#normal-page).

- Example:

```md
---
home: true
---
```

### heroImage

- Type: `string`

- Details:

  Specify the url of the hero image.

- Example:

```md
---
# public file path
heroImage: /images/hero.png
# url
heroImage: https://vuejs.org/images/logo.png
---
```

- Also see:
  - [Guide > Assets > Public Files](../../guide/assets.md#public-files)

### heroImageDark

- Type: `string`

- Details:

  Specify the url of hero image to be used in dark mode.

  You can make use of this option if you want to use different heroImage config in dark mode.

- Also see:
  - [Default Theme > Frontmatter > heroImage](#heroimage)
  - [Default Theme > Config > colorMode](./config.md#colormode)

### heroAlt

- Type: `string`

- Details:

  Specify the `alt` attribute of the hero image.

  This will fallback to the [heroText](#heroText).

### heroHeight

- Type: `number`

- Default: `280`

- Details:

  Specify the `height` attribute of the hero `<img>` tag.

  You may need to reduce this value if the height of your hero image is less than the default value.

  Notice that the height is also constrained by CSS. This attribute is to reduce [Cumulative Layout Shift (CLS)](https://web.dev/cls/) that caused by the loading of the hero image.

### heroText

- Type: `string | null`

- Details:

  Specify the the hero text.

  This will fallback to the site [title](../config.md#title).

  Set to `null` to disable hero text.

### tagline

- Type: `string | null`

- Details:

  Specify the the tagline.

  This will fallback to the site [description](../config.md#description).

  Set to `null` to disable tagline.

### actions

- Type:

```ts
Array<{
  text: string
  link: string
  type?: 'primary' | 'secondary'
}>
```

- Details:

  Configuration of the action buttons.

- Example:

```md
---
actions:
  - text: Get Started
    link: /guide/getting-started.html
    type: primary
  - text: Introduction
    link: /guide/
    type: secondary
---
```

### features

- Type:

```ts
Array<{
  title: string
  details: string
}>
```

- Details:

  Configuration of the features list.

- Example:

```md
---
features:
  - title: Simplicity First
    details: Minimal setup with markdown-centered project structure helps you focus on writing.
  - title: Vue-Powered
    details: Enjoy the dev experience of Vue, use Vue components in markdown, and develop custom themes with Vue.
  - title: Performant
    details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
---
```

### footer

- Type: `string`

- Details:

  Specify the content of the footer.

### footerHtml

- Type: `boolean`

- Details:

  Allow HTML in footer or not.

  If you set it to `true`, the [footer](#footer) will be treated as HTML code.

## Normal Page

Frontmatter in this section will only take effect in normal pages.

### editLink

- Type: `boolean`

- Details:

  Enable the _edit this page_ link in this page or not.

- Also see:
  - [Default Theme > Config > editLink](./config.md#editlink)

### editLinkPattern

- Type: `string`

- Details:

  Specify the pattern of the _edit this page_ link of this page.

- Also see:
  - [Default Theme > Config > editLinkPattern](./config.md#editlinkpattern)

### lastUpdated

- Type: `boolean`

- Details:

  Enable the _last updated timestamp_ in this page or not.

- Also see:
  - [Default Theme > Config > lastUpdated](./config.md#lastupdated)

### contributors

- Type: `boolean`

- Details:

  Enable the _contributors list_ in this page or not.

- Also see:
  - [Default Theme > Config > contributors](./config.md#contributors)

### sidebar

- Type: `false | 'auto' | SidebarConfigArray | SidebarConfigObject`

- Details:

  Configure the sidebar of this page.

- Also see:
  - [Default Theme > Config > sidebar](./config.md#sidebar)

### sidebarDepth

- Type: `number`

- Details:

  Configure the sidebar depth of this page.

- Also see:
  - [Default Theme > Config > sidebarDepth](./config.md#sidebardepth)

### prev

- Type: `NavLink | string`

- Details:

  Specify the link of the previous page.

  If you don't set this frontmatter, the link will be inferred from the sidebar config.

  To configure the prev link manually, you can set this frontmatter to a `NavLink` object or a string:

  - A `NavLink` object should have a `text` field and a `link` field.
  - A string should be the path to the target page file. It will be converted to a `NavLink` object, whose `text` is the page title, and `link` is the page route path.

- Example:

```md
---
# NavLink
prev:
  text: Get Started
  link: /guide/getting-started.html

# NavLink - external url
prev:
  text: GitHub
  link: https://github.com

# string - page file path
prev: /guide/getting-started.md

# string - page file relative path
prev: ../../guide/getting-started.md
---
```

### next

- Type: `NavLink | string`

- Details:

  Specify the link of the next page.

  If you don't set this frontmatter, the link will be inferred from the sidebar config.

  The type is the same as [prev](#prev) frontmatter.
