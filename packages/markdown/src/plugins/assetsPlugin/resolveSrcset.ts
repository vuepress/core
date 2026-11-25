import type { ResolveLinkOptions } from './resolveLink.js'
import { resolveLink } from './resolveLink.js'

interface SrcsetCandidate {
  url: string
  descriptor: string
}

const isAsciiWhitespace = (char: string): boolean =>
  char === ' ' ||
  char === '\t' ||
  char === '\n' ||
  char === '\f' ||
  char === '\r'

/**
 * Parse a `srcset` attribute value into image candidates.
 *
 * This follows the "parse a srcset attribute" algorithm of the HTML spec:
 * the URL of a candidate is a sequence of non-whitespace characters, so a
 * comma inside a URL (e.g. a data URI) is kept, while the descriptor of a
 * candidate is terminated by the next comma outside parentheses.
 *
 * @see https://html.spec.whatwg.org/multipage/images.html#parse-a-srcset-attribute
 */
const parseSrcset = (srcset: string): SrcsetCandidate[] => {
  const candidates: SrcsetCandidate[] = []
  let position = 0

  while (position < srcset.length) {
    // skip whitespace and candidate separators
    while (
      position < srcset.length &&
      (srcset[position] === ',' || isAsciiWhitespace(srcset[position]))
    ) {
      position++
    }

    if (position >= srcset.length) break

    // collect the url as a sequence of non-whitespace characters
    let url = ''
    while (position < srcset.length && !isAsciiWhitespace(srcset[position])) {
      url += srcset[position]
      position++
    }

    let descriptor = ''

    if (url.endsWith(',')) {
      // candidate without descriptor, e.g. `foo.png, bar.png`
      url = url.replace(/,+$/, '')
    } else {
      // collect the descriptor until the next comma outside parentheses
      let depth = 0
      let rawDescriptor = ''

      while (position < srcset.length) {
        const char = srcset[position]

        if (char === ',' && depth === 0) {
          position++
          break
        }

        if (char === '(') depth++
        else if (char === ')') depth = Math.max(depth - 1, 0)

        rawDescriptor += char
        position++
      }

      descriptor = rawDescriptor.replace(/[ \t\n\f\r]+/g, ' ').trim()
    }

    if (url) candidates.push({ url, descriptor })
  }

  return candidates
}

/**
 * Resolve the URLs of a `srcset` attribute value, keeping descriptors as is.
 */
export const resolveSrcset = (
  srcset: string,
  options: ResolveLinkOptions,
): string =>
  parseSrcset(srcset)
    .map(
      ({ url, descriptor }) =>
        `${resolveLink(url, options)}${descriptor ? ` ${descriptor}` : ''}`,
    )
    .join(', ')
