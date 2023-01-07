import stripTags from 'striptags'

const removals: string | RegExp[] = [
  // code blocks
  /(?:^|\n).*?(`{3,}).*?\n[\s\S]*?\1(?:\n|$)/gm,
  // directives
  /^@/gm,
  // hr
  /^[-*]{3,}$/gm,
  // footnotes
  /\[\^.+?\](: .*?$)?/gm,
  // toc
  /^[[toc]]$/gm,
]

const replacers: [string | RegExp, string][] = [
  /* blocks */
  // convert headings to text
  [/^#{1,6} (.*)$/gm, '$1'],
  [/.\n[=-]+\s*(\n|$)/g, ''],
  // convert unordered lists to text with semicolon
  [/^\s*[-+*] (.*)$/gm, '$1; '],
  // convert image to alt text
  [/^ *?!\[(.*?)\]\((.*?)\)$/gm, '$1'],
  // convert blockquotes with quotes
  [/^(?:\s*>)+(.*)$/gm, '$1'],

  /* inline */
  // strikethrough text
  [/(^|[^\\])~~(.|[^\s].*?[^\s])~~/gm, '$1'],
  // convert bold or italic to text
  [/(^|[^\\])([*|_]{1,2})(.*?)([^\\])\2/gm, '$1$3$4'],
  // convert inline code
  [/(^|[^\\`])`([^`]*?)`([^`]|$)/gm, '$1$2$3'],
  [/``\s(.*?)\s``/g, '$1'],

  // convert link to text
  [/(^|[^\\])\[(.*?)\]\((.*?)\)/gm, '$1$2 ($3)'],
]

export const md2text = (content: string): string => {
  if (!content) return ''

  let text = stripTags(content)
  let removedContainerText = ''

  // nested handle containers
  while (
    (removedContainerText = text.replace(
      /(?:^|\n).*?(:{3,})\s*(?:.+?)(?:\s+(.*))?\n([\s\S]*?)\1\n/gm,
      '$2\n$3'
    )) !== text
  ) {
    text = removedContainerText
  }

  // remove contents
  text = removals.reduce(
    (content, matcher) => content.replace(matcher, ''),
    text
  )

  // replace contents
  text = replacers.reduce(
    (content, [matcher, replacer]) => content.replace(matcher, replacer),
    removals.reduce((content, matcher) => content.replace(matcher, ''), text)
  )

  // handle line breaks
  text = text
    .split('\n')
    // trim lines
    .map((line) => line.trim())
    //  remove empty lines
    .filter((line) => Boolean(line))
    .join('\n')
    .trim()

  return text
}
