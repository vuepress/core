it('vp-link', () => {
  cy.visit('/components/vp-link.html')

  cy.get(`.e2e-theme-content #home-page + ul > li`).each((el) => {
    cy.wrap(el).within(() => {
      cy.get('a').should('have.attr', 'href', '/')
      cy.get('a').should('have.text', 'text')
    })
  })

  cy.get(`.e2e-theme-content #not-exist + ul > li`).each((el) => {
    cy.wrap(el).within(() => {
      cy.get('a').should('have.attr', 'href', '/non-existent.html')
      cy.get('a').should('have.text', 'text')
    })
  })

  cy.get(`.e2e-theme-content #non-ascii + ul > li`).each((el) => {
    cy.wrap(el).within(() => {
      cy.get('a').should(
        'have.attr',
        'href',
        encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'),
      )
      cy.get('a').should('have.text', 'text')
    })
  })

  cy.get(`.e2e-theme-content #non-ascii-encoded + ul > li`).each((el) => {
    cy.wrap(el).within(() => {
      cy.get('a').should(
        'have.attr',
        'href',
        encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'),
      )
      cy.get('a').should('have.text', 'text')
    })
  })

  cy.get(`.e2e-theme-content #active + ul > li`).each((el, index) => {
    cy.wrap(el).within(() => {
      if (index < 2) cy.get('a').should('have.attr', 'class', /vp-link-active/)
      else cy.get('a').should('not.have.attr', 'class', /vp-link-active/)
      cy.get('a').should('have.text', 'text')
    })
  })

  const attrName = ['title', 'target', 'rel', 'class', 'aria-label']
  const attrValue = ['Title', '_blank', 'noopener', 'vp-link-active', 'test']

  cy.get(`.e2e-theme-content #attrs + ul > li`).each((el, index) => {
    cy.wrap(el).within(() => {
      cy.get('a').should('have.attr', attrName[index], attrValue[index])
    })
  })

  cy.get(`.e2e-theme-content #slots + ul > li`).each((el, index) => {
    cy.wrap(el).within(() => {
      cy.get('a')
        .children()
        .should('have.lengthOf', index + 1)
        .should('have.html', '<span>text</span>')
    })
  })
})
