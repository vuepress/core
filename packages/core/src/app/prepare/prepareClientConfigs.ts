import type { App } from '../../types/index.js'

/**
 * Generate client configs temp file
 */
export const prepareClientConfigs = async (app: App): Promise<void> => {
  // plugin hook: clientConfigFile
  const clientConfigFiles =
    await app.pluginApi.hooks.clientConfigFile.process(app)

  // generate client config files entry
  const content = `\
export const clientConfigs = (await Promise.all([
${clientConfigFiles.map((filePath) => `  import('${filePath}'),`).join('\n')}
])).map((m) => m.default).filter(Boolean)
`

  await app.writeTemp('internal/clientConfigs.js', content)
}
