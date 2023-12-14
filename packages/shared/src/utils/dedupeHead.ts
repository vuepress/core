import type { HeadConfig } from '../types/index.js'
import { resolveHeadIdentifier } from './resolveHeadIdentifier.js'

/**
 * Dedupe head config with identifier
 *
 * Items that appear earlier have higher priority
 */
export const dedupeHead = (head: HeadConfig[]): HeadConfig[] => {
  const identifierSet = new Set<string>()
  const result: HeadConfig[] = []

  head.forEach((item) => {
    const identifier = resolveHeadIdentifier(item)
    if (identifier && !identifierSet.has(identifier)) {
      identifierSet.add(identifier)
      result.push(item)
    }
  })

  return result
}
