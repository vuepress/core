it('resolve', () => {
  cy.visit('/routes/resolve.html')
  const result = { path: '/page-data/meta.html', meta: { a: 0, b: 2, c: 3 } }

  cy.get('.e2e-theme-content ul li').each((el) => {
    const data = JSON.parse(/: (\{.*\})\s*$/.exec(el.text())![1])

    expect(data).to.deep.include(result)
  })
})
