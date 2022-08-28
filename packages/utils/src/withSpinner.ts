import process from 'node:process'
import ora, { type Ora } from 'ora'
import { formatMs } from './formatMs.js'

export const withSpinner =
  (msg: string) =>
  async <T>(target: (spinner?: Ora) => Promise<T>): Promise<T> => {
    if (process.env.DEBUG) {
      return target()
    }

    const start = Date.now()
    const spinner = ora()
    try {
      spinner.start(msg)
      const result = await target(spinner)
      spinner.succeed(`${msg} - done in ${formatMs(Date.now() - start)}`)
      return result
    } catch (e) {
      spinner.fail(`${msg} - failed in ${formatMs(Date.now() - start)}`)
      throw e
    }
  }
