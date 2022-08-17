import { execa } from 'execa'

/**
 * Get unix timestamp in milliseconds of the last commit
 */
export const getUpdatedTime = async (
  filePaths: string[],
  cwd: string
): Promise<number> => {
  const { stdout } = await execa(
    'git',
    [
      '--no-pager',
      'log',
      '--format=%at',
      // if there is only one file to be included, add `-1` option
      ...(filePaths.length > 1 ? [] : ['-1']),
      ...filePaths,
    ],
    {
      cwd,
    }
  )

  return (
    Math.max(...stdout.split('\n').map((item) => Number.parseInt(item, 10))) *
    1000
  )
}
