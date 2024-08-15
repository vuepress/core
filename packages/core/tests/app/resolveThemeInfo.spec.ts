import { importFileDefault, path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import type { App, Bundler, Theme, ThemeObject } from '../../src/index.js'
import { createBaseApp, resolveThemeInfo } from '../../src/index.js'

const fixtures = (...args: string[]): string =>
  path.resolve(__dirname, '../__fixtures__/', ...args)

const createTestApp = async (themePath: string): Promise<App> =>
  createBaseApp({
    source: path.resolve(__dirname, 'fake-source'),
    theme: await importFileDefault(themePath),
    bundler: {} as Bundler,
  })

const THEME_ENTRY_TYPES = ['func', 'obj'] as const

const getThemePlugin = async (
  themePath: string,
  app: App,
): Promise<ThemeObject> => {
  const theme = await importFileDefault<Theme>(themePath)
  return typeof theme === 'function' ? theme(app) : theme
}

describe('core > app > resolveThemeInfo', () => {
  describe('plugins', () => {
    describe('should resolve theme info without plugins correctly', () => {
      THEME_ENTRY_TYPES.forEach((item) => {
        it(item, async () => {
          const themePath = fixtures(`themes/${item}-empty.js`)
          const app = await createTestApp(themePath)
          expect(resolveThemeInfo(app, app.options.theme).plugins).toEqual([
            await getThemePlugin(themePath, app),
          ])
        })
      })
    })

    describe('should resolve theme info with plugins correctly', () => {
      THEME_ENTRY_TYPES.forEach((item) => {
        it(item, async () => {
          const themePath = fixtures(`themes/${item}.js`)
          const app = await createTestApp(themePath)
          expect(resolveThemeInfo(app, app.options.theme).plugins).toEqual([
            await importFileDefault(fixtures('plugins/obj.js')),
            await getThemePlugin(themePath, app),
          ])
        })
      })
    })
  })

  describe('extends', () => {
    describe('should resolve theme info with parent theme correctly', () => {
      THEME_ENTRY_TYPES.forEach((item) => {
        it(item, async () => {
          const themePath = fixtures(`themes/${item}-extends-parent.js`)
          const parentThemePath = fixtures(`themes/${item}.js`)
          const app = await createTestApp(themePath)

          expect(resolveThemeInfo(app, app.options.theme)).toEqual({
            plugins: [
              await importFileDefault(fixtures('plugins/obj.js')),
              await getThemePlugin(parentThemePath, app),
              await importFileDefault(fixtures('plugins/obj-foo.js')),
              await getThemePlugin(themePath, app),
            ],
            templateBuild: `theme-${item}-extends-parent-template-build`,
            templateDev: `theme-${item}-template-dev`,
          })
        })
      })
    })

    describe('should resolve theme info with grandparent theme correctly', () => {
      THEME_ENTRY_TYPES.forEach((item) => {
        it(item, async () => {
          const themePath = fixtures(`themes/${item}-extends-grandparent.js`)
          const parentThemePath = fixtures(`themes/${item}-extends-parent.js`)
          const grandparentThemePath = fixtures(`themes/${item}.js`)
          const app = await createTestApp(themePath)

          expect(resolveThemeInfo(app, app.options.theme)).toEqual({
            plugins: [
              await importFileDefault(fixtures('plugins/obj.js')),
              await getThemePlugin(grandparentThemePath, app),
              await importFileDefault(fixtures('plugins/obj-foo.js')),
              await getThemePlugin(parentThemePath, app),
              await importFileDefault(fixtures('plugins/obj-bar.js')),
              await getThemePlugin(themePath, app),
            ],
            templateBuild: `theme-${item}-extends-parent-template-build`,
            templateDev: `theme-${item}-extends-grandparent-template-dev`,
          })
        })
      })
    })
  })
})
