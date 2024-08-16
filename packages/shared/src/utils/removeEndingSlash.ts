/**
 * Remove ending slash / from a string
 */
export const removeEndingSlash = (str: string): string =>
  str.endsWith('/') ? str.slice(0, -1) : str
