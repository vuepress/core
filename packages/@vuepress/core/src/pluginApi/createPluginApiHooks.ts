import type { PluginApi } from '../types'
import { createHookQueue } from './createHookQueue'

export const createPluginApiHooks = (): PluginApi['hooks'] => ({
  // life cycle hooks
  beforeInitialize: createHookQueue('beforeInitialize'),
  onInitialized: createHookQueue('onInitialized'),
  onPrepared: createHookQueue('onPrepared'),
  onWatched: createHookQueue('onWatched'),
  onGenerated: createHookQueue('onGenerated'),

  // extends hooks
  extendsMarkdownOptions: createHookQueue('extendsMarkdownOptions'),
  extendsMarkdown: createHookQueue('extendsMarkdown'),
  extendsPageOptions: createHookQueue('extendsPageOptions'),
  extendsPage: createHookQueue('extendsPage'),
  extendsBundlerOptions: createHookQueue('extendsBundlerOptions'),

  // client config file hooks
  clientConfigFile: createHookQueue('clientConfigFile'),

  // bundler hooks
  alias: createHookQueue('alias'),
  define: createHookQueue('define'),
})
