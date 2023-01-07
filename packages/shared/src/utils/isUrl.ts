// eslint-disable-next-line vue/prefer-import-from-vue
import { isString } from '@vue/shared'

/**
 * check if a variable is a valid url
 */
export const isUrl = (test: unknown): boolean => {
  if (!isString(test) || test === '') return false

  // url Math
  const result = /^(?:\w+:)?\/\/(\S+)$/u.exec(test)

  const address = result?.[1]

  if (!address) return false

  return (
    // address with localhost
    /^localhost[:?\d]*(?:[^:?\d]\S*)?$/u.test(address) ||
    // address without localhost
    /^[^\s.]+\.\S{2,}$/u.test(address)
  )
}
