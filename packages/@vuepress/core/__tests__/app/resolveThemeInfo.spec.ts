import { createBaseApp, resolveThemeInfo } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/', ...args)

const createTestApp = (themePath: string) =>
  createBaseApp({
    source: path.resolve(__dirname, 'fake-source'),
    theme: themePath,
  })

const themeEntryTypes = ['func', 'obj'] as const

const getThemePlugin = (themePath: string) => {
  const themeModule = require(themePath)
  return typeof themeModule === 'function' ? themeModule() : themeModule
}

describe('core > app > resolveThemeInfo', () => {
  describe('layouts', () => {
    describe('should resolve theme info without layouts correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, () => {
          const app = createTestApp(fixtures(`themes/${item}-empty.js`))
          expect(
            resolveThemeInfo(app, app.options.theme, app.options.themeConfig)
              .layouts
          ).toEqual({})
        })
      )
    })

    describe('should resolve theme info with layouts correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, () => {
          const app = createTestApp(fixtures(`themes/${item}.js`))
          expect(
            resolveThemeInfo(app, app.options.theme, app.options.themeConfig)
              .layouts
          ).toEqual({
            Layout: fixtures('layouts/Layout.vue'),
            404: fixtures('layouts/404.vue'),
          })
        })
      )
    })
  })

  describe('plugins', () => {
    describe('should resolve theme info without plugins correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, () => {
          const themePath = fixtures(`themes/${item}-empty.js`)
          const app = createTestApp(themePath)
          expect(
            resolveThemeInfo(app, app.options.theme, app.options.themeConfig)
              .plugins
          ).toEqual([getThemePlugin(themePath)])
        })
      )
    })

    describe('should resolve theme info with plugins correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, () => {
          const themePath = fixtures(`themes/${item}.js`)
          const app = createTestApp(themePath)
          expect(
            resolveThemeInfo(app, app.options.theme, app.options.themeConfig)
              .plugins
          ).toEqual([
            require(fixtures('plugins/obj.js')),
            getThemePlugin(themePath),
          ])
        })
      )
    })
  })

  describe('extends', () => {
    describe('should resolve theme info with parent theme correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, () => {
          const themePath = fixtures(`themes/${item}-extends-parent.js`)
          const parentThemePath = fixtures(`themes/${item}.js`)
          const app = createTestApp(themePath)

          expect(
            resolveThemeInfo(app, app.options.theme, app.options.themeConfig)
          ).toEqual({
            plugins: [
              require(fixtures('plugins/obj.js')),
              getThemePlugin(parentThemePath),
              require(fixtures('plugins/obj-foo.js')),
              getThemePlugin(themePath),
            ],
            layouts: {
              Layout: fixtures('layouts/Layout.vue'),
              Foo: fixtures('layouts/Foo.vue'),
              404: fixtures('layouts/Foo.vue'),
            },
            templateBuild: `theme-${item}-extends-parent-template-build`,
            templateDev: `theme-${item}-template-dev`,
          })
        })
      )
    })

    describe('should resolve theme info with grandparent theme correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, () => {
          const themePath = fixtures(`themes/${item}-extends-grandparent.js`)
          const parentThemePath = fixtures(`themes/${item}-extends-parent.js`)
          const grandparentThemePath = fixtures(`themes/${item}.js`)
          const app = createTestApp(themePath)

          expect(
            resolveThemeInfo(app, app.options.theme, app.options.themeConfig)
          ).toEqual({
            plugins: [
              require(fixtures('plugins/obj.js')),
              getThemePlugin(grandparentThemePath),
              require(fixtures('plugins/obj-foo.js')),
              getThemePlugin(parentThemePath),
              require(fixtures('plugins/obj-bar.js')),
              getThemePlugin(themePath),
            ],
            layouts: {
              Layout: fixtures('layouts/Layout.vue'),
              Foo: fixtures('layouts/Foo.vue'),
              Bar: fixtures('layouts/Bar.vue'),
              404: fixtures('layouts/Bar.vue'),
            },
            templateBuild: `theme-${item}-extends-parent-template-build`,
            templateDev: `theme-${item}-extends-grandparent-template-dev`,
          })
        })
      )
    })
  })
})
