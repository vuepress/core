import { path } from '@vuepress/utils'
import { describe, expect, it, vi } from 'vitest'
import type { AliasDefineHook, Bundler, Theme } from '../../src/index.js'
import { createBaseApp, normalizeAliasDefineHook } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' } as Theme,
  bundler: {} as Bundler,
})

describe('core > pluginApi > normalizeAliasDefineHook', () => {
  it('should keep function as is', async () => {
    const rawHook: AliasDefineHook['exposed'] = vi.fn(
      (_app, isServer: boolean) => ({
        foo: 'bar',
        isServer,
      }),
    )
    const normalizedHook = normalizeAliasDefineHook(rawHook)
    expect(await normalizedHook(app, true)).toEqual({
      foo: 'bar',
      isServer: true,
    })
    expect(rawHook).toHaveBeenCalledTimes(1)
    expect(rawHook).toHaveBeenCalledWith(app, true)
  })

  it('should wrap object with a function', async () => {
    const rawHook: AliasDefineHook['exposed'] = {
      foo: 'bar',
    }
    const normalizedHook = normalizeAliasDefineHook(rawHook)
    expect(await normalizedHook(app, true)).toEqual({ foo: 'bar' })
  })
})
