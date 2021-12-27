import { createBaseApp, resolvePluginObject } from '@vuepress/core'
import type { PluginFunction, PluginObject } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > app > resolvePluginObject', () => {
  describe('plugin object', () => {
    it('should work without options', () => {
      const pluginObject: PluginObject = {
        name: 'plugin-object',
      }

      const result = resolvePluginObject(app, pluginObject)
      expect(result.name).toEqual('plugin-object')
    })

    it('should work with options', () => {
      const pluginObject: PluginObject = {
        name: 'plugin-object',
      }

      const result = resolvePluginObject(app, pluginObject, { foo: 'bar' })
      expect(result.name).toEqual('plugin-object')
    })
  })

  describe('plugin function', () => {
    it('should work without options', () => {
      const pluginFunction: PluginFunction = jest.fn((options, app) => ({
        name: 'plugin-function',
      }))

      const result = resolvePluginObject(app, pluginFunction)

      expect(pluginFunction).toHaveBeenCalledTimes(1)
      expect(pluginFunction).toHaveBeenCalledWith({}, app)
      expect(result.name).toEqual('plugin-function')
    })

    it('should work with options', () => {
      const pluginFunction: PluginFunction = jest.fn((options, app) => ({
        name: options.pluginName,
      }))

      const result = resolvePluginObject(app, pluginFunction, {
        pluginName: 'foobar',
      })

      expect(pluginFunction).toHaveBeenCalledTimes(1)
      expect(pluginFunction).toHaveBeenCalledWith({ pluginName: 'foobar' }, app)
      expect(result.name).toEqual('foobar')
    })
  })

  describe('plugin name', () => {
    // TODO: tests for plugins in node_modules

    it('should throw an error', () => {
      const consoleError = console.error
      console.error = jest.fn()

      expect(() => {
        resolvePluginObject(app, '4-0-4')
      }).toThrow()
      expect(console.error).toHaveBeenCalled()

      console.error = consoleError
    })
  })

  describe('plugin path', () => {
    it('should work with plugin object', () => {
      const result = resolvePluginObject(
        app,
        path.resolve(__dirname, '../__fixtures__/plugins/obj.js')
      )
      expect(result.name).toEqual('plugin-object-from-path')
    })

    it('should work with plugin function', () => {
      const result = resolvePluginObject(
        app,
        path.resolve(__dirname, '../__fixtures__/plugins/func.js'),
        { pluginName: 'foobar' }
      )
      expect(result.name).toEqual('foobar-from-path')
    })

    it('should throw an error', () => {
      const consoleError = console.error
      console.error = jest.fn()

      expect(() => {
        resolvePluginObject(app, './4-0-4')
      }).toThrow()
      expect(console.error).toHaveBeenCalled()

      console.error = consoleError
    })
  })
})
