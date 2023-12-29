it('should render links and navigate between pages correctly', () => {
  const E2E_BASE = Cypress.env('E2E_BASE')

  cy.visit('/markdown/links/foo.html')

  cy.get('.e2e-theme-content ul li a')
    .should('have.length', 2)
    .first()
    .should('have.text', 'bar')
    .click()

  cy.location().should((location) => {
    expect(location.pathname).to.eq(`${E2E_BASE}markdown/links/bar.html`)
  })

  cy.get('.e2e-theme-content ul li a')
    .should('have.length', 2)
    .last()
    .should('have.text', 'baz')
    .click()

  cy.location().should((location) => {
    expect(location.pathname).to.eq(`${E2E_BASE}markdown/links/baz.html`)
  })

  cy.get('.e2e-theme-content ul li a')
    .should('have.length', 2)
    .first()
    .should('have.text', 'foo')
    .click()

  cy.location().should((location) => {
    expect(location.pathname).to.eq(`${E2E_BASE}markdown/links/foo.html`)
  })
})
