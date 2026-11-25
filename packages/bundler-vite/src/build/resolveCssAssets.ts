import type { OutputAsset, RolldownOutput } from 'rolldown'

/**
 * Resolve all css assets from client bundle output
 *
 * The output array order is kept so that the styles are rendered in a stable
 * and predictable order. Assets with duplicated file names are deduped.
 */
export const resolveCssAssets = (
  output: RolldownOutput['output'],
): OutputAsset[] => {
  const fileNames = new Set<string>()
  const cssAssets: OutputAsset[] = []

  for (const item of output) {
    if (
      item.type === 'asset' &&
      item.fileName.endsWith('.css') &&
      !fileNames.has(item.fileName)
    ) {
      fileNames.add(item.fileName)
      cssAssets.push(item)
    }
  }

  return cssAssets
}
