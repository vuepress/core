/**
 * Remove leading slash / from a string
 */
export const removeLeadingSlash = (str: string): string =>
  str[0] === '/' ? str.slice(1) : str
