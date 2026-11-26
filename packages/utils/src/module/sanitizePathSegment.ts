// https://datatracker.ietf.org/doc/html/rfc2396

// oxlint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$%&*+,;<=>?[\]^`{|}\u007F]/g
const SEPARATOR_REGEX = /[\\/:]+/g

/**
 * Sanitize a single path segment, e.g. a segment of a page path
 *
 * Besides the characters which are not allowed in an RFC 2396 URI, separators
 * (`/`, `\` and `:`) are replaced as well, so that a single segment can never
 * contain another path segment.
 *
 * Unlike `sanitizeFileName`, leading underscores are preserved, and `.` / `..`
 * are replaced to avoid path traversal.
 *
 * This only rewrites invalid characters. It is NOT a security boundary: callers
 * that use the result as a file system path must still validate the final path
 * (e.g. with `isChildPath`) to make sure it stays inside the intended directory.
 */
export const sanitizePathSegment = (segment: string): string => {
  const sanitized = segment
    .replace(SEPARATOR_REGEX, '_')
    .replace(INVALID_CHAR_REGEX, '_')

  return sanitized === '.' || sanitized === '..' ? '_' : sanitized
}
