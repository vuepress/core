export interface ImportCodeTokenMeta extends Record<string, unknown> {
  importPath: string
  lineStart: number
  lineEnd?: number
}
