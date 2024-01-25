it('should support visiting non-ASCII paths directly', () => {
  const E2E_COMMAND = Cypress.env('E2E_COMMAND')

  cy.visit('/imports/conditional-exports.html')

  cy.get('.e2e-theme-content p').should('have.text', 'browser-mjs')

  if (E2E_COMMAND === 'build') {
    cy.requestWithBase('/imports/conditional-exports.html')
      .its('body')
      .should('include', '<p>node-mjs</p>')
  }
})
