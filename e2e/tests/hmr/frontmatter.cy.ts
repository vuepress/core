if (Cypress.env('E2E_COMMAND') === 'dev') {
  it('should update frontmatter correctly', () => {
    cy.visit('/hmr/frontmatter.html')
    cy.get('.e2e-theme-content #rendered-foo + p').should(
      'have.text',
      'HMR foo',
    )

    cy.task('hmr:frontmatter')
      .then(() => {
        cy.get('.e2e-theme-content #rendered-foo + p').should(
          'have.text',
          'Updated foo',
        )
      })
      .then(() => cy.task('hmr:frontmatter:restore'))
      .then(() => {
        cy.get('.e2e-theme-content #rendered-foo + p').should(
          'have.text',
          'HMR foo',
        )
      })
  })
}
