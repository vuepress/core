import { execa } from 'execa'
import type { GitContributor } from '../types.js'

export const getContributors = async (
  filePaths: string[],
  cwd: string
): Promise<GitContributor[]> => {
  const { stdout } = await execa(
    'git',
    ['--no-pager', 'shortlog', '-nes', 'HEAD', '--', ...filePaths],
    {
      cwd,
      stdin: 'inherit',
    }
  )

  return stdout
    .split('\n')
    .map((item) => item.trim().match(/^(\d+)\t(.*) <(.*)>$/))
    .filter((item): item is RegExpMatchArray => item !== null)
    .map(([, commits, name, email]) => ({
      name,
      email,
      commits: Number.parseInt(commits, 10),
    }))
}
