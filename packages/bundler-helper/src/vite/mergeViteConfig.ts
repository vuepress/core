/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Forked from https://github.com/vitejs/vite/blob/main/packages/vite/src/node/utils.ts
 *
 * Inlined because vite is optional
 *
 * MIT License
 *
 * Copyright (c) 2019-present, VoidZero Inc. and Vite contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { isPlainObject, isString } from '@vuepress/shared'
import type { Plugin } from 'vite'

interface Alias {
  find: RegExp | string
  replacement: string
  /**
   * Instructs the plugin to use an alternative resolving algorithm, rather than
   * the Rollup's resolver.
   *
   * @default null
   */
  customResolver?: ResolverFunction | ResolverObject | null
}

type ResolverFunction = (...args: unknown[]) => unknown

interface ResolverObject {
  buildStart?: (...args: unknown[]) => unknown
  resolveId: ResolverFunction
}

type AliasOptions = Record<string, string> | readonly Alias[]

const environmentPathRE = /^environments\.[^.]+$/

const rollupOptionsRootPaths = new Set([
  'build',
  'worker',
  'optimizeDeps',
  'ssr.optimizeDeps',
])
const runtimeDeprecatedPath = new Set(['optimizeDeps', 'ssr.optimizeDeps'])

const rollupOptionsDeprecationCall = (() => {
  return () => {
    const method = process.env.VITE_DEPRECATION_TRACE ? 'trace' : 'warn'
    // eslint-disable-next-line no-console
    console[method](
      `\`optimizeDeps.rollupOptions\` / \`ssr.optimizeDeps.rollupOptions\` is deprecated. ` +
        `Use \`optimizeDeps.rolldownOptions\` instead. Note that this option may be set by a plugin. ${
          method === 'trace'
            ? 'Showing trace because VITE_DEPRECATION_TRACE is set.'
            : 'Set VITE_DEPRECATION_TRACE=1 to see where it is called.'
        }`,
    )
  }
})()

const setupRollupOptionCompat = (
  buildConfig: Record<string, any>,
  path: string,
): void => {
  // if both rollupOptions and rolldownOptions are present,
  // ignore rollupOptions and use rolldownOptions
  buildConfig.rolldownOptions ??= buildConfig.rollupOptions
  if (
    runtimeDeprecatedPath.has(path) &&
    buildConfig.rollupOptions &&
    buildConfig.rolldownOptions !== buildConfig.rollupOptions
  ) {
    rollupOptionsDeprecationCall()
  }

  // proxy rolldownOptions to rollupOptions
  Object.defineProperty(buildConfig, 'rollupOptions', {
    get() {
      return buildConfig.rolldownOptions
    },
    set(newValue) {
      if (runtimeDeprecatedPath.has(path)) {
        rollupOptionsDeprecationCall()
      }
      buildConfig.rolldownOptions = newValue
    },
    configurable: true,
    enumerable: true,
  })
}

/**
 * Sets up `rollupOptions` compat proxies for an environment.
 */
function setupRollupOptionCompatForEnvironment(environment: any): any {
  if (!isPlainObject(environment)) {
    return environment
  }
  const merged: Record<string, any> = { ...environment }
  if (isPlainObject(merged.build)) {
    setupRollupOptionCompat(merged.build, 'build')
  }
  return merged
}

const arraify = <T>(target: T | T[]): T[] =>
  Array.isArray(target) ? target : [target]

const normalizeSingleAlias = ({
  find,
  replacement,
  customResolver,
}: Alias): Alias => {
  const alias: Alias = { find, replacement }

  if (isString(find) && find.endsWith('/') && replacement.endsWith('/')) {
    alias.find = find.slice(0, find.length - 1)
    alias.replacement = replacement.slice(0, replacement.length - 1)
  }

  if (customResolver) alias.customResolver = customResolver

  return alias
}

export function normalizeAlias(aliasOption: AliasOptions = []): Alias[] {
  return Array.isArray(aliasOption)
    ? aliasOption.map(normalizeSingleAlias)
    : Object.keys(aliasOption).map((find) =>
        normalizeSingleAlias({
          find,
          replacement: (aliasOption as Record<string, string>)[find],
        }),
      )
}

const mergeAlias = (
  defaults?: AliasOptions,
  overrides?: AliasOptions,
): AliasOptions | undefined => {
  if (!defaults) return overrides
  if (!overrides) return defaults

  if (isPlainObject(defaults) && isPlainObject(overrides))
    return {
      ...(defaults as Record<string, string>),
      ...(overrides as Record<string, string>),
    }

  // the order is flipped because the alias is resolved from top-down,
  // where the later should have higher priority
  return [...normalizeAlias(overrides), ...normalizeAlias(defaults)]
}

const backwardCompatibleWorkerPlugins = (
  plugins: Plugin[] | (() => Plugin[]),
): Plugin[] => {
  if (Array.isArray(plugins)) return plugins
  if (typeof plugins === 'function') return plugins()

  return []
}

// oxlint-disable-next-line complexity
const mergeConfigRecursively = (
  { ...merged }: Record<string, any>,
  overrides: Record<string, any>,
  rootPath: string,
): Record<string, any> => {
  if (rollupOptionsRootPaths.has(rootPath))
    setupRollupOptionCompat(merged, rootPath)

  for (const [key, value] of Object.entries(overrides)) {
    if (value == null) continue

    let existing = merged[key]

    if (key === 'rollupOptions' && rollupOptionsRootPaths.has(rootPath)) {
      // if both rollupOptions and rolldownOptions are present,
      // ignore rollupOptions and use rolldownOptions
      if (overrides.rolldownOptions) continue
      existing = merged.rolldownOptions
    }

    if (existing == null) {
      if (rootPath === '' && key === 'environments' && isPlainObject(value)) {
        // Clone to avoid mutating the original override object
        const environments = { ...value }
        for (const envName in environments) {
          environments[envName] = setupRollupOptionCompatForEnvironment(
            environments[envName],
          )
        }
        merged[key] = environments
      } else if (rootPath === 'environments') {
        // `environments` exists, but a new environment is added
        merged[key] = setupRollupOptionCompatForEnvironment(value)
      } else {
        merged[key] = value
      }
      continue
    }

    // fields that require special handling
    if (key === 'alias' && (rootPath === 'resolve' || rootPath === '')) {
      merged[key] = mergeAlias(existing, value)
      continue
    } else if (key === 'assetsInclude' && rootPath === '') {
      // oxlint-disable-next-line unicorn/prefer-spread
      merged[key] = [].concat(existing, value)
      continue
    } else if (
      (((key === 'noExternal' || key === 'external') &&
        (rootPath === 'ssr' || rootPath === 'resolve')) ||
        (key === 'allowedHosts' && rootPath === 'server')) &&
      (existing === true || value === true)
    ) {
      merged[key] = true
      continue
    } else if (key === 'plugins' && rootPath === 'worker') {
      // oxlint-disable-next-line typescript/no-unsafe-return
      merged[key] = (): any[] => [
        ...backwardCompatibleWorkerPlugins(existing),
        ...backwardCompatibleWorkerPlugins(value),
      ]
      continue
    } else if (key === 'server' && rootPath === 'server.hmr') {
      merged[key] = value
      continue
    }

    if (Array.isArray(existing) || Array.isArray(value)) {
      merged[key] = [...arraify(existing), ...arraify(value)]
      continue
    }

    if (isPlainObject(existing) && isPlainObject(value)) {
      merged[key] = mergeConfigRecursively(
        existing,
        value,
        // treat environment.* as root
        rootPath && !environmentPathRE.test(rootPath)
          ? `${rootPath}.${key}`
          : key,
      )
      continue
    }

    merged[key] = value
  }

  return merged
}

/**
 * Merge Vite configurations
 *
 * @param defaults - Default configuration
 * @param overrides - Override configuration
 * @param isRoot - Whether it's root level merge
 * @returns Merged configuration
 */
export const mergeViteConfig = (
  defaults: Record<string, any>,
  overrides: Record<string, any>,
  isRoot = true,
): Record<string, any> => {
  if (typeof defaults === 'function' || typeof overrides === 'function') {
    throw new Error(`Cannot merge config in form of callback`)
  }

  return mergeConfigRecursively(defaults, overrides, isRoot ? '' : '.')
}
