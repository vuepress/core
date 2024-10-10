import { expect, it } from 'vitest'
import type { App, BuildApp, Bundler } from '../../src/index.js'
import { createBuildApp } from '../../src/index.js'

it('should create build app correctly', () => {
  const checkApp = (app: App): void => {
    expect(app.env.isDev).toBe(false)
    expect((app as unknown as { dev: never }).dev).toBeUndefined()

    expect(app.env.isBuild).toBe(true)
    expect(typeof (app as BuildApp).build).toBe('function')
  }

  const buildApp = createBuildApp({
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
  checkApp(buildApp)
})
