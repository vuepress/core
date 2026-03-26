import { path } from '@vuepress/utils'
import { expect, it, vi } from 'vitest'

import type { Bundler, HooksName } from '../../src/index.js'
import { createBaseApp, createPluginApi } from '../../src/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as Bundler,
})

it('should have correct hooks', () => {
  const hookNames: HooksName[] = [
    'onInitialized',
    'onPrepared',
    'onWatched',
    'onCleanup',
    'onPageUpdated',
    'onGenerated',
    'extendsMarkdownOptions',
    'extendsMarkdown',
    'extendsPageOptions',
    'extendsPage',
    'extendsBundlerOptions',
    'clientConfigFile',
    'alias',
    'define',
  ]

  const pluginApi = createPluginApi()

  hookNames.forEach((hookName) => {
    expect(pluginApi.hooks).toHaveProperty(hookName)
  })
})

it('hooks should only take effect after `registerHooks` is called', async () => {
  const pluginApi = createPluginApi()

  const hookFn = vi.fn()

  pluginApi.plugins.push({
    name: 'test',
    onInitialized: hookFn,
  })

  // before `registerHooks`
  await pluginApi.hooks.onInitialized.process(app)

  expect(hookFn).toHaveBeenCalledTimes(0)

  // after `registerHooks`
  pluginApi.registerHooks()
  await pluginApi.hooks.onInitialized.process(app)

  expect(hookFn).toHaveBeenCalledTimes(1)
  expect(hookFn).toHaveBeenCalledWith(app)
})

it('onCleanup hooks should be registered and processed correctly', async () => {
  const pluginApi = createPluginApi()

  const cleanupFn1 = vi.fn()
  const cleanupFn2 = vi.fn()

  pluginApi.plugins.push({
    name: 'test-cleanup-1',
    onCleanup: cleanupFn1,
  })
  pluginApi.plugins.push({
    name: 'test-cleanup-2',
    onCleanup: cleanupFn2,
  })

  pluginApi.registerHooks()
  await pluginApi.hooks.onCleanup.process(app, 'restart')

  expect(cleanupFn1).toHaveBeenCalledTimes(1)
  expect(cleanupFn1).toHaveBeenCalledWith(app, 'restart')
  expect(cleanupFn2).toHaveBeenCalledTimes(1)
  expect(cleanupFn2).toHaveBeenCalledWith(app, 'restart')
})

it('onCleanup hooks should be processed sequentially', async () => {
  const pluginApi = createPluginApi()
  const order: number[] = []

  pluginApi.plugins.push({
    name: 'test-cleanup-1',
    onCleanup: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 20)
      })
      order.push(1)
    },
  })
  pluginApi.plugins.push({
    name: 'test-cleanup-2',
    onCleanup: () => {
      order.push(2)
    },
  })

  pluginApi.registerHooks()
  await pluginApi.hooks.onCleanup.process(app, 'restart')

  expect(order).toEqual([1, 2])
})

it('onCleanup hooks should receive the correct stage parameter', async () => {
  const pluginApi = createPluginApi()
  const stages: string[] = []

  pluginApi.plugins.push({
    name: 'test-cleanup-stages',
    onCleanup: (_app, stage) => {
      stages.push(stage)
    },
  })

  pluginApi.registerHooks()

  await pluginApi.hooks.onCleanup.process(app, 'restart')
  await pluginApi.hooks.onCleanup.process(app, 'compile-end')
  await pluginApi.hooks.onCleanup.process(app, 'prepared')

  expect(stages).toEqual(['restart', 'compile-end', 'prepared'])
})
