import process from 'node:process'

import type { Ora } from 'ora'
import { beforeEach, expect, it, vi } from 'vitest'

import { withSpinner } from '../../src/index.js'

const mocks = vi.hoisted(() => {
  const start = vi.fn<Ora['start']>()
  const succeed = vi.fn<Ora['succeed']>()
  const fail = vi.fn<Ora['fail']>()
  const oraMock = vi
    .fn<() => Pick<Ora, 'fail' | 'start' | 'succeed'>>()
    .mockReturnValue({
      start,
      succeed,
      fail,
    })

  return {
    ora: oraMock,
    start,
    succeed,
    fail,
  }
})

vi.mock('ora', () => ({
  default: mocks.ora,
}))

beforeEach(() => {
  Object.values(mocks).forEach((mock) => mock.mockClear())
})

it('should skip spinner if DEBUG env is set', async () => {
  process.env.DEBUG = 'msg'

  const target = vi
    .fn<(spinner?: Ora) => Promise<string>>()
    .mockResolvedValue('result')

  const result = await withSpinner('msg')(target)

  expect(result).toBe('result')
  expect(target).toHaveBeenCalledTimes(1)
  expect(mocks.ora).toHaveBeenCalledTimes(0)

  delete process.env.DEBUG
})

it('should call target with spinner.succeed', async () => {
  const target = vi
    .fn<(spinner?: Ora) => Promise<string>>()
    .mockResolvedValue('result')

  const result = await withSpinner('msg')(target)

  expect(result).toBe('result')
  expect(target).toHaveBeenCalledTimes(1)
  expect(mocks.ora).toHaveBeenCalledTimes(1)
  expect(mocks.start).toHaveBeenCalledWith('msg')
  expect(mocks.succeed).toHaveBeenCalledTimes(1)
  expect(mocks.fail).toHaveBeenCalledTimes(0)
})

it('should call target with spinner.fail', async () => {
  const error = new Error('mock error')
  const target = vi
    .fn<(spinner?: Ora) => Promise<string>>()
    .mockRejectedValue(error)

  await expect(async () => withSpinner('msg')(target)).rejects.toThrow(error)

  expect(target).toHaveBeenCalledTimes(1)
  expect(mocks.ora).toHaveBeenCalledTimes(1)
  expect(mocks.start).toHaveBeenCalledWith('msg')
  expect(mocks.succeed).toHaveBeenCalledTimes(0)
  expect(mocks.fail).toHaveBeenCalledTimes(1)
})
