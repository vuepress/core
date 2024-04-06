it('should preserve query', () => {
  const E2E_BASE = Cypress.env('E2E_BASE')

  cy.visit('/router/navigation.html')

  cy.get('#home').click()

  cy.location().eq(`${E2E_BASE}?home=true`)
})

it('should preserve hash', () => {
  const E2E_BASE = Cypress.env('E2E_BASE')

  cy.visit('/router/navigation.html')

  cy.get('#404').click()

  cy.location().eq(`${E2E_BASE}404.html#404`)
})
