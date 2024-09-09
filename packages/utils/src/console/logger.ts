/* eslint-disable no-console */
import colors from 'picocolors'

export const info = (...args: unknown[]): void => {
  console.log(colors.cyan('info'), ...args)
}

export const tip = (...args: unknown[]): void => {
  console.log(colors.blue('tip'), ...args)
}

export const success = (...args: unknown[]): void => {
  console.log(colors.green('success'), ...args)
}

export const warn = (...args: unknown[]): void => {
  console.warn(colors.yellow('warning'), ...args)
}

export const error = (...args: unknown[]): void => {
  console.error(colors.red('error'), ...args)
}

export const createError = (message?: string): Error => {
  error(message)
  return new Error(message)
}

export const logger = {
  info,
  tip,
  success,
  warn,
  error,
  createError,
}
