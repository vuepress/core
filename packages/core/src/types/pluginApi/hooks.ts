import type { Markdown, MarkdownOptions } from '@vuepress/markdown'
import type { App } from '../app/index.js'
import type { Page, PageOptions } from '../page.js'

// util type
type PromiseOrNot<T> = Promise<T> | T
type Closable = { close(): void }

// base hook type
export type Hook<
  Exposed,
  Normalized = Exposed,
  Result = Normalized extends (...args: any) => infer U
    ? U extends Promise<infer V>
      ? V
      : U
    : void
> = {
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

// alias and define hook
export type AliasDefineHook = Hook<
  | Record<string, any>
  | ((app: App, isServer: boolean) => PromiseOrNot<Record<string, any>>),
  (app: App, isServer: boolean) => Promise<Record<string, any>>
>

/**
 * List of hooks
 */
export interface Hooks {
  onInitialized: LifeCycleHook
  onPrepared: LifeCycleHook
  onWatched: LifeCycleHook<[watchers: Closable[], restart: () => Promise<void>]>
  onGenerated: LifeCycleHook
  extendsMarkdownOptions: ExtendsHook<MarkdownOptions>
  extendsMarkdown: ExtendsHook<Markdown>
  extendsPageOptions: ExtendsHook<PageOptions>
  extendsPage: ExtendsHook<Page>
  extendsBundlerOptions: ExtendsHook<any>
  clientConfigFile: ClientConfigFileHook
  alias: AliasDefineHook
  define: AliasDefineHook
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
