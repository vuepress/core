it('getPagesPath', () => {
  cy.visit('/routes/get-pages-path.html')

  const paths = [
    '/',
    // '/layouts/custom-layout.html',
    // '/layouts/layout.html',
    // '/markdown/anchors.html',
    // '/markdown/code-blocks.html',
    // '/markdown/emoji.html',
    // '/markdown/import-code-blocks.html',
    // '/markdown/links/bar.html',
    // '/markdown/links/baz.html',
    // '/markdown/links/foo.html',
    // '/markdown/toc.html',
    // '/markdown/vue-components.html',
    // '/page-data/frontmatter.html',
    // '/page-data/headers.html',
    // '/page-data/lang.html',
    // '/page-data/meta.html',
    // '/page-data/permalink.html',
    // '/page-data/title-from-frontmatter.html',
    // '/page-data/title-from-h1.html',
    // '/routes/non-ascii-paths/',
    // '/routes/non-ascii-paths/%E4%B8%AD%E6%96%87%E7%9B%AE%E5%BD%95%E5%90%8D/%E4%B8%AD%E6%96%87%E6%96%87%E4%BB%B6%E5%90%8D.html',
    // '/routes/get-pages-path.html',
    // '/routes/resolve.html',
    // '/routes/is-page-exist.html',
    // '/zh/',
    // '/404.html',
  ]

  const pagePaths: string[] = []

  // eslint-disable-next-line cypress/unsafe-to-chain-command
  cy.get('.e2e-theme-content ul li')
    .each((el) => {
      pagePaths.push(el.text())
    })
    .then(() => {
      paths.forEach((path) => {
        expect(pagePaths.includes(path)).to.equal(true)
      })
    })
})
