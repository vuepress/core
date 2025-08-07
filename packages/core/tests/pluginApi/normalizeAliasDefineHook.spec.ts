import { path } from '@vuepress/utils'
import { expect, it, vi } from 'vitest'
import type { AliasHook, Bundler, DefineHook } from '../../src/index.js'
import { createBaseApp, normalizeAliasDefineHook } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

it('should wrap object with a function', async () => {
  const rawHook: AliasHook['exposed'] = {
    foo: 'bar',
  }
  const normalizedHook = normalizeAliasDefineHook(rawHook)
  expect(await normalizedHook(app, true)).toEqual({ foo: 'bar' })
})

it('should keep function as is', async () => {
  const rawHook: DefineHook['exposed'] = vi.fn((_app, isServer: boolean) => ({
    foo: 'bar',
    isServer,
  }))
  const normalizedHook = normalizeAliasDefineHook(rawHook)
  expect(await normalizedHook(app, true)).toEqual({
    foo: 'bar',
    isServer: true,
  })
  expect(rawHook).toHaveBeenCalledTimes(1)
  expect(rawHook).toHaveBeenCalledWith(app, true)
})
