import { path } from '@vuepress/utils'
import type { RuleBlock } from 'markdown-it/lib/parser_block.mjs'
import type { ImportCodePluginOptions } from './importCodePlugin.js'
import type { ImportCodeTokenMeta } from './types.js'

// min length of the import code syntax, i.e. '@[code]()'
const MIN_LENGTH = 9

// char codes of '@[code'
const START_CODES = [64, 91, 99, 111, 100, 101]

// regexp to match the import syntax
const SYNTAX_RE =
  /^@\[code(?:{(?:(?:(?<lineStart>\d+)?-(?<lineEnd>\d+)?)|(?<lineSingle>\d+))})?(?: (?<info>[^\]]+))?\]\((?<importPath>[^)]*)\)/

/**
 * Utility function to parse line number from line string that matched by SYNTAX_RE
 */
const parseLineNumber = (line: string | undefined): number | undefined =>
  line ? Number.parseInt(line, 10) : undefined

export const createImportCodeBlockRule =
  ({ handleImportPath = (str) => str }: ImportCodePluginOptions): RuleBlock =>
  (state, startLine, endLine, silent): boolean => {
    // if it's indented more than 3 spaces, it should be a code block
    /* istanbul ignore if */
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]

    // return false if the length is shorter than min length
    if (pos + MIN_LENGTH > max) return false

    // check if it's matched the start
    for (let i = 0; i < START_CODES.length; i += 1) {
      if (state.src.charCodeAt(pos + i) !== START_CODES[i]) {
        return false
      }
    }

    // check if it's matched the syntax
    const match = state.src.slice(pos, max).match(SYNTAX_RE)
    if (!match?.groups) return false

    // return true as we have matched the syntax
    if (silent) return true

    const { info, importPath } = match.groups as {
      lineSingle?: string
      lineStart?: string
      lineEnd?: string
      info?: string
      importPath: string
    }

    const lineSingle = parseLineNumber(match.groups.lineSingle)
    const lineStart = lineSingle ?? parseLineNumber(match.groups.lineStart) ?? 0
    const lineEnd = lineSingle ?? parseLineNumber(match.groups.lineEnd)

    const meta: ImportCodeTokenMeta = {
      importPath: handleImportPath(importPath),
      lineStart,
      lineEnd,
    }

    // create a import_code token
    const token = state.push('import_code', 'code', 0)

    // use user specified info, or fallback to file ext
    token.info = info ?? path.extname(meta.importPath).slice(1)
    token.markup = '```'
    token.map = [startLine, startLine + 1]
    // store token meta to be used in renderer rule
    token.meta = meta

    state.line = startLine + 1

    return true
  }
