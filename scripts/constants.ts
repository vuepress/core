import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
export const PACKAGES = fs.readdirSync(path.resolve(ROOT, 'packages'))
