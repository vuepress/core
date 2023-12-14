describe('updateHead', () => {
  it('should update head correctly', () => {
    // en-US
    cy.visit('/')

    // lang
    cy.get('html').should('have.attr', 'lang', 'en-US')
    // title
    cy.title().should('eq', 'VuePress E2E')
    cy.get('head title').should('have.text', 'VuePress E2E')
    // description
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'VuePress E2E Test Site',
    )
    // head
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

    // lang
    cy.get('html').should('have.attr', 'lang', 'zh-CN')
    // title
    cy.title().should('eq', 'VuePress E2E')
    cy.get('head title').should('have.text', 'VuePress E2E')
    // description
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'VuePress E2E 测试站点',
    )
    // head
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
