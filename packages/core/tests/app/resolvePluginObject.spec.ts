import { path } from '@vuepress/utils'
import { describe, expect, it, vi } from 'vitest'
import { createBaseApp, resolvePluginObject } from '../../src/index.js'
import type { PluginFunction, PluginObject } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})

describe('core > app > resolvePluginObject', () => {
  it('should work with plugin object', () => {
    const pluginObject: PluginObject = {
      name: 'plugin-object',
    }

    const result = resolvePluginObject(app, pluginObject)
    expect(result.name).toEqual('plugin-object')
  })

  it('should work with plugin function', () => {
    const pluginFunction: PluginFunction = vi.fn((app) => ({
      name: 'plugin-function',
    }))

    const result = resolvePluginObject(app, pluginFunction)

    expect(pluginFunction).toHaveBeenCalledTimes(1)
    expect(pluginFunction).toHaveBeenCalledWith(app)
    expect(result.name).toEqual('plugin-function')
  })
})
