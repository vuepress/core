/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

/**
Types from https://github.com/rollup/plugins/blob/master/packages/alias/types/index.d.ts
Inlined because the plugin is bundled.
https://github.com/rollup/plugins/blob/master/LICENSE
The MIT License (MIT)
Copyright (c) 2019 RollupJS Plugin Contributors (https://github.com/rollup/plugins/graphs/contributors)
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Code from https://github.com/vitejs/vite
Inlined because vite is optional
https://github.com/vitejs/vite/blob/main/LICENSE

MIT License

Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { isArray, isString } from '@vuepress/shared'

interface Alias {
  find: string | RegExp
  replacement: string
  /**
   * Instructs the plugin to use an alternative resolving algorithm,
   * rather than the Rollup's resolver.
   * @default null
   */
  customResolver?: ResolverFunction | ResolverObject | null
}

type ResolverFunction = (...args: unknown[]) => unknown

interface ResolverObject {
  buildStart?: (...args: unknown[]) => unknown
  resolveId: ResolverFunction
}

type AliasOptions = readonly Alias[] | { [find: string]: string }

const isObject = (value: unknown): value is Record<string, any> =>
  Object.prototype.toString.call(value) === '[object Object]'

const arraify = <T>(target: T | T[]): T[] =>
  isArray(target) ? target : [target]

const normalizeSingleAlias = ({
  find,
  replacement,
  customResolver,
}: Alias): Alias => {
  if (isString(find) && find.endsWith('/') && replacement.endsWith('/')) {
    find = find.slice(0, find.length - 1)
    replacement = replacement.slice(0, replacement.length - 1)
  }

  const alias: Alias = {
    find,
    replacement,
  }

  if (customResolver) alias.customResolver = customResolver

  return alias
}

const normalizeAlias = (aliasOption: AliasOptions): Alias[] =>
  isArray(aliasOption)
    ? aliasOption.map(normalizeSingleAlias)
    : Object.keys(aliasOption).map((find) =>
        normalizeSingleAlias({
          find,
          replacement: (<Record<string, string>>aliasOption)[find],
        })
      )

export const mergeAlias = (
  defaults?: AliasOptions,
  overrides?: AliasOptions
): AliasOptions | undefined => {
  if (!defaults) return overrides
  if (!overrides) return defaults

  if (isObject(defaults) && isObject(overrides))
    return { ...defaults, ...overrides }

  // the order is flipped because the alias is resolved from top-down,
  // where the later should have higher priority
  return [...normalizeAlias(overrides), ...normalizeAlias(defaults)]
}

const mergeConfigRecursively = (
  defaults: Record<string, any>,
  overrides: Record<string, any>,
  rootPath: string
): Record<string, any> => {
  const merged: Record<string, any> = { ...defaults }

  for (const key in overrides) {
    const value = overrides[key]

    if (value == null) {
      continue
    }

    const existing = merged[key]

    if (existing == null) {
      merged[key] = value
      continue
    }

    // fields that require special handling
    if (key === 'alias' && (rootPath === 'resolve' || rootPath === '')) {
      merged[key] = mergeAlias(existing, value)
      continue
    } else if (key === 'assetsInclude' && rootPath === '') {
      merged[key] = [].concat(existing, value)
      continue
    } else if (
      key === 'noExternal' &&
      rootPath === 'ssr' &&
      (existing === true || value === true)
    ) {
      merged[key] = true
      continue
    }

    if (isArray(existing) || isArray(value)) {
      merged[key] = [...arraify(existing), ...arraify(value)]
      continue
    }
    if (isObject(existing) && isObject(value)) {
      merged[key] = mergeConfigRecursively(
        existing,
        value,
        rootPath ? `${rootPath}.${key}` : key
      )
      continue
    }

    merged[key] = value
  }

  return merged
}

export const mergeViteConfig = (
  defaults: Record<string, any>,
  overrides: Record<string, any>,
  isRoot = true
): Record<string, any> =>
  mergeConfigRecursively(defaults, overrides, isRoot ? '' : '.')
