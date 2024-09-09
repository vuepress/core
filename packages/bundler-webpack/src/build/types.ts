/**
 * Client file meta
 */
export interface FileMeta {
  /**
   * file name
   */
  file: string

  /**
   * file extension
   */
  extension: string

  /**
   * file type
   */
  type: FileMetaType
}

/**
 * Client file meta type, mainly used for <preload as="type">
 */
export type FileMetaType = '' | 'font' | 'image' | 'script' | 'style'

/**
 * A "module request" to "client files meta" key-value map
 */
export type ModuleFilesMetaMap = Record<string, FileMeta[]>

/**
 * Client manifest that collected from webpack stats
 */
export interface ClientManifest {
  all: string[]
  initial: string[]
  async: string[]
  modules: Record<string, number[]>
}
