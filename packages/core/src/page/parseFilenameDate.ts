/**
 * Match the date prefix of a page filename
 *
 * The filename is matched as a whole, which means the date prefix has to be at
 * the beginning of the filename and followed by either the end of the filename
 * or a `-` separator. Otherwise a date in the middle of a filename, such as
 * `release-2020-01-01-notes`, would be treated as a date prefix as well.
 *
 * The trailing `(?:-(.*))?` group is the remaining part (slug) of the filename,
 * so a filename which is a bare date (e.g. `2020-01-15`) resolves to an empty
 * slug instead of taking the day as slug. It also matches a trailing `-` with
 * an empty slug (e.g. `2020-01-15-`), which previously fell back to a wrong
 * date/slug pair.
 */
const FILENAME_DATE_RE = /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?(?:-(.*))?$/

/**
 * Parse the date prefix and the slug from a page filename
 *
 * The filename should be the basename without extension.
 *
 * @example
 * - `2020-01-15` -> { date: '2020-01-15', slug: '' }
 * - `2020-01-15-foo` -> { date: '2020-01-15', slug: 'foo' }
 * - `2020-1-5-foo` -> { date: '2020-1-5', slug: 'foo' }
 * - `2020-1-5` -> { date: '2020-1-5', slug: '' }
 * - `release-2020-01-01-notes` -> null
 *
 * @internal
 */
export const parseFilenameDate = (
  filename: string,
): { date: string; slug: string } | null => {
  const matches = filename.match(FILENAME_DATE_RE)

  if (matches === null) {
    return null
  }

  const [, year, month, day = '01', slug = ''] = matches

  return {
    date: `${year}-${month}-${day}`,
    slug,
  }
}
