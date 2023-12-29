it('isPageExist', () => {
  cy.visit('/routes/is-page-exist.html')

  const results = [
    '/: true',
    '/README.md: true',
    '/index.html: true',
    '/not-exist: false',
    '/not-exist.html: false',
    '/not-exist.md: false',
    '/routes/non-ascii-paths/中文目录名/中文文件名.md: true',
    '/routes/non-ascii-paths/中文目录名/中文文件名.html: true',
    `${encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.md')}: true`,
    `${encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html')}: true`,
    '/zh/: true',
    '/zh: false',
  ]

  cy.get('.e2e-theme-content ul li').each((el) => {
    expect(results.includes(el.text())).to.equal(true)
  })
})
