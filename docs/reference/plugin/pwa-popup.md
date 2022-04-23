# pwa-popup

<NpmBadge package="@vuepress/plugin-pwa-popup" />

Provide a popup component for users to activate the new PWA service worker manually.

This plugin must be used together with [pwa plugin](./pwa.md), and the `skipWaiting` option must not be set to `true`.

When the new service worker is ready, a popup will appear in the right bottom of the page to ask users to activate the waiting service worker.

## Usage

```bash
npm i -D @vuepress/plugin-pwa-popup@next
```

```js
const { pwaPlugin } = require('@vuepress/plugin-pwa')
const { pwaPopupPlugin } = require('@vuepress/plugin-pwa-popup')

module.exports = {
  plugins: [
    pwaPlugin(),
    pwaPopupPlugin({
      // options
    }),
  ],
}
```

## Options

### locales

- Type: `Record<string, { message: string, buttonText: string }>`

- Details:

  The messages of the popup in different locales.

  If this option is not specified, it will fallback to default messages.

- Example:

```js
module.exports = {
  plugins: [
    pwaPlugin(),
    pwaPopupPlugin({
      locales: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh',
        },
        '/zh/': {
          message: '发现新内容可用',
          buttonText: '刷新',
        },
      },
    }),
  ],
}
```

- Also see:
  - [Guide > I18n](../../guide/i18n.md)

## Styles

You can customize the style of the popup via CSS variables:

@[code css](@vuepress/plugin-pwa-popup/src/client/styles/vars.css)
