import process from 'node:process'

import type { MockInstance } from 'vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createCli, runCli } from '../src/index.js'

const runCliWithArgs = async (...args: string[]): Promise<void> => {
  await runCli(createCli(), ['node', 'vuepress', ...args])
}

const getText = (spy: MockInstance): string =>
  spy.mock.calls
    .map((call) => call.map((arg) => String(arg)).join(' '))
    .join('\n')

const countUsage = (text: string): number =>
  text.match(/^Usage:/gm)?.length ?? 0

let infoSpy: MockInstance
let errorSpy: MockInstance

beforeEach(() => {
  infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  process.exitCode = undefined
})

afterEach(() => {
  vi.restoreAllMocks()
  process.exitCode = undefined
})

describe('help and version output', () => {
  it('prints global help only once for `--help`', async () => {
    await runCliWithArgs('--help')

    expect(infoSpy).toHaveBeenCalledTimes(1)
    expect(countUsage(getText(infoSpy))).toBe(1)
    expect(getText(infoSpy)).toContain('$ vuepress <command> [options]')
    expect(errorSpy).not.toHaveBeenCalled()
    expect(process.exitCode).toBeUndefined()
  })

  it('prints global help only once when no command is given', async () => {
    await runCliWithArgs()

    expect(infoSpy).toHaveBeenCalledTimes(1)
    expect(countUsage(getText(infoSpy))).toBe(1)
    expect(process.exitCode).toBeUndefined()
  })

  it('prints version only once and exits with code 0 for `-v`', async () => {
    await runCliWithArgs('-v')

    const text = getText(infoSpy)
    expect(infoSpy).toHaveBeenCalledTimes(1)
    expect(text).toContain('vuepress/core@')
    expect(text).toContain('vuepress/cli@')
    expect(countUsage(text)).toBe(0)
    expect(errorSpy).not.toHaveBeenCalled()
    expect(process.exitCode).toBeUndefined()
  })

  it('prints command help only once for `dev --help`', async () => {
    await runCliWithArgs('dev', '--help')

    const text = getText(infoSpy)
    expect(infoSpy).toHaveBeenCalledTimes(1)
    expect(countUsage(text)).toBe(1)
    expect(text).toContain('$ vuepress dev [sourceDir]')
    expect(text).not.toContain('$ vuepress <command> [options]')
    expect(errorSpy).not.toHaveBeenCalled()
    expect(process.exitCode).toBeUndefined()
  })

  it('prints command help only once for `build --help`', async () => {
    await runCliWithArgs('build', '--help')

    const text = getText(infoSpy)
    expect(infoSpy).toHaveBeenCalledTimes(1)
    expect(countUsage(text)).toBe(1)
    expect(text).toContain('$ vuepress build [sourceDir]')
    expect(text).not.toContain('$ vuepress <command> [options]')
    expect(errorSpy).not.toHaveBeenCalled()
    expect(process.exitCode).toBeUndefined()
  })
})

describe('cli errors', () => {
  it('reports unknown commands with a non-zero exit code', async () => {
    await runCliWithArgs('buidl')

    expect(infoSpy).not.toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(getText(errorSpy)).toContain('Unknown command `buidl`')
    expect(process.exitCode).toBe(1)
  })

  it('reports unknown options without printing the internal stack', async () => {
    await runCliWithArgs('dev', '--bogus')

    const text = getText(errorSpy)
    expect(infoSpy).not.toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(text).toContain('Unknown option `--bogus`')
    expect(text).not.toContain('CACError')
    expect(text).not.toContain('    at ')
    expect(process.exitCode).toBe(1)
  })

  it('reports missing option values without printing the internal stack', async () => {
    await runCliWithArgs('dev', '--port')

    const text = getText(errorSpy)
    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(text).toContain('value is missing')
    expect(text).not.toContain('CACError')
    expect(process.exitCode).toBe(1)
  })

  it('reports unused args without printing the internal stack', async () => {
    await runCliWithArgs('dev', 'a', 'b')

    const text = getText(errorSpy)
    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(text).toContain('Unused args: `b`')
    expect(text).not.toContain('CACError')
    expect(process.exitCode).toBe(1)
  })

  it('prints the internal stack with `--debug`', async () => {
    await runCliWithArgs('dev', '--bogus', '--debug')

    const text = getText(errorSpy)
    expect(text).toContain('Unknown option `--bogus`')
    expect(text).toContain('CACError')
    expect(text).toContain('    at ')
    expect(process.exitCode).toBe(1)
  })
})
