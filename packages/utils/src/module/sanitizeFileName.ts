// https://datatracker.ietf.org/doc/html/rfc2396
// https://github.com/rollup/rollup/blob/dd1a6bee7b1b436113594d3de1b0fff37ea96eb6/src/utils/sanitizeFileName.ts

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$%&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

export const sanitizeFileName = (name: string): string => {
  const driveLetter = DRIVE_LETTER_REGEX.exec(name)?.[0] || ''

  // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
  // Otherwise, avoid them because they can refer to NTFS alternate data streams.
  return (
    driveLetter +
    name
      .slice(driveLetter.length)
      .replace(INVALID_CHAR_REGEX, '_')
      .replace(/^_+/, '')
  )
}
