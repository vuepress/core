const parseResolvedPageFromElement = (el: Cypress.JQueryWithSelector) =>
  JSON.parse(/: (\{.*\})\s*$/.exec(el.text())![1])

it('should resolve paths correctly', () => {
  cy.visit('/router/resolve-page.html')

  const testCases = [
    {
      selector: '#index',
      expected: {
        path: '/',
        meta: {},
      },
    },
    {
      selector: '#non-index',
      expected: {
        path: '/router/resolve-page.html',
        meta: {},
      },
    },
    {
      selector: '#non-ascii',
      expected: {
        path: encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'),
        meta: {},
      },
    },
    {
      selector: '#non-ascii-encoded',
      expected: {
        path: encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'),
        meta: {},
      },
    },
    {
      selector: '#non-existent',
      expected: {
        path: '/non-existent.html',
        meta: { notFound: true },
      },
    },
    {
      selector: '#meta',
      expected: {
        path: '/page-data/meta.html',
        meta: { a: 0, b: 2, c: 3 },
      },
    },
  ]

  testCases.forEach(({ selector, expected }) => {
    cy.get(`.e2e-theme-content ${selector} + ul > li`).each((el) => {
      const resolvedPage = parseResolvedPageFromElement(el)
      expect(resolvedPage.path).to.equal(expected.path)
      expect(resolvedPage.meta).to.deep.equal(expected.meta)
    })
  })
})
