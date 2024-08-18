import type { ClientConfig } from '../clientConfig.js'

declare module '@internal/clientConfigs' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export const clientConfigs: ClientConfig[]
}
