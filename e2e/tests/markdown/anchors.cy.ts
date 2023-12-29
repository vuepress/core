it('should render anchors and navigate correctly', () => {
  cy.visit('/markdown/anchors.html')

  cy.get('.e2e-theme-content h1')
    .should('have.attr', 'id', 'title')
    .should('have.attr', 'tabindex', '-1')

  cy.get('.e2e-theme-content h1 > a')
    .should('have.attr', 'class', 'header-anchor')
    .should('have.attr', 'href', '#title')
    .click()

  cy.location().should((location) => {
    expect(location.hash).to.eq('#title')
  })

  cy.get('#anchor-1-1 > a')
    .should('have.attr', 'class', 'header-anchor')
    .click()

  cy.location().should((location) => {
    expect(location.hash).to.eq('#anchor-1-1')
  })
})
