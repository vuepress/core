import process from 'node:process'
import type { Ora } from 'ora'
import ora from 'ora'
import { formatMs } from './formatMs.js'

export const withSpinner =
  (msg: string) =>
  async <T>(target: (spinner?: Ora) => Promise<T>): Promise<T> => {
    if (process.env.DEBUG) {
      return target();
    }

    const start = Date.now();
    const spinner = ora();
    try {
      spinner.start(msg);
      const result = await target(spinner);
      const after = Date.now();
      spinner.succeed(`${msg} - done in ${formatMs(after - start)}`);
      return result;
    } catch (e) {
      const after = Date.now();
      spinner.fail(`${msg} - failed in ${formatMs(after - start)}`);
      throw e
    }
  }
