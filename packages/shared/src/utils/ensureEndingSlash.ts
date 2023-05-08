/**
 * Ensure a url string to have ending slash /
 */
export const ensureEndingSlash = (str: string): string =>
  str[str.length - 1] === '/' || str.endsWith('.html') ? str : `${str}/`
