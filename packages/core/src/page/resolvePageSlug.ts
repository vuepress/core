import { path } from '@vuepress/utils'

import { parseFilenameDate } from './parseFilenameDate.js'

/**
 * Resolve page slug from filename
 *
 * Only a date prefix at the beginning of the filename is stripped. A date in
 * the middle of the filename (e.g. `release-2020-01-01-notes`) is a part of the
 * slug, and a filename which is a bare date (e.g. `2020-01-15`) has an empty
 * slug because the whole filename is the date prefix.
 *
 * @internal
 */
export const resolvePageSlug = ({
  filePathRelative,
}: {
  filePathRelative: string | null
}): string => {
  if (!filePathRelative) {
    return ''
  }
  const filename = path.parse(filePathRelative).name
  const filenameDate = parseFilenameDate(filename)
  return filenameDate === null ? filename : filenameDate.slug
}
