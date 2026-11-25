/** Whether an anchor targets its current browsing context. */
export const isSelfTarget = (target: unknown): boolean =>
  target == null ||
  (typeof target === 'string' &&
    (target === '' || target.toLowerCase() === '_self'))
