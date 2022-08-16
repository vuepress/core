import type { Page } from '@vuepress/core'
import type { OutputChunk, RollupOutput } from 'rollup'

export const resolvePageChunkFiles = ({
  page,
  output,
}: {
  page: Page
  output: RollupOutput['output']
}): string[] =>
  output
    .filter(
      (item): item is OutputChunk =>
        item.type === 'chunk' &&
        (item.facadeModuleId === page.componentFilePath ||
          item.facadeModuleId === page.dataFilePath)
    )
    .flatMap(({ fileName, imports, dynamicImports }) => [
      fileName,
      ...imports,
      ...dynamicImports,
    ])
