describe('title', () => {
  it('should use title from frontmatter', () => {
    cy.visit('/page-data/title-from-frontmatter.html')
    cy.title().should('include', 'title from frontmatter')
  })

  it('should use title from h1', () => {
    cy.visit('/page-data/title-from-h1.html')
    cy.title().should('include', 'title from h1')
  })
})

describe('frontmatter', () => {
  it('should set frontmatter correctly', () => {
    cy.visit('/page-data/frontmatter.html')
    cy.get('.e2e-theme-content p').should(
      'have.text',
      JSON.stringify({
        str: 'str',
        num: 1,
        bool: true,
        arr: [1, 2, 3],
        obj: { foo: 'bar', baz: 'qux' },
      }),
    )
  })
})
