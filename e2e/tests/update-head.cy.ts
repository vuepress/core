describe('updateHead', () => {
  it('should update head correctly', () => {
    // en-US
    cy.visit('/')

    cy.get('head meta[name="foo"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'foo')
    cy.get('head meta[name="bar"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'foobar')
    cy.get('head meta[name="baz"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'foobar baz')
    cy.get('head meta[name="foo-en"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'foo-en')

    // navigate to zh-CN
    cy.get('.e2e-theme-nav a').contains('zh-CN').click()

    cy.get('head meta[name="foo"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'foo')
    cy.get('head meta[name="bar"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'foobar zh')
    cy.get('head meta[name="baz"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'baz')
    cy.get('head meta[name="foo-zh"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'foo-zh')
  })
})
