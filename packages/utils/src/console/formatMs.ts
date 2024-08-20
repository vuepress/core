/**
 * Format millisecond
 */
export const formatMs = (ms: number): string => {
  return (ms < 1000) ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
}
