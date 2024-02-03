it('should render root components correctly', () => {
  cy.visit('/')

  cy.get('.root-component-from-theme').should('exist')
  cy.get('.root-component-from-theme p').should(
    'have.text',
    'root component from theme',
  )

  cy.get('.root-component-from-user-config').should('exist')
  cy.get('.root-component-from-user-config p').should(
    'have.text',
    'root component from user config',
  )
})
