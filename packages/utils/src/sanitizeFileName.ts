// https://github.com/rollup/rollup/blob/69ff4181e701a0fe0026d0ba147f31bc86beffa8/src/utils/sanitizeFileName.ts

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

export const sanitizeFileName = (name: string): string => {
  const driveLetter = DRIVE_LETTER_REGEX.exec(name)?.[0] || ''

  return (
    driveLetter +
    name
      .substring(driveLetter.length)
      .replace(INVALID_CHAR_REGEX, '_')
      .replace(/^_+/, '')
  )
}
