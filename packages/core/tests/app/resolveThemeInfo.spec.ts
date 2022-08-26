import { importFileDefault, path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { createBaseApp, resolveThemeInfo } from '../../src/index.js'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/', ...args)

const createTestApp = async (themePath: string) =>
  createBaseApp({
    source: path.resolve(__dirname, 'fake-source'),
    theme: await importFileDefault(themePath),
    bundler: {} as any,
  })

const themeEntryTypes = ['func', 'obj'] as const

const getThemePlugin = async (themePath: string) => {
  const theme = await importFileDefault(themePath)
  return typeof theme === 'function' ? theme() : theme
}

describe('core > app > resolveThemeInfo', () => {
  describe('plugins', () => {
    describe('should resolve theme info without plugins correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, async () => {
          const themePath = fixtures(`themes/${item}-empty.js`)
          const app = await createTestApp(themePath)
          expect(resolveThemeInfo(app, app.options.theme).plugins).toEqual([
            await getThemePlugin(themePath),
          ])
        })
      )
    })

    describe('should resolve theme info with plugins correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, async () => {
          const themePath = fixtures(`themes/${item}.js`)
          const app = await createTestApp(themePath)
          expect(resolveThemeInfo(app, app.options.theme).plugins).toEqual([
            await importFileDefault(fixtures('plugins/obj.js')),
            await getThemePlugin(themePath),
          ])
        })
      )
    })
  })

  describe('extends', () => {
    describe('should resolve theme info with parent theme correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, async () => {
          const themePath = fixtures(`themes/${item}-extends-parent.js`)
          const parentThemePath = fixtures(`themes/${item}.js`)
          const app = await createTestApp(themePath)

          expect(resolveThemeInfo(app, app.options.theme)).toEqual({
            plugins: [
              await importFileDefault(fixtures('plugins/obj.js')),
              await getThemePlugin(parentThemePath),
              await importFileDefault(fixtures('plugins/obj-foo.js')),
              await getThemePlugin(themePath),
            ],
            templateBuild: `theme-${item}-extends-parent-template-build`,
            templateDev: `theme-${item}-template-dev`,
          })
        })
      )
    })

    describe('should resolve theme info with grandparent theme correctly', () => {
      themeEntryTypes.forEach((item) =>
        it(item, async () => {
          const themePath = fixtures(`themes/${item}-extends-grandparent.js`)
          const parentThemePath = fixtures(`themes/${item}-extends-parent.js`)
          const grandparentThemePath = fixtures(`themes/${item}.js`)
          const app = await createTestApp(themePath)

          expect(resolveThemeInfo(app, app.options.theme)).toEqual({
            plugins: [
              await importFileDefault(fixtures('plugins/obj.js')),
              await getThemePlugin(grandparentThemePath),
              await importFileDefault(fixtures('plugins/obj-foo.js')),
              await getThemePlugin(parentThemePath),
              await importFileDefault(fixtures('plugins/obj-bar.js')),
              await getThemePlugin(themePath),
            ],
            templateBuild: `theme-${item}-extends-parent-template-build`,
            templateDev: `theme-${item}-extends-grandparent-template-dev`,
          })
        })
      )
    })
  })
})
