import { fs, getDirname, path } from 'vuepress/utils'

const DIRNAME = getDirname(import.meta.url)

const resolveSourceMarkdownPath = (...args: string[]): string =>
  path.resolve(DIRNAME, '../docs', ...args)

export const readSourceMarkdown = async (filePath: string): Promise<string> =>
  fs.readFile(resolveSourceMarkdownPath(filePath), 'utf-8')

export const writeSourceMarkdown = async (
  filePath: string,
  content: string,
): Promise<void> => fs.writeFile(resolveSourceMarkdownPath(filePath), content)
