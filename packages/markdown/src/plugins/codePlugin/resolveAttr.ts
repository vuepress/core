/**
 * Resolve the specified attribute from token info
 */
export const resolveAttr = (info: string, attr: string): string | null => {
  // try to match specified attr mark
  const pattern = `\\b${attr}\\s*=\\s*(?<quote>['"])(?<content>.+?)\\k<quote>(\\s|$)`
  const regex = new RegExp(pattern, 'i')
  const match = info.match(regex)

  // return content if matched, null if not specified
  return match?.groups?.content ?? null
}
