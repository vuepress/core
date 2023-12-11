context('router', () => {
  it('getPagesPath', () => {
    cy.visit('/router.html')

    const paths = [
      '/',
      '/layouts/custom-layout.html',
      '/layouts/layout.html',
      '/markdown/code-blocks.html',
      '/markdown/emoji.html',
      '/markdown/import-code-blocks.html',
      '/markdown/toc.html',
      '/markdown/vue-components.html',
      '/markdown/links/bar.html',
      '/markdown/links/baz.html',
      '/markdown/links/foo.html',
      '/page-data/frontmatter.html',
      '/page-data/headers.html',
      '/page-data/lang.html',
      '/page-data/meta.html',
      '/page-data/permalink.html',
      '/page-data/title-from-frontmatter.html',
      '/page-data/title-from-h1.html',
      '/router.html',
      '/zh/',
      '/404.html',
    ]

    cy.get('.e2e-theme-content ul.get-pages-path li').each((el) => {
      expect(paths.includes(el.text())).to.equal(true)
    })
  })

  it('isPageExist', () => {
    cy.visit('/router.html')
    const results = [
      '/: true',
      '/README.md: true',
      '/index.html: true',
      '/not-exist: false',
      '/not-exist.html: false',
      '/not-exist.md: false',
      '/zh/: true',
      '/zh: false',
    ]

    cy.get('.e2e-theme-content .is-page-exist ul li').each((el) => {
      expect(results.includes(el.text())).to.equal(true)
    })
  })

  it('resolve', () => {
    cy.visit('/router.html')
    const result = { path: '/page-data/meta.html', meta: { a: 0, b: 2, c: 3 } }

    cy.get('.e2e-theme-content .resolve ul li').each((el) => {
      expect(el.text()).to.contain(JSON.stringify(result))
    })
  })
})
