import { createBaseApp } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'
import { describe, expect, it } from 'vitest'
import { preparePaletteFile, presetOptions } from '../../src/node/index.js'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: { name: 'test' },
  bundler: {} as any,
  temp: path.resolve(__dirname, '../__fixtures__/.temp'),
})

describe('plugin-palette > node > preparePaletteFile', () => {
  describe('should generate palette temp files correctly', () => {
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
        const userPaletteFile = path.resolve(
          __dirname,
          '../__fixtures__',
          name,
          `palette.${ext}`
        )
        const { tempPaletteFile, importCode } = presetOptions[name]
        const tempFile = await preparePaletteFile(app, {
          userPaletteFile,
          tempPaletteFile,
          importCode,
        })
        const result = (await fs.readFile(tempFile)).toString()
        expect(result).toEqual(importCode(userPaletteFile))
      })
    )
  })

  it('should generate empty palette temp file', async () => {
    const userPaletteFile = path.resolve(
      __dirname,
      '../__fixtures__',
      'non-existent.css'
    )
    const tempFile = await preparePaletteFile(app, {
      userPaletteFile,
      tempPaletteFile: 'styles/non-existent-palette.css',
      importCode: presetOptions.css.importCode,
    })
    const result = (await fs.readFile(tempFile)).toString()
    expect(result).toEqual('')
  })
})
