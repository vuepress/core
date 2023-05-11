/**
 * Omit properties from an object
 */
export const omit = <T extends Record<string, unknown>, U extends string[]>(
  obj: T,
  ...keys: U
): Omit<T, U[number]> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}
