import type { PluginApi } from '../types/index.js'
import { createHookQueue } from './createHookQueue.js'

export const createPluginApiHooks = (): PluginApi['hooks'] => ({
  // life cycle hooks
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
