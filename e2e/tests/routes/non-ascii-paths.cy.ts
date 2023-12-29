it('should support visiting non-ASCII paths directly', () => {
  cy.visit(encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'))

  cy.get('.e2e-theme-content p').should('have.text', '这是一个中文文件')
})

it('should support rendering non-ASCII paths links and navigate to it correctly', () => {
  const E2E_BASE = Cypress.env('E2E_BASE')

  cy.visit('/routes/non-ascii-paths/')

  cy.get('.e2e-theme-content ul li a')
    .should('have.length', 1)
    .first()
    .should('have.text', '中文路径')
    .click()

  cy.location().should((location) => {
    expect(location.pathname).to.eq(
      encodeURI(`${E2E_BASE}routes/non-ascii-paths/中文目录名/中文文件名.html`),
    )
  })

  cy.get('.e2e-theme-content p').should('have.text', '这是一个中文文件')
})
