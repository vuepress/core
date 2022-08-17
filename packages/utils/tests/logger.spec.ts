import { describe, expect, it, vi } from 'vitest'
import { logger } from '../src/index.js'

const methods = [
  ['info', 'log'],
  ['tip', 'log'],
  ['success', 'log'],
  ['warn', 'warn'],
  ['error', 'error'],
]

describe('utils > logger', () => {
  methods.forEach(([method, innerMethod]) => {
    it(method, () => {
      const stored = console[innerMethod]
      console[innerMethod] = vi.fn()

      logger[method]('foo')
      expect(console[innerMethod]).toHaveBeenCalledWith(
        expect.any(String),
        'foo'
      )

      console[innerMethod] = stored
    })
  })

  it('creteError', () => {
    const stored = console.error
    console.error = vi.fn()

    expect(logger.createError()).toBeInstanceOf(Error)
    expect(console.error).toHaveBeenCalled()

    console.error = stored
  })
})
