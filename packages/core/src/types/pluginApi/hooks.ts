import type { Markdown, MarkdownOptions } from '@vuepress/markdown'
import type { App } from '../app/index.js'
import type { BundlerOptions } from '../bundler.js'
import type { Page, PageOptions } from '../page.js'

// util type
type PromiseOrNot<T> = Promise<T> | T
interface Closable {
  close(): void
}

/**
 * Stages for the `onCleanup` lifecycle hook.
 *
 * - `'compile-end'` - After build compilation.
 * - `'prepared'` - After all `onPrepared` hooks have completed.
 * - `'ready'` - After the dev server successfully starts.
 * - `'restart'` - Before the dev server restarts.
 */
export type CleanupHookStage = 'compile-end' | 'prepared' | 'ready' | 'restart'

// base hook type
export interface Hook<
  Exposed,
  Normalized = Exposed,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- `any` type is required to infer the result type correctly
  Result = Normalized extends (...args: any) => infer U
    ? U extends Promise<infer V>
      ? V
      : U
    : never,
> {
  exposed: Exposed
  normalized: Normalized
  result: Result
}

// life-cycle hook
export type LifeCycleHook<T extends unknown[] = []> = Hook<
  (app: App, ...args: T) => PromiseOrNot<void>
>

// extends hook
export type ExtendsHook<T> = Hook<
  (extendable: T, app: App) => PromiseOrNot<void>
>

// hook that returns a string
export type ClientConfigFileHook = Hook<
  string | ((app: App) => PromiseOrNot<string>),
  (app: App) => Promise<string>
>

// alias hook
export type AliasHook = Hook<
  | Record<string, string>
  | ((app: App, isServer: boolean) => PromiseOrNot<Record<string, string>>),
  (app: App, isServer: boolean) => Promise<Record<string, string>>
>

// define hook
export type DefineHook = Hook<
  | Record<string, unknown>
  | ((app: App, isServer: boolean) => PromiseOrNot<Record<string, unknown>>),
  (app: App, isServer: boolean) => Promise<Record<string, unknown>>
>

/**
 * List of hooks
 */
export interface Hooks {
  onInitialized: LifeCycleHook
  onPrepared: LifeCycleHook
  /**
   * Called after the dev server is ready with watchers and restart function.
   *
   * @deprecated Use `onCleanup` with the `stage` parameter for cleanup tasks,
   * and `app.restartDevServer()` to trigger a dev server restart.
   *
   * Use the plugin function form (`PluginFunction`) to scope state to the
   * current app lifecycle via closures, avoiding module-level variable leaks.
   *
   * ### Migration guide
   *
   * **Before (onWatched):**
   * ```ts
   * export default {
   *   name: 'my-plugin',
   *   onWatched(app, watchers, restart) {
   *     const watcher = chokidar.watch('my-files')
   *     watchers.push(watcher)
   *     watcher.on('change', () => restart())
   *   },
   * }
   * ```
   *
   * **After (onCleanup + PluginFunction + app.restartDevServer):**
   * ```ts
   * export default (app) => {
   *   // closure-scoped state: fresh per app instance, no leak on restart
   *   let watcher
   *   return {
   *     name: 'my-plugin',
   *     onCleanup(app, stage) {
   *       if (stage === 'ready') {
   *         watcher = chokidar.watch('my-files')
   *         watcher.on('change', () => app.restartDevServer())
   *       }
   *       if (stage === 'restart') {
   *         watcher?.close()
   *       }
   *     },
   *   }
   * }
   * ```
   */
  onWatched: LifeCycleHook<[watchers: Closable[], restart: () => Promise<void>]>
  onPageUpdated: LifeCycleHook<
    [type: 'create' | 'delete' | 'update', page: Page, oldPage: Page | null]
  >
  onCleanup: LifeCycleHook<[stage: CleanupHookStage]>
  onGenerated: LifeCycleHook
  extendsMarkdownOptions: ExtendsHook<MarkdownOptions>
  extendsMarkdown: ExtendsHook<Markdown>
  extendsPageOptions: ExtendsHook<PageOptions>
  extendsPage: ExtendsHook<Page>
  extendsBundlerOptions: ExtendsHook<BundlerOptions>
  clientConfigFile: ClientConfigFileHook
  alias: AliasHook
  define: DefineHook
}

/**
 * Name of hooks
 */
export type HooksName = keyof Hooks

/**
 * Exposed hooks API that can be accessed by a plugin
 */
export type HooksExposed = {
  [K in HooksName]: Hooks[K]['exposed']
}

/**
 * Normalized hooks
 */
export type HooksNormalized = {
  [K in HooksName]: Hooks[K]['normalized']
}

/**
 * Result of hooks
 */
export type HooksResult = {
  [K in HooksName]: Hooks[K]['result']
}

/**
 * Hook item
 */
export interface HookItem<T extends HooksName> {
  // the name of the plugin who introduce this hook
  pluginName: string
  // the normalized hook
  hook: HooksNormalized[T]
}

/**
 * Hook items queue
 */
export interface HookQueue<T extends HooksName> {
  name: T
  items: HookItem<T>[]
  add: (item: HookItem<T>) => void
  process: (
    ...args: Parameters<HooksNormalized[T]>
  ) => Promise<HooksResult[T][]>
}
