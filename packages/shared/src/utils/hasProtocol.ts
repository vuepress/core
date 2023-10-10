/**
 * Whether the link has a protocol
 */
export const hasProtocol = (link: string): boolean =>
  /^[a-z][a-z0-9+.-]*:/.test(link)
