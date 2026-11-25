const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Whether the given year is a leap year
 */
const isLeapYear = (year: number): boolean =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

/**
 * Whether the given year, month and day represent a real calendar date
 */
const isValidCalendarDate = (
  year: number,
  month: number,
  day: number,
): boolean => {
  // month should be in range of 1-12
  if (month < 1 || month > 12) {
    return false
  }

  // day should be in range of 1 - the last day of that month
  const lastDayOfMonth =
    month === 2 && isLeapYear(year) ? 29 : DAYS_IN_MONTH[month - 1]

  return day >= 1 && day <= lastDayOfMonth
}

/**
 * Format a date string to `yyyy-MM-dd`
 *
 * A string that does not match the `yyyy-(M)M-(d)d` pattern, or that does not
 * represent a real calendar date (e.g. `2020-13-45`, `2020-02-31`), will fall
 * back to `defaultDateString`.
 */
export const formatDateString = (
  str: string,
  defaultDateString = '',
): string => {
  // match the `yyyy-(M)M-(d)d` pattern
  const dateMatch = str.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/)

  // return `defaultDateString` if no matched pattern
  if (dateMatch === null) {
    return defaultDateString
  }

  const [, yearStr, monthStr, dayStr] = dateMatch

  // return `defaultDateString` if the matched date is not a real calendar date
  if (!isValidCalendarDate(Number(yearStr), Number(monthStr), Number(dayStr))) {
    return defaultDateString
  }

  // fill leading zeros for month and day
  return [yearStr, monthStr.padStart(2, '0'), dayStr.padStart(2, '0')].join('-')
}
