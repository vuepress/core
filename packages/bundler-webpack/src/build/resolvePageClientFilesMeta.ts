import type { FileMeta, ModuleFilesMetaMap } from './types.js'

/**
 * Get all client files according to module requests of a page
 */
export const resolvePageClientFilesMeta = ({
  moduleRequests,
  moduleFilesMetaMap,
}: {
  moduleRequests: string[]
  moduleFilesMetaMap: ModuleFilesMetaMap
}): FileMeta[] => {
  const files = new Set<FileMeta>()
  moduleRequests.forEach((request) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unsafe indexed access
    moduleFilesMetaMap[request]?.forEach((file) => files.add(file))
  })
  return Array.from(files)
}
