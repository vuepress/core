if (Cypress.env('E2E_COMMAND') === 'dev') {
  after(() => {
    cy.task('hmr:title:restore')
    cy.task('hmr:frontmatter:restore')
  })

  it('should update title and frontmatter correctly after navigation', () => {
    cy.visit('/hmr/title.html')
    cy.title().should('include', 'HMR Title')
    cy.get('.e2e-theme-content #rendered-title + p').should(
      'have.text',
      'HMR Title',
    )

    // update title page
    cy.task('hmr:title')
      .then(() => {
        cy.title().should('include', 'Updated Title')
        cy.get('.e2e-theme-content #rendered-title + p').should(
          'have.text',
          'Updated Title',
        )
      })
      // navigate to frontmatter page
      .then(() => {
        cy.get('.e2e-theme-content #link-to-frontmatter + p > a').click()
        cy.get('.e2e-theme-content #rendered-foo + p').should(
          'have.text',
          'HMR foo',
        )
      })
      // update frontmatter page
      .then(() => cy.task('hmr:frontmatter'))
      .then(() => {
        cy.get('.e2e-theme-content #rendered-foo + p').should(
          'have.text',
          'Updated foo',
        )
      })
      // navigate to title page
      .then(() => {
        cy.get('.e2e-theme-content #link-to-title + p > a').click()
        cy.get('.e2e-theme-content #rendered-title + p').should(
          'have.text',
          'Updated Title',
        )
      })
      // restore title page
      .then(() => cy.task('hmr:title:restore'))
      .then(() => {
        cy.title().should('include', 'HMR Title')
        cy.get('.e2e-theme-content #rendered-title + p').should(
          'have.text',
          'HMR Title',
        )
      })
      // navigate to frontmatter page
      .then(() => {
        cy.get('.e2e-theme-content #link-to-frontmatter + p > a').click()
        cy.get('.e2e-theme-content #rendered-foo + p').should(
          'have.text',
          'Updated foo',
        )
      })
      // restore frontmatter page
      .then(() => cy.task('hmr:frontmatter:restore'))
      .then(() => {
        cy.get('.e2e-theme-content #rendered-foo + p').should(
          'have.text',
          'HMR foo',
        )
      })
      // navigate to title page
      .then(() => {
        cy.get('.e2e-theme-content #link-to-title + p > a').click()
        cy.get('.e2e-theme-content #rendered-title + p').should(
          'have.text',
          'HMR Title',
        )
      })
      // navigate to frontmatter page
      .then(() => {
        cy.get('.e2e-theme-content #link-to-frontmatter + p > a').click()
        cy.get('.e2e-theme-content #rendered-foo + p').should(
          'have.text',
          'HMR foo',
        )
      })
  })
}
