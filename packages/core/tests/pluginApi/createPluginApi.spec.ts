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
    'onGenerated',
    'extendsMarkdownOptions',
    'extendsMarkdown',
    'extendsPageOptions',
    'extendsPage',
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
