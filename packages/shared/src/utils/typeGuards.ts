/**
 * Check if a value is a function
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

/**
 * Check if a value is plain object, with generic type support
 */
export const isPlainObject = <
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  val: unknown,
): val is T => Object.prototype.toString.call(val) === '[object Object]'

/**
 * Check if a value is a string
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
