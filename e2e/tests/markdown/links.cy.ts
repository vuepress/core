describe('markdown > links', () => {
  it('should render links and navigate between pages correctly', () => {
    cy.visit('/markdown/links/foo.html')

    cy.get('.e2e-theme-content ul li a')
      .should('have.length', 2)
      .first()
      .should('have.text', 'bar')
      .click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/markdown/links/bar.html')
    })

    cy.get('.e2e-theme-content ul li a')
      .should('have.length', 2)
      .last()
      .should('have.text', 'baz')
      .click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/markdown/links/baz.html')
    })

    cy.get('.e2e-theme-content ul li a')
      .should('have.length', 2)
      .first()
      .should('have.text', 'foo')
      .click()

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/markdown/links/foo.html')
    })
  })
})
