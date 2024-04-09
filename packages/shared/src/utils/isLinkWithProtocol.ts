/**
 * Determine a link has protocol or not
 */
export const isLinkWithProtocol = (link: string): boolean =>
  /^[a-z][a-z0-9+.-]*:/.test(link) || link.startsWith('//')
