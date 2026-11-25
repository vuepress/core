import { path } from '@vuepress/utils'
import { describe, expect, it, vi } from 'vitest'

import type { Bundler, ClientConfigFileHook } from '../../src/index.js'
import {
  createBaseApp,
  normalizeClientConfigFileHook,
} from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})
const CLIENT_CONFIG_FILE = path.resolve(
  __dirname,
  '../__fixtures__/clientConfigs/clientConfig.ts',
)
const CLIENT_CONFIG_FILE_NON_EXISTENT = path.resolve(
  __dirname,
  '../__fixtures__/clientConfigs/non-existent.ts',
)

describe('should keep function as is', () => {
  it('return value is string', async () => {
    const rawHook: ClientConfigFileHook['exposed'] = vi.fn<
      Exclude<ClientConfigFileHook['exposed'], string>
    >(() => CLIENT_CONFIG_FILE)
    const normalizedHook = normalizeClientConfigFileHook(rawHook)
    expect(await normalizedHook(app)).toEqual(CLIENT_CONFIG_FILE)
    expect(rawHook).toHaveBeenCalledTimes(1)
    expect(rawHook).toHaveBeenCalledWith(app)
  })

  it('should throw an error if file does not exist', async () => {
    const consoleError = console.error
    console.error = vi.fn<typeof console.error>()

    const rawHook: ClientConfigFileHook['exposed'] =
      CLIENT_CONFIG_FILE_NON_EXISTENT
    const normalizedHook = normalizeClientConfigFileHook(rawHook)
    await expect(normalizedHook(app)).rejects.toThrow(
      /client config file does not exist/,
    )
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})

describe('should wrap raw value with a function', () => {
  it('value is string', async () => {
    const rawHook: ClientConfigFileHook['exposed'] = CLIENT_CONFIG_FILE
    const normalizedHook = normalizeClientConfigFileHook(rawHook)
    expect(await normalizedHook(app)).toEqual(CLIENT_CONFIG_FILE)
  })

  it('should throw an error if file does not exist', async () => {
    const consoleError = console.error
    console.error = vi.fn<typeof console.error>()

    const rawHook: ClientConfigFileHook['exposed'] =
      CLIENT_CONFIG_FILE_NON_EXISTENT
    const normalizedHook = normalizeClientConfigFileHook(rawHook)
    await expect(normalizedHook(app)).rejects.toThrow(
      /client config file does not exist/,
    )
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})
