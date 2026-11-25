const protocolRegexp = /^[a-z][a-z0-9+.-]*:/i

// Windows drive letter path, e.g. `C:\docs` or `c:/docs`
const driveLetterRegexp = /^[a-z]:[\\/]/i

/**
 * Determine a link has protocol or not
 */
export const isLinkWithProtocol = (link: string): boolean =>
  (protocolRegexp.test(link) && !driveLetterRegexp.test(link)) ||
  link.startsWith('//')
