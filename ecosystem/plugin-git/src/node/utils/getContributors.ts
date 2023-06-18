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
    .filter((item, index, self) => {
      // If one of the contributors is a "noreply" email address, *and* there's
      // already a contributor *with the same name*, it is very likely a duplicate,
      // so it can be removed.
      if (
        item.email.includes('@') &&
        (item.email.split('@')[1].includes('noreply') ||
          item.email.split('@')[1].includes('no-reply'))
      ) {
        return index === self.findIndex((t) => t.name === item.name)
      }
      return true
    })
}
