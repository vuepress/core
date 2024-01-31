/**
 * Check if a value is a function
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T extends Function>(val: T): val is T =>
  typeof val === 'function'

/**
 * Check if a value is a string
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
