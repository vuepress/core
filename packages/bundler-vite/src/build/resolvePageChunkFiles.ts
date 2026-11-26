import type { Page } from '@vuepress/core'
import type { OutputChunk, RolldownOutput } from 'rolldown'

const collectChunkFiles = ({
  fileName,
  imports,
  dynamicImports,
}: OutputChunk): string[] => [fileName, ...imports, ...dynamicImports]

/**
 * Create a resolver to get the client chunk files of a page
 *
 * The output is indexed by facade module id once, so that resolving each page
 * does not have to scan the whole output again
 */
export const createPageChunkFilesResolver = (
  output: RolldownOutput['output'],
): ((page: Page) => string[]) => {
  // index chunk files by facade module id
  const chunkFilesMap = new Map<string, string[]>()
  for (const item of output) {
    if (item.type !== 'chunk' || item.facadeModuleId === null) continue
    chunkFilesMap.set(item.facadeModuleId, collectChunkFiles(item))
  }

  // chunks merged by `manualChunks` or `output.codeSplitting` have no facade
  // module id, so the page chunk path can only be found in their module ids
  const resolveMergedChunkFiles = (chunkFilePath: string): string[] =>
    output.flatMap((item) =>
      item.type === 'chunk' && item.moduleIds.includes(chunkFilePath)
        ? collectChunkFiles(item)
        : [],
    )

  // a page may be resolved multiple times, e.g. for the page chunk files map
  // and for rendering the page, so cache the result to keep the same reference
  const pageChunkFilesMap = new Map<Page, string[]>()

  return (page) => {
    const cached = pageChunkFilesMap.get(page)
    if (cached !== undefined) return cached

    const pageChunkFiles =
      chunkFilesMap.get(page.chunkFilePath) ??
      resolveMergedChunkFiles(page.chunkFilePath)

    pageChunkFilesMap.set(page, pageChunkFiles)
    return pageChunkFiles
  }
}
