import { fs } from '@vuepress/utils'
import { describe, expect, it, vi } from 'vitest'
import { createAppDirFunction } from '../../src/app/resolveAppDir.js'
import { resolveAppWriteTemp } from '../../src/app/resolveAppWriteTemp.js'
import type { AppDir } from '../../src/index.js'

vi.mock('@vuepress/utils', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual = await importOriginal<typeof import('@vuepress/utils')>()
  return {
    ...actual,
    fs: {
      ...actual.fs,
      outputFile: vi.fn(),
    },
  }
})

describe('resolveAppWriteTemp', () => {
  const dir = {
    temp: createAppDirFunction('/temp'),
  } as AppDir

  it('should write temp file correctly', async () => {
    const writeTemp = resolveAppWriteTemp(dir)
    const file = 'foo.txt'
    const content = 'bar'
    await writeTemp(file, content)
    expect(fs.outputFile).toHaveBeenCalledWith(dir.temp(file), 'bar')
  })

  it('should avoid overwriting newer content with older content (race condition)', async () => {
    const writeTemp = resolveAppWriteTemp(dir)
    const file = 'race.txt'
    const log: string[] = []

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    vi.mocked(fs.outputFile).mockImplementation(async (_f, c) => {
      const content = c as string
      // Simulate delay: '1' is slow, '2' is fast
      const delay = content === '1' ? 50 : 10
      await new Promise((resolve) => {
        setTimeout(resolve, delay)
      })
      log.push(content)
    })

    // Call '1' then '2' immediately
    const p1 = writeTemp(file, '1')
    const p2 = writeTemp(file, '2')

    await Promise.all([p1, p2])

    // With parallel execution and delays, '2' finishes first, then '1' overwrites it.
    // We expect the fix to ensure '1' finishes then '2', or '2' is the final write.
    // Ideally sequential execution: '1' writes, then '2' writes.
    expect(log).toEqual(['1', '2'])
  })

  it('should skip write if content is unchanged', async () => {
    vi.mocked(fs.outputFile).mockClear()
    const writeTemp = resolveAppWriteTemp(dir)
    const file = 'cache.txt'
    const content = 'foo'

    await writeTemp(file, content)
    expect(fs.outputFile).toHaveBeenCalledTimes(1)

    await writeTemp(file, content)
    expect(fs.outputFile).toHaveBeenCalledTimes(1)

    await writeTemp(file, 'bar')
    expect(fs.outputFile).toHaveBeenCalledTimes(2)
  })

  it('should skip intermediate writes', async () => {
    vi.mocked(fs.outputFile).mockClear()
    const writeTemp = resolveAppWriteTemp(dir)
    const file = 'skip.txt'
    const log: string[] = []

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    vi.mocked(fs.outputFile).mockImplementation(async (_f, c) => {
      const content = c as string
      // Simulate delay to ensure queuing
      await new Promise((resolve) => {
        setTimeout(resolve, 20)
      })
      log.push(content)
    })

    // 1. First write starts immediately
    const p1 = writeTemp(file, '1')

    // 2. Second and Third write come in while First is running
    // They should be collapsed into a single subsequent write
    const p2 = writeTemp(file, '2')
    const p3 = writeTemp(file, '3')

    await Promise.all([p1, p2, p3])

    // '1' is written (started before others).
    // '2' is skipped because '3' arrived while '1' was running, updating the nextContent.
    // '3' is written after '1' finishes.
    expect(log).toEqual(['1', '3'])
  })
})
