/**
 * Ensure a url string to have ending slash /
 */
export const ensureEndingSlash = (str: string): string =>
  str.endsWith('/') || str.endsWith('.html') ? str : `${str}/`
