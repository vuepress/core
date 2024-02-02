const parseResolvedPageFromElement = (el: Cypress.JQueryWithSelector) =>
  JSON.parse(/: (\{.*\})\s*$/.exec(el.text())![1])

it('should resolve paths correctly', () => {
  cy.visit('/router/resolve-page.html')

  const testCases = [
    {
      selector: '#index',
      expectedPath: '/',
    },
    {
      selector: '#non-index',
      expectedPath: '/helpers/resolve-page.html',
    },
    {
      selector: '#non-ascii',
      expectedPath: '/routes/non-ascii-paths/中文目录名/中文文件名.html',
    },
    {
      selector: '#non-ascii-encoded',
      expectedPath: '/routes/non-ascii-paths/中文目录名/中文文件名.html',
    },
  ]

  testCases.forEach(({ selector, expectedPath }) => {
    cy.get(`.e2e-theme-content ${selector}`).each((el) => {
      const resolvedPage = parseResolvedPageFromElement(el)
      expect(resolvedPage.path).to.equal(expectedPath)
    })
  })

  cy.get(`.e2e-theme-content #non-existent`).each((el) => {
    const resolvedPage = parseResolvedPageFromElement(el)
    expect(resolvedPage).to.equal(null)
  })
})

it('should resolve meta correctly', () => {
  cy.visit('/router/resolve-page.html')

  cy.get('.e2e-theme-content #meta ul li').each((el) => {
    const resolvedPage = parseResolvedPageFromElement(el)
    expect(resolvedPage.path).to.equal('/page-data/meta.html')
    expect(resolvedPage.meta).to.include({ a: 0, b: 2, c: 3 })
  })
})
