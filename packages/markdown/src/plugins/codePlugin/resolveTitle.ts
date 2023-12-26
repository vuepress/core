/**
 * Resolve the title from token info
 */
export const resolveTitle = (info: string): string | null => {
  // try to match title mark
  const match = info.match(/<(?<title>.+)>/)

  // return title if matched, null if not specified
  return match?.groups?.title ?? null
}
