it('should preserve query', () => {
  const E2E_BASE = Cypress.env('E2E_BASE')

  cy.visit('/router/navigation.html')

  cy.get('#home').click()

  cy.location('pathname').should('eq', E2E_BASE)
  cy.location('search').should('eq', '?home=true')
})

it('should preserve hash', () => {
  const E2E_BASE = Cypress.env('E2E_BASE')

  cy.visit('/router/navigation.html')

  cy.get('#404').click()

  cy.location('pathname').should('eq', `${E2E_BASE}404.html`)
  cy.location('hash').should('eq', '#404')
})
