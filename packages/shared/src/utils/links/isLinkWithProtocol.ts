const PROTOCOL_REGEXP = /^[a-z][a-z0-9+.-]*:/i

// Windows drive letter path, e.g. `C:\docs` or `c:/docs`
const DRIVE_LETTER_REGEXP = /^[a-z]:[\\/]/i

/**
 * Determine a link has protocol or not
 */
export const isLinkWithProtocol = (link: string): boolean =>
  (PROTOCOL_REGEXP.test(link) && !DRIVE_LETTER_REGEXP.test(link)) ||
  link.startsWith('//')
