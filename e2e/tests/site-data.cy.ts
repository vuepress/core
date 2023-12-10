describe('siteData', () => {
  describe('en-US', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('lang', () => {
      cy.get('html').should('have.attr', 'lang', 'en-US')
    })

    it('title', () => {
      cy.title().should('eq', 'VuePress E2E')
      cy.get('head title').should('have.text', 'VuePress E2E')
    })

    it('description', () => {
      cy.get('head meta[name="description"]').should(
        'have.attr',
        'content',
        'VuePress E2E Test Site',
      )
    })

    it('head', () => {
      // TODO
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
      cy.get('head title').should('have.text', 'VuePress E2E')
    })

    it('description', () => {
      cy.get('head meta[name="description"]').should(
        'have.attr',
        'content',
        'VuePress E2E 测试站点',
      )
    })

    it('head', () => {
      // TODO
    })
  })
})
