/**
 * Resolve the specified attribute from token info
 */
export const resolveAttr = (info: string, attr: string): string | null => {
  // try to match specified attr mark
  const pattern = `\\b${attr}\\s*=\\s*['"](?<title>.+)['"](\\s|$)`
  const regex = new RegExp(pattern, 'i')
  const match = info.match(regex)

  // return title if matched, null if not specified
  return match?.groups?.title ?? null
}
