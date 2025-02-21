const INTERNAL_WITH_EXT_REGEXP = /^([^#?]*?(?:\/|\.md|\.html))([#?].*)?$/
const CLEAN_INTERNAL_REGEXP = /^([^#?]*?(?:[^.#?]))([#?].*)?$/

export interface LinkInfo {
  pathname: string
  hashAndQuery: string
}

export const isLinkInternal = (
  href: string,
  cleanUrl: boolean,
): LinkInfo | false => {
  const extMatched = INTERNAL_WITH_EXT_REGEXP.exec(href)

  if (extMatched) {
    return {
      pathname: extMatched[1],
      hashAndQuery: extMatched[2] || '',
    }
  }

  if (cleanUrl) {
    const cleanMatched = CLEAN_INTERNAL_REGEXP.exec(href)

    if (cleanMatched) {
      return {
        pathname: cleanMatched[1],
        hashAndQuery: cleanMatched[2] || '',
      }
    }
  }

  return false
}
