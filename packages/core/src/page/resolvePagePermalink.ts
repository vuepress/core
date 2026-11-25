import { ensureLeadingSlash, isString } from '@vuepress/shared'
import { logger, path } from '@vuepress/utils'

import type { App, PageFrontmatter } from '../types/index.js'

/**
 * Match a single permalink placeholder, e.g. `:year` or `:author`
 *
 * Placeholder names start with a letter and may contain word characters, so
 * that unknown placeholders can be detected as well. Dashes are not part of a
 * name, they are common separators between placeholders.
 */
const PERMALINK_PLACEHOLDER_RE = /:([A-Za-z]\w*)/g

/**
 * Resolve page permalink from frontmatter / options / pattern
 *
 * @internal
 */
export const resolvePagePermalink = ({
  app,
  frontmatter,
  slug,
  date,
  pathInferred,
  pathLocale,
  filePathRelative = null,
}: {
  app: App
  frontmatter: PageFrontmatter
  slug: string
  date: string
  pathInferred: string | null
  pathLocale: string
  filePathRelative?: string | null
}): string | null => {
  // frontmatter.permalink has the highest priority
  if (frontmatter.permalink === null) {
    return null
  }
  if (isString(frontmatter.permalink)) {
    return frontmatter.permalink
  }

  // frontmatter.permalinkPattern has higher priority than app.options.permalinkPattern
  if (frontmatter.permalinkPattern === null) {
    return null
  }

  const permalinkPattern =
    frontmatter.permalinkPattern || app.options.permalinkPattern

  if (!isString(permalinkPattern)) {
    return null
  }

  // resolve permalink according to the pattern
  const [year, month, day] = date.split('-')

  const replacements = new Map<string, string>([
    ['year', year ?? ''],
    ['month', month ?? ''],
    ['day', day ?? ''],
    ['slug', slug],
    ['raw', pathInferred?.replace(/^\//, '') ?? ''],
  ])

  const usedPlaceholders = new Set<string>()
  const unresolvedPlaceholders = new Set<string>()

  // Replace every placeholder occurrence in a single pass.
  // A function replacer is used on purpose: replacement values may contain
  // special replacement patterns such as `$&`, `$$`, `` $` `` or `$'`, which
  // `String.prototype.replace` would otherwise interpret.
  const resolvedPattern = permalinkPattern.replace(
    PERMALINK_PLACEHOLDER_RE,
    (placeholder) => {
      const replacement = replacements.get(placeholder.slice(1))

      // keep unknown placeholders as-is, and report them below
      if (replacement === undefined) {
        unresolvedPlaceholders.add(placeholder)
        return placeholder
      }

      usedPlaceholders.add(placeholder.slice(1))
      return replacement
    },
  )

  const link = path.join(pathLocale, resolvedPattern)

  // an empty slug makes the `:slug` segment disappear, which may collapse the
  // permalink to a parent path (or even to the site root). It is not an error,
  // but it is almost never intended, so warn instead of staying silent.
  if (slug === '' && usedPlaceholders.has('slug')) {
    logger.warn(
      `the page slug is empty, so the ":slug" segment of permalink pattern "${permalinkPattern}" will be empty, resolved permalink: "${link}" (filePathRelative: ${filePathRelative ?? 'null'})`,
    )
  }

  // unknown placeholders are left as literal `:token` in the permalink, which
  // produces a broken link. Warn rather than throw to avoid breaking builds.
  if (unresolvedPlaceholders.size > 0) {
    logger.warn(
      `permalink pattern "${permalinkPattern}" contains unsupported placeholder(s) ${[...unresolvedPlaceholders].join(', ')}, which cannot be resolved and are kept literally in the permalink: "${link}" (filePathRelative: ${filePathRelative ?? 'null'})`,
    )
  }

  return ensureLeadingSlash(link)
}
