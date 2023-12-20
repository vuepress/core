describe('markdown > images', () => {
  it('should render images correctly', () => {
    cy.visit('/markdown/images/images.html')

    cy.get('.e2e-theme-content img')
      .should('have.length', 2)
      .each<HTMLImageElement>(([el]) => {
        cy.request({ url: el.src, failOnStatusCode: false }).then((res) => {
          expect(res.status).to.equal(200)
          expect(el.naturalWidth).to.be.greaterThan(0)
        })
      })

    cy.get('.e2e-theme-content img')
      .first()
      .should('have.attr', 'alt', 'logo-public')

    cy.get('.e2e-theme-content img')
      .last()
      .should('have.attr', 'alt', 'logo-relative')
  })
})
