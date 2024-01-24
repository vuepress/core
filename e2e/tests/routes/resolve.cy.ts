it('resolve', () => {
  cy.visit('/routes/resolve.html')

  cy.get('.e2e-theme-content ul li').each((el) => {
    const data = JSON.parse(/: (\{.*\})\s*$/.exec(el.text())![1])

    expect(data.path).to.equal('/page-data/meta.html')
    expect(data.meta).to.include({ a: 0, b: 2, c: 3 })
  })
})
