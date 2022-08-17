import { createBaseApp } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { prepareStyleFile, presetOptions } from '../../src/node/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
  temp: path.resolve(__dirname, '../__fixtures__/.temp'),
})

describe('plugin-palette > node > prepareStyleFile', () => {
  describe('should generate style temp files correctly', () => {
    const testCases = [
      {
        name: 'css',
        ext: 'css',
      },
      {
        name: 'sass',
        ext: 'scss',
      },
      {
        name: 'less',
        ext: 'less',
      },
      {
        name: 'stylus',
        ext: 'styl',
      },
    ]

    testCases.forEach(({ name, ext }) =>
      it(`${name}`, async () => {
        const userStyleFile = path.resolve(
          __dirname,
          '../__fixtures__',
          name,
          `index.${ext}`
        )
        const { tempStyleFile, importCode } = presetOptions[name]
        const tempFile = await prepareStyleFile(app, {
          userStyleFile,
          tempStyleFile,
          importCode,
        })
        const result = (await fs.readFile(tempFile)).toString()
        expect(result).toEqual(importCode(userStyleFile))
      })
    )
  })

  it('should generate empty style temp file', async () => {
    const userStyleFile = path.resolve(
      __dirname,
      '../__fixtures__',
      'non-existent.css'
    )
    const tempFile = await prepareStyleFile(app, {
      userStyleFile,
      tempStyleFile: 'styles/non-existent-style.css',
      importCode: presetOptions.css.importCode,
    })
    const result = (await fs.readFile(tempFile)).toString()
    expect(result).toEqual('')
  })
})
