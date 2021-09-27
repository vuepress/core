import * as execa from 'execa'

/**
 * Get unix timestamp in milliseconds of the last commit
 */
export const getUpdatedTime = async (
  filePaths: string[],
  cwd: string
): Promise<number> => {
  const { stdout } = await execa(
    'git',
    ['--no-pager', 'log', '-1', '--format=%at', ...filePaths],
    {
      cwd,
    }
  )

  const timestamps = stdout.split('\n').map((item) => Number.parseInt(item, 10))

  return Math.max(...timestamps) * 1000
}
