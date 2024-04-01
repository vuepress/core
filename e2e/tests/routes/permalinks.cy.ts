const PERMALINK_PREFIX = Cypress.env('E2E_BASE').replace(/\/$/, '')

const CONFIGS = [
  {
    id: 'ascii-ascii',
    filename: 'ascii-ascii.md',
    permalink: '/permalink-ascii-ascii/',
  },
  {
    id: 'ascii-non-ascii',
    filename: 'ascii-non-ascii.md',
    permalink: '/永久链接-ascii-中文/',
  },
  {
    id: '中文-ascii',
    filename: '中文-ascii.md',
    permalink: '/permalink-non-ascii-ascii/',
  },
  {
    id: '中文-中文',
    filename: '中文-中文.md',
    permalink: '/永久链接-中文-中文/',
  },
]

it('should support visiting permalinks directly', () => {
  for (const { permalink } of CONFIGS) {
    cy.visit(encodeURI(permalink))
    cy.get('.e2e-theme-content p').should('have.text', permalink)
  }
})

it('should support rendering link by permalink and navigate to it correctly', () => {
  for (const { id, permalink } of CONFIGS) {
    cy.visit('/routes/permalinks/')

    // absolute link that does not end with '.md' will not be prepended with `base`
    cy.get(`.e2e-theme-content #${id} + ul > li a`)
      .should('have.length', 3)
      .eq(1)
      .should('have.attr', 'href', encodeURI(permalink))

    // `withBase` won't encode the url
    cy.get(`.e2e-theme-content #${id} + ul > li a`)
      .should('have.length', 3)
      .eq(0)
      .should('have.attr', 'href', `${PERMALINK_PREFIX}${permalink}`)
      .click()

    cy.location('pathname').should(
      'eq',
      encodeURI(`${PERMALINK_PREFIX}${permalink}`),
    )

    cy.get('.e2e-theme-content p').should('have.text', permalink)
  }
})

it('should support rendering link by filename and navigate to it correctly', () => {
  for (const { id, permalink } of CONFIGS) {
    cy.visit('/routes/permalinks/')

    cy.get(`.e2e-theme-content #${id} + ul > li a`)
      .should('have.length', 3)
      .eq(2)
      .should('have.attr', 'href', encodeURI(`${PERMALINK_PREFIX}${permalink}`))
      .click()

    cy.location('pathname').should(
      'eq',
      encodeURI(`${PERMALINK_PREFIX}${permalink}`),
    )

    cy.get('.e2e-theme-content p').should('have.text', permalink)
  }
})
