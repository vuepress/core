import type { App } from '../../types/index.js'

/**
 * Generate client configs temp file
 *
 * @internal
 */
export const prepareClientConfigs = async (app: App): Promise<void> => {
  // plugin hook: clientConfigFile
  const clientConfigFiles =
    await app.pluginApi.hooks.clientConfigFile.process(app)

  // generate client config files entry
  const content = `\
${clientConfigFiles
  .map(
    (filePath, index) => `import * as clientConfig${index} from '${filePath}'`,
  )
  .join('\n')}

export const clientConfigs = [
${clientConfigFiles.map((_, index) => `  clientConfig${index},`).join('\n')}
].map((m) => m.default).filter(Boolean)
`

  await app.writeTemp('internal/clientConfigs.js', content)
}
