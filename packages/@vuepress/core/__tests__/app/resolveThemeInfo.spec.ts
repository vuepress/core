import { createBaseApp, resolveThemeInfo } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/', ...args)

describe('core > app > resolveThemeInfo', () => {
  describe('layouts', () => {
    it('should resolve theme info without layouts correctly', () => {
      const app = createBaseApp({
        source: path.resolve(__dirname, 'fake-source'),
        theme: fixtures('themes/empty.js'),
      })

      expect(resolveThemeInfo(app, app.options.theme).layouts).toEqual({})
    })

    it('should resolve theme info with layouts correctly', () => {
      const app = createBaseApp({
        source: path.resolve(__dirname, 'fake-source'),
        theme: fixtures('themes/has-layouts.js'),
      })

      expect(resolveThemeInfo(app, app.options.theme).layouts).toEqual({
        Layout: fixtures('layouts/Layout.vue'),
        404: fixtures('layouts/404.vue'),
      })
    })
  })

  describe('plugins', () => {
    it('should resolve theme info without plugins correctly', () => {
      const app = createBaseApp({
        source: path.resolve(__dirname, 'fake-source'),
        theme: fixtures('themes/empty.js'),
      })

      expect(resolveThemeInfo(app, app.options.theme).plugins).toEqual([
        require(fixtures('themes/empty.js')),
      ])
    })

    it('should resolve theme info with plugins correctly', () => {
      const app = createBaseApp({
        source: path.resolve(__dirname, 'fake-source'),
        theme: fixtures('themes/has-plugins.js'),
      })

      expect(resolveThemeInfo(app, app.options.theme).plugins).toEqual([
        require(fixtures('themes/has-plugins.js')),
        require(fixtures('plugins/obj.js')),
      ])
    })
  })

  describe('extends', () => {
    it('should resolve theme info with parent theme correctly', () => {
      const app = createBaseApp({
        source: path.resolve(__dirname, 'fake-source'),
        theme: fixtures('themes/extends-parent.js'),
      })

      expect(resolveThemeInfo(app, app.options.theme)).toEqual({
        plugins: [
          require(fixtures('themes/has-layouts-and-plugins.js')),
          require(fixtures('plugins/obj.js')),
          require(fixtures('themes/extends-parent.js')),
          require(fixtures('plugins/obj-foo.js')),
        ],
        layouts: {
          Layout: fixtures('layouts/Layout.vue'),
          Foo: fixtures('layouts/Foo.vue'),
          404: fixtures('layouts/Foo.vue'),
        },
      })
    })

    it('should resolve theme info with grandparent theme correctly', () => {
      const app = createBaseApp({
        source: path.resolve(__dirname, 'fake-source'),
        theme: fixtures('themes/extends-grandparent.js'),
      })

      expect(resolveThemeInfo(app, app.options.theme)).toEqual({
        plugins: [
          require(fixtures('themes/has-layouts-and-plugins.js')),
          require(fixtures('plugins/obj.js')),
          require(fixtures('themes/extends-parent.js')),
          require(fixtures('plugins/obj-foo.js')),
          require(fixtures('themes/extends-grandparent.js')),
          require(fixtures('plugins/obj-bar.js')),
        ],
        layouts: {
          Layout: fixtures('layouts/Layout.vue'),
          Foo: fixtures('layouts/Foo.vue'),
          Bar: fixtures('layouts/Bar.vue'),
          404: fixtures('layouts/Bar.vue'),
        },
      })
    })
  })
})
