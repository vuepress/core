it(
  'should render anchors and navigate correctly',
  // this test is randomly failing on CI, so we need to retry it
  { retries: 3 },
  () => {
    cy.visit('/markdown/anchors.html')

    cy.get('.e2e-theme-content h1')
      .should('have.attr', 'id', 'title')
      .should('have.attr', 'tabindex', '-1')

    cy.get('.e2e-theme-content h1 > a')
      .should('have.attr', 'class', 'header-anchor')
      .should('have.attr', 'href', '#title')
      .click()

    cy.hash().should('eq', '#title')

    cy.get('#anchor-1-1 > a')
      .should('have.attr', 'class', 'header-anchor')
      .click()

    cy.hash().should('eq', '#anchor-1-1')
  },
)
