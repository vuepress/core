# prismjs

<NpmBadge package="@vuepress/plugin-prismjs" />

This plugin will enable syntax highlighting for markdown code fence with [Prism.js](https://prismjs.com/).

## Usage

```bash
npm i -D @vuepress/plugin-prismjs@next
```

```js
const { prismjsPlugin } = require('@vuepress/plugin-prismjs')

module.exports = {
  plugins: [
    prismjsPlugin({
      // options
    }),
  ],
}
```

## Options

### preloadLanguages

- Type: `string[]`

- Default: `['markdown', 'jsdoc', 'yaml']`

- Details:

  Languages to preload.

  By default, languages will be loaded on demand when parsing markdown files.

  However, Prism.js has [some potential issues](https://github.com/PrismJS/prism/issues/2716) about loading languages dynamically. To avoid them, you can preload languages via this option.
