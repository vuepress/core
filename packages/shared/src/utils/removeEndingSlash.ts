/**
 * Remove ending slash / from a string
 */
export const removeEndingSlash = (str: string): string =>
  str[str.length - 1] === '/' ? str.slice(0, -1) : str
