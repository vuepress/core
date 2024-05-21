import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export const testPlugin = {
  name: 'test-plugin',
  clientConfigFile: require.resolve('./clientConfig.js'),
}
