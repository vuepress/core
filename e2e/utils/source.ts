import { fs, getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

const resolveSourceMarkdownPath = (...args: string[]): string =>
  path.resolve(__dirname, '../docs', ...args)

export const readSourceMarkdown = async (filePath: string): Promise<string> =>
  fs.readFile(resolveSourceMarkdownPath(filePath), 'utf-8')

export const writeSourceMarkdown = async (
  filePath: string,
  content: string,
): Promise<void> => fs.writeFile(resolveSourceMarkdownPath(filePath), content)
