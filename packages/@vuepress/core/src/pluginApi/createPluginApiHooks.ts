import type { PluginApi } from '../types'
import { createHookQueue } from './createHookQueue'

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

  // client files hooks
  clientAppEnhanceFiles: createHookQueue('clientAppEnhanceFiles'),
  clientAppRootComponentFiles: createHookQueue('clientAppRootComponentFiles'),
  clientAppSetupFiles: createHookQueue('clientAppSetupFiles'),

  // bundler hooks
  alias: createHookQueue('alias'),
  define: createHookQueue('define'),
})
