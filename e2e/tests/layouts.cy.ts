it('CustomLayout', () => {
  cy.visit('/layouts/custom-layout.html')
  cy.get('.e2e-theme-custom-layout').should('exist')
  cy.get('.e2e-theme-custom-layout-content')
    .contains('Should use CustomLayout')
    .should('exist')
})

it('Layout', () => {
  cy.visit('/layouts/layout.html')
  cy.get('.e2e-theme').should('exist')
  cy.get('.e2e-theme-content').contains('Should use Layout').should('exist')
})

it('NotFound', () => {
  cy.visit('/404.html')
  cy.get('.e2e-theme-not-found').should('have.text', '404 Not Found')
})
