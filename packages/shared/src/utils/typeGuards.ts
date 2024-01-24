/**
 * Check if a value is a function
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

/**
 * Check if a value is a string
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
