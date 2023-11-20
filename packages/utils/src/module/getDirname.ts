import { fileURLToPath } from 'node:url'
import path from 'upath'

export const getDirname = (importMetaUrl: string): string =>
  path.dirname(fileURLToPath(importMetaUrl))
