it('AutoLink', () => {
  cy.visit('/components/auto-link.html')

  cy.get(`.e2e-theme-content #route-link a`).each((el) => {
    cy.wrap(el)
      .should('have.attr', 'class')
      .and('match', /route-link/)
  })

  cy.get(`.e2e-theme-content #anchor-link a`).each((el) => {
    cy.wrap(el)
      .should('have.attr', 'class')
      .and('match', /anchor-link/)
  })

  cy.get(`.e2e-theme-content #aria-label a`).each((el) => {
    cy.wrap(el).should('have.attr', 'aria-label').and('eq', 'label')
  })
})
