import { path } from '@vuepress/utils'
import { describe, expect, it, vi } from 'vitest'
import { createBaseApp, normalizeReturnObjectHook } from '../../src/index.js'
import type { ReturnObjectHook } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
})

describe('core > pluginApi > normalizeReturnObjectHook', () => {
  it('should keep function as is', async () => {
    const rawHook: ReturnObjectHook['exposed'] = vi.fn((app) => ({
      foo: 'bar',
    }))
    const normalizedHook = normalizeReturnObjectHook(rawHook)
    expect(await normalizedHook(app)).toEqual({ foo: 'bar' })
    expect(rawHook).toHaveBeenCalledTimes(1)
    expect(rawHook).toHaveBeenCalledWith(app)
  })

  it('should wrap object with a function', async () => {
    const rawHook: ReturnObjectHook['exposed'] = {
      foo: 'bar',
    }
    const normalizedHook = normalizeReturnObjectHook(rawHook)
    expect(await normalizedHook(app)).toEqual({ foo: 'bar' })
  })
})
