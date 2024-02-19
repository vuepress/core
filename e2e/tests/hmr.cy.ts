if (Cypress.env('E2E_COMMAND') === 'dev') {
  const retries = 5

  beforeEach(() => cy.task('hmr:restore'))
  after(() => cy.task('hmr:restore'))

  it('should update frontmatter correctly', { retries }, () => {
    cy.visit('/hmr/frontmatter.html')
    cy.get('.e2e-theme-content #rendered-foo + p').should(
      'have.text',
      'HMR foo',
    )

    cy.task('hmr:frontmatter').then(() => {
      cy.get('.e2e-theme-content #rendered-foo + p').should(
        'have.text',
        'Updated foo',
      )
    })
  })

  it('should update title correctly', { retries }, () => {
    cy.visit('/hmr/title.html')
    cy.title().should('include', 'HMR Title')
    cy.get('.e2e-theme-content #rendered-title + p').should(
      'have.text',
      'HMR Title',
    )

    cy.task('hmr:title').then(() => {
      cy.title().should('include', 'Updated Title')
      cy.get('.e2e-theme-content #rendered-title + p').should(
        'have.text',
        'Updated Title',
      )
    })
  })

  it(
    'should update title and frontmatter correctly after navigation',
    { retries },
    () => {
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
        // navigate to frontmatter page
        .then(() => {
          cy.get('.e2e-theme-content #link-to-frontmatter + p > a').click()
          cy.get('.e2e-theme-content #rendered-foo + p').should(
            'have.text',
            'Updated foo',
          )
        })
    },
  )
}
