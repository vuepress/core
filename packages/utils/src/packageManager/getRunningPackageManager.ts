export interface RunningPackageMangerInfo {
  name: string
  version: string
}

const getPackageManagerFromUserAgent = (
  userAgent: string,
): RunningPackageMangerInfo => {
  const packageMangerSpec = userAgent.split(' ')[0]

  const separatorPos = packageMangerSpec.lastIndexOf('/')
  const name = packageMangerSpec.substring(0, separatorPos)

  return {
    name: name === 'npminstall' ? 'cnpm' : name,
    version: packageMangerSpec.substring(separatorPos + 1),
  }
}

export const getRunningPackageManager = (): RunningPackageMangerInfo | null => {
  if (!process.env.npm_config_user_agent) return null

  return getPackageManagerFromUserAgent(process.env.npm_config_user_agent)
}
