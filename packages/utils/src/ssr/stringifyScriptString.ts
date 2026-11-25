/**
 * Serialize a string as a JavaScript literal for an inline `<script>` block.
 */
export const stringifyScriptString = (value: string): string =>
  JSON.stringify(value).replaceAll('<', '\\u003c')
