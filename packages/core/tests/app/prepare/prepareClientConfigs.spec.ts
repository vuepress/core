import { describe, expect, it, vi } from 'vitest'

import { prepareClientConfigs } from '../../../src/app/prepare/prepareClientConfigs.js'
import type { App, AppWriteTemp } from '../../../src/index.js'

const createTestApp = (clientConfigFiles: string[]): App =>
  ({
    pluginApi: {
      hooks: {
        clientConfigFile: {
          process: () => Promise.resolve(clientConfigFiles),
        },
      },
    },
    writeTemp: vi.fn<
      (...args: Parameters<AppWriteTemp>) => ReturnType<AppWriteTemp>
    >(() => Promise.resolve('')),
  }) as unknown as App

describe('prepareClientConfigs', () => {
  it('should escape file paths of generated import statements', async () => {
    const clientConfigFiles = [
      '/path/to/config.js',
      'D:\\projects\\docs\\.pnpm-store\\v11\\7a666e33\\config.js',
    ]
    const app = createTestApp(clientConfigFiles)

    await prepareClientConfigs(app)

    const content = vi.mocked(app.writeTemp).mock.calls[0]?.[1]
    expect(content).toContain(
      `import * as clientConfig0 from ${JSON.stringify(clientConfigFiles[0])}`,
    )
    expect(content).toContain(
      `import * as clientConfig1 from ${JSON.stringify(clientConfigFiles[1])}`,
    )
  })

  it('should not emit raw single-quoted file paths', async () => {
    const app = createTestApp(['D:\\path\\7a666e33\\config.js'])

    await prepareClientConfigs(app)

    const content = vi.mocked(app.writeTemp).mock.calls[0]?.[1]
    expect(content).not.toContain("from '")
  })
})
