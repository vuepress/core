import { expect, it } from 'vitest'
import type { App, Bundler, DevApp } from '../../src/index.js'
import { createDevApp } from '../../src/index.js'

it('should create dev app correctly', () => {
  const checkApp = (app: App): void => {
    expect(app.env.isDev).toBe(true)
    expect(typeof (app as DevApp).dev).toBe('function')

    expect(app.env.isBuild).toBe(false)
    expect((app as unknown as { build: never }).build).toBeUndefined()
  }

  const devApp = createDevApp({
    source: '/foo',
    theme: (appInTheme) => {
      checkApp(appInTheme)
      return { name: 'test-theme' }
    },
    bundler: {} as Bundler,
    plugins: [
      (appInPlugin) => {
        checkApp(appInPlugin)
        return { name: 'test-plugin' }
      },
    ],
  })
  checkApp(devApp)
})
