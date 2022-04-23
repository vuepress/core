# back-to-top

<NpmBadge package="@vuepress/plugin-back-to-top" />

This plugin will add a _back to top_ button to your site. The button will be displayed in the bottom right corner of the page when scrolling down. By clicking the button, the page will scroll to the top.

This plugin has been integrated into the default theme.

## Usage

```bash
npm i -D @vuepress/plugin-back-to-top@next
```

```js
const { backToTopPlugin } = require('@vuepress/plugin-back-to-top')

module.exports = {
  plugins: [
    backToTopPlugin(),
  ],
}
```

## Styles

You can customize the style of the _back to top_ button via CSS variables:

@[code css](@vuepress/plugin-back-to-top/src/client/styles/vars.css)
