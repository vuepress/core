import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import type { App } from '@vuepress/core'
import autoprefixer from 'autoprefixer'
import { afterEach, describe, expect, test } from 'vitest'

import { resolvePostcssPlugins } from '../../src/index.js'

const createApp = (sourceDir: string): App =>
  ({ dir: { source: () => sourceDir } }) as unknown as App

const tempDirs: string[] = []

const createTempDir = async (): Promise<string> => {
  const dir = await mkdtemp(join(tmpdir(), 'vuepress-postcss-'))
  tempDirs.push(dir)
  return dir
}

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })),
  )
})

describe('resolvePostcssPlugins', () => {
  test('should fall back to autoprefixer when no config exists', async () => {
    const dir = await createTempDir()

    const plugins = await resolvePostcssPlugins(createApp(dir))

    expect(plugins).toEqual([autoprefixer])
  })

  test('should append autoprefixer after the plugins from config', async () => {
    const dir = await createTempDir()
    await writeFile(
      join(dir, 'postcss.config.cjs'),
      `module.exports = {
  plugins: [
    {
      postcssPlugin: 'vuepress-test-plugin',
      Once(root) {
        root.append(':root{--postcss-test:1}')
      },
    },
  ],
}
`,
      'utf8',
    )

    const plugins = await resolvePostcssPlugins(createApp(dir))

    expect(plugins).toHaveLength(2)
    expect(plugins[0]).toMatchObject({ postcssPlugin: 'vuepress-test-plugin' })
    expect(plugins[1]).toBe(autoprefixer)
  })

  test('should reject with the source directory when config is invalid', async () => {
    const dir = await createTempDir()
    await writeFile(
      join(dir, 'postcss.config.cjs'),
      'module.exports = {',
      'utf8',
    )

    const error = await resolvePostcssPlugins(createApp(dir)).catch(
      (err: unknown) => err,
    )

    expect(error).toBeInstanceOf(Error)
    if (!(error instanceof Error)) {
      throw new Error('Expected an error to be thrown')
    }
    expect(error.message).toContain(
      `[vuepress] Failed to load PostCSS config from "${dir}"`,
    )
    expect(error.cause).toBeInstanceOf(Error)
  })
})
