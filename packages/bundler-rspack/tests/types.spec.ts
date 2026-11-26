import type { DevServer } from '@rspack/core'
import type { Configuration } from '@rspack/dev-server'
import type { RspackChain as UpstreamRspackChain } from 'rspack-chain'
import { expectTypeOf, test } from 'vitest'

import type {
  RspackBundlerOptions,
  RspackChain,
  RspackDevServerConfiguration,
} from '../src/index.js'

test('should expose the rspack-chain type', () => {
  expectTypeOf<RspackChain>().toEqualTypeOf<UpstreamRspackChain>()
  expectTypeOf<NonNullable<RspackBundlerOptions['chainRspack']>>()
    .parameter(0)
    .toEqualTypeOf<RspackChain>()
})

test('should expose the rspack dev-server configuration type', () => {
  expectTypeOf<RspackDevServerConfiguration>().toEqualTypeOf<Configuration>()
  expectTypeOf<RspackDevServerConfiguration>().toEqualTypeOf<DevServer>()
  expectTypeOf<
    RspackBundlerOptions['devServerSetupMiddlewares']
  >().toEqualTypeOf<RspackDevServerConfiguration['setupMiddlewares']>()
})
