/**
 * Resolve version of vuepress app
 */
export const resolveAppVersion = (): string => {
  return require('../../package.json').version
}
