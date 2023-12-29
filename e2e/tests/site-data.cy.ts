describe('en-US', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('lang', () => {
    cy.get('html').should('have.attr', 'lang', 'en-US')
  })

  it('title', () => {
    cy.title().should('eq', 'VuePress E2E')
    cy.get('head title')
      .should('have.length', 1)
      .should('have.text', 'VuePress E2E')
  })

  it('description', () => {
    cy.get('head meta[name="description"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'VuePress E2E Test Site')
  })

  it('head', () => {
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
  })
})

describe('zh-CN', () => {
  beforeEach(() => {
    cy.visit('/zh/')
  })

  it('lang', () => {
    cy.get('html').should('have.attr', 'lang', 'zh-CN')
  })

  it('title', () => {
    cy.title().should('eq', 'VuePress E2E')
    cy.get('head title')
      .should('have.length', 1)
      .should('have.text', 'VuePress E2E')
  })

  it('description', () => {
    cy.get('head meta[name="description"]')
      .should('have.length', 1)
      .should('have.attr', 'content', 'VuePress E2E 测试站点')
  })

  it('head', () => {
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
