import os from 'node:os'

import type { AppConfig, Bundler } from '@vuepress/core'
import { logger, path } from '@vuepress/utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { resolveAppConfig } from '../../src/index.js'

// Resolve all fixtures and expectations with the same platform-aware `path`
// helper as the implementation, so this spec also works on win32.
const projectCwd = path.resolve('/project')
const projectSource = path.resolve(projectCwd, 'docs')
const projectDir = path.resolve('/project')
const projectSourceDir = path.resolve('/project/docs')
const otherCwd = path.resolve('/other')
const otherSource = path.resolve('/other/docs')
const subCwd = path.resolve('/project/sub')
const homeDir = path.resolve(os.homedir())

interface ResolveOptions {
  cwd?: string
  source?: string
  userConfig?: Partial<AppConfig>
}

const resolveAppConfigWith = ({
  cwd = projectCwd,
  source = projectSource,
  userConfig = {},
}: ResolveOptions = {}): AppConfig | null =>
  resolveAppConfig({
    defaultAppConfig: {},
    cliAppConfig: { source },
    userConfig: {
      bundler: { name: 'bundler', type: 'vite' } as Bundler,
      theme: { name: 'theme' },
      ...userConfig,
    },
    cwd,
  })

const UNSAFE_DEST_CASES: [string, ResolveOptions][] = [
  ['dest is equal to source', { userConfig: { dest: 'docs' } }],
  ['dest is equal to cwd', { source: otherSource, userConfig: { dest: '.' } }],
  [
    'dest contains source',
    {
      cwd: otherCwd,
      source: projectSourceDir,
      userConfig: { dest: projectDir },
    },
  ],
  [
    'dest contains cwd',
    {
      cwd: subCwd,
      source: otherSource,
      userConfig: { dest: projectDir },
    },
  ],
  ['dest is the filesystem root', { userConfig: { dest: '/' } }],
  ['dest is the user home directory', { userConfig: { dest: homeDir } }],
  ['dest is an empty string', { userConfig: { dest: '' } }],
  [
    'dest is the vuepress config directory',
    { userConfig: { dest: 'docs/.vuepress' } },
  ],
]

const UNSAFE_TEMP_CACHE_CASES: [string, ResolveOptions][] = [
  ['temp is equal to source', { userConfig: { temp: 'docs' } }],
  ['temp is equal to cwd', { source: otherSource, userConfig: { temp: '.' } }],
  [
    'temp contains source',
    {
      cwd: otherCwd,
      source: projectSourceDir,
      userConfig: { temp: projectDir },
    },
  ],
  [
    'temp contains cwd',
    {
      cwd: subCwd,
      source: otherSource,
      userConfig: { temp: projectDir },
    },
  ],
  ['temp is the filesystem root', { userConfig: { temp: '/' } }],
  ['temp is the user home directory', { userConfig: { temp: homeDir } }],
  [
    'temp is the vuepress config directory',
    { userConfig: { temp: 'docs/.vuepress' } },
  ],
  ['cache is equal to source', { userConfig: { cache: 'docs' } }],
  [
    'cache is equal to cwd',
    { source: otherSource, userConfig: { cache: '.' } },
  ],
  [
    'cache contains source',
    {
      cwd: otherCwd,
      source: projectSourceDir,
      userConfig: { cache: projectDir },
    },
  ],
  [
    'cache contains cwd',
    {
      cwd: subCwd,
      source: otherSource,
      userConfig: { cache: projectDir },
    },
  ],
  ['cache is the filesystem root', { userConfig: { cache: '/' } }],
  ['cache is the user home directory', { userConfig: { cache: homeDir } }],
  [
    'cache is the vuepress config directory',
    { userConfig: { cache: 'docs/.vuepress' } },
  ],
]

describe('resolveAppConfig directory options', () => {
  beforeEach(() => {
    vi.spyOn(logger, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should keep the default config without directory overrides', () => {
    const appConfig = resolveAppConfigWith()

    expect(appConfig).not.toBeNull()
    expect(appConfig?.source).toBe(projectSource)
    expect(appConfig?.dest).toBeUndefined()
    expect(appConfig?.temp).toBeUndefined()
    expect(appConfig?.cache).toBeUndefined()
  })

  it('should accept the default dest directory', () => {
    const dest = path.resolve(projectSource, '.vuepress/dist')

    const appConfig = resolveAppConfigWith({ userConfig: { dest } })

    expect(appConfig?.dest).toBe(dest)
  })

  it('should resolve a relative source to an absolute path', () => {
    const appConfig = resolveAppConfigWith({ source: 'docs' })

    expect(appConfig?.source).toBe(projectSource)
  })

  it('should resolve relative directory options to absolute paths', () => {
    const appConfig = resolveAppConfigWith({
      userConfig: {
        dest: 'docs/dist',
        temp: 'tmp',
        cache: 'tmp/cache',
      },
    })

    expect(appConfig?.source).toBe(projectSource)
    expect(appConfig?.dest).toBe(path.resolve(projectCwd, 'docs/dist'))
    expect(appConfig?.temp).toBe(path.resolve(projectCwd, 'tmp'))
    expect(appConfig?.cache).toBe(path.resolve(projectCwd, 'tmp/cache'))
  })

  it.each(UNSAFE_DEST_CASES)(
    'should reject unsafe dest directory: %s',
    (_name, options) => {
      expect(resolveAppConfigWith(options)).toBeNull()
    },
  )

  it.each(UNSAFE_TEMP_CACHE_CASES)(
    'should reject unsafe temp and cache directory: %s',
    (_name, options) => {
      expect(resolveAppConfigWith(options)).toBeNull()
    },
  )

  it('should report unsafe directories with their resolved paths', () => {
    expect(resolveAppConfigWith({ userConfig: { dest: '.' } })).toBeNull()

    const messages = vi.mocked(logger.error).mock.calls.flat().join('\n')
    expect(messages).toContain('dest')
    expect(messages).toContain(projectCwd)
  })
})
