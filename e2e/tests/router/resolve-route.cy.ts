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
      path: '/router/resolve-route.html',
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
    selector: '#route-meta',
    expected: {
      path: '/page-data/route-meta.html',
      meta: { a: 0, b: 2, c: 3 },
    },
  },
]

const parseResolvedRouteFromElement = (el: Cypress.JQueryWithSelector) =>
  JSON.parse(/: (\{.*\})\s*$/.exec(el.text())![1])

it('should resolve routes correctly', () => {
  cy.visit('/router/resolve-route.html')

  testCases.forEach(({ selector, expected }) => {
    cy.get(`.e2e-theme-content ${selector} + ul > li`).each((el) => {
      const resolvedRoute = parseResolvedRouteFromElement(el)
      expect(resolvedRoute.path).to.equal(expected.path)
      expect(resolvedRoute.meta).to.deep.equal(expected.meta)
    })
  })
})
