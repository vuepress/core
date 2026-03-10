/**
 * Omit properties from an object
 */
export const omit = <T extends Record<string, unknown>, Keys extends string[]>(
  obj: T,
  ...keys: Keys
): Omit<T, Keys[number]> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}
