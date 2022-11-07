import colors from 'picocolors'

export const info = (...args: any[]): void => {
  console.log(colors.cyan('info'), ...args)
}

export const tip = (...args: any[]): void => {
  console.log(colors.blue('tip'), ...args)
}

export const success = (...args: any[]): void => {
  console.log(colors.green('success'), ...args)
}

export const warn = (...args: any[]): void => {
  console.warn(colors.yellow('warning'), ...args)
}

export const error = (...args: any[]): void => {
  console.error(colors.red('error'), ...args)
}

export const createError = (message?: string | undefined): Error => {
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
