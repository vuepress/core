import { execa } from 'execa'

/**
 * Get unix timestamp in milliseconds of the first commit
 */
export const getCreatedTime = async (
  filePaths: string[],
  cwd: string
): Promise<number> => {
  const { stdout } = await execa(
    'git',
    ['--no-pager', 'log', '--diff-filter=A', '--format=%at', ...filePaths],
    {
      cwd,
    }
  )

  return (
    Math.min(...stdout.split('\n').map((item) => Number.parseInt(item, 10))) *
    1000
  )
}
