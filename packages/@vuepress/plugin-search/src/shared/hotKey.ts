export interface HotKeyOptions {
  /**
   * Value of `event.key` to trigger the hot key
   */
  key: string

  /**
   * Whether to press `event.altKey` at the same time
   *
   * @default false
   */
  alt?: boolean

  /**
   * Whether to press `event.ctrlKey` at the same time
   *
   * @default false
   */
  ctrl?: boolean

  /**
   * Whether to press `event.shiftKey` at the same time
   *
   * @default false
   */
  shift?: boolean
}
