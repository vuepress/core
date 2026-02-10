/**
 * Check if a value is a function
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

/**
 * Check if a value is plain object, with generic type support
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-parameters
export const isPlainObject = <T extends Record<any, any> = Record<any, any>>(
  val: unknown,
): val is T => Object.prototype.toString.call(val) === '[object Object]'

/**
 * Check if a value is empty object
 */
export const isEmptyObject = (val: unknown): boolean => {
  if (!isPlainObject(val)) return false
  // eslint-disable-next-line no-unreachable-loop
  for (const key in val) return false
  return true
}

/**
 * Check if a value is a string
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
