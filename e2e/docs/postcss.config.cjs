/* oxlint-disable typescript/no-unsafe-assignment, typescript/no-unsafe-member-access -- PostCSS plugin in a plain CJS file has no type information */

module.exports = {
  plugins: [
    {
      postcssPlugin: 'vuepress-e2e-postcss',
      Once(root) {
        root.append({
          selector: ':root',
          source: root.source,
          nodes: [{ prop: '--postcss-e2e', value: '1', source: root.source }],
        })
      },
    },
  ],
}
