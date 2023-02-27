/**
 * Omit properties from an object
 */
export const omit = <T extends Record<string, unknown>>(
  obj: T,
  ...keys: string[]
): Omit<T, (typeof keys)[number]> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}
