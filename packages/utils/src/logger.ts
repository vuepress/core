import picocolors from 'picocolors'

export const info = (...args: any[]): void => {
  console.log(picocolors.cyan('info'), ...args)
}

export const tip = (...args: any[]): void => {
  console.log(picocolors.blue('tip'), ...args)
}

export const success = (...args: any[]): void => {
  console.log(picocolors.green('success'), ...args)
}

export const warn = (...args: any[]): void => {
  console.warn(picocolors.yellow('warning'), ...args)
}

export const error = (...args: any[]): void => {
  console.error(picocolors.red('error'), ...args)
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
