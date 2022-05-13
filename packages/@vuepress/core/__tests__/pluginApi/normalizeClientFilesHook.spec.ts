import { path } from '@vuepress/utils'
import { createBaseApp, normalizeClientConfigFileHook } from '../../src'
import type { ClientConfigFileHook } from '../../src'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})
const clientConfigFile = path.resolve(
  __dirname,
  '../__fixtures__/clientConfigs/clientConfig.ts'
)
const clientConfigFileNonExistent = path.resolve(
  __dirname,
  '../__fixtures__/clientConfigs/non-existent.ts'
)

describe('core > pluginApi > normalizeClientConfigFileHook', () => {
  describe('should keep function as is', () => {
    it('return value is string', async () => {
      const rawHook: ClientConfigFileHook['exposed'] = jest.fn(
        () => clientConfigFile
      )
      const normalizedHook = normalizeClientConfigFileHook(rawHook)
      expect(await normalizedHook(app)).toEqual([clientConfigFile])
      expect(rawHook).toHaveBeenCalledTimes(1)
      expect(rawHook).toHaveBeenCalledWith(app)
    })

    it('should throw an error if file does not exist', async () => {
      const consoleError = console.error
      console.error = jest.fn()

      const rawHook: ClientConfigFileHook['exposed'] =
        clientConfigFileNonExistent
      const normalizedHook = normalizeClientConfigFileHook(rawHook)
      await expect(normalizedHook(app)).rejects.toThrow()
      expect(console.error).toHaveBeenCalled()

      console.error = consoleError
    })
  })

  describe('should wrap raw value with a function', () => {
    it('value is string', async () => {
      const rawHook: ClientConfigFileHook['exposed'] = clientConfigFile
      const normalizedHook = normalizeClientConfigFileHook(rawHook)
      expect(await normalizedHook(app)).toEqual([clientConfigFile])
    })

    it('should throw an error if file does not exist', async () => {
      const consoleError = console.error
      console.error = jest.fn()

      const rawHook: ClientConfigFileHook['exposed'] =
        clientConfigFileNonExistent
      const normalizedHook = normalizeClientConfigFileHook(rawHook)
      await expect(normalizedHook(app)).rejects.toThrow()
      expect(console.error).toHaveBeenCalled()

      console.error = consoleError
    })
  })
})
