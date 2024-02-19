if (Cypress.env('E2E_COMMAND') === 'dev') {
  after(() => {
    cy.task('hmr:title:restore')
  })

  it('should update title correctly', () => {
    cy.visit('/hmr/title.html')
    cy.title().should('include', 'HMR Title')
    cy.get('.e2e-theme-content #rendered-title + p').should(
      'have.text',
      'HMR Title',
    )

    cy.task('hmr:title')
      .then(() => {
        cy.title().should('include', 'Updated Title')
        cy.get('.e2e-theme-content #rendered-title + p').should(
          'have.text',
          'Updated Title',
        )
      })
      .then(() => cy.task('hmr:title:restore'))
      .then(() => {
        cy.title().should('include', 'HMR Title')
        cy.get('.e2e-theme-content #rendered-title + p').should(
          'have.text',
          'HMR Title',
        )
      })
  })
}
