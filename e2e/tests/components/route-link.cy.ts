it('RouteLink', () => {
  const E2E_BASE = Cypress.env('E2E_BASE')

  cy.visit('/components/route-link.html')

  cy.get(`.e2e-theme-content #home-page + ul > li`).each((el) => {
    cy.wrap(el).within(() => {
      cy.get('a').should('have.attr', 'href', E2E_BASE)
      cy.get('a').should('have.text', 'text')
    })
  })

  cy.get(`.e2e-theme-content #non-existent + ul > li`).each((el) => {
    cy.wrap(el).within(() => {
      cy.get('a').should('have.attr', 'href', `${E2E_BASE}non-existent.html`)
      cy.get('a').should('have.text', 'text')
    })
  })

  cy.get(`.e2e-theme-content #non-ascii + ul > li`).each((el) => {
    cy.wrap(el).within(() => {
      cy.get('a').should(
        'have.attr',
        'href',
        encodeURI(
          `${E2E_BASE}routes/non-ascii-paths/中文目录名/中文文件名.html`,
        ),
      )
      cy.get('a').should('have.text', 'text')
    })
  })

  cy.get(`.e2e-theme-content #non-ascii-encoded + ul > li`).each((el) => {
    cy.wrap(el).within(() => {
      cy.get('a').should(
        'have.attr',
        'href',
        encodeURI(
          `${E2E_BASE}routes/non-ascii-paths/中文目录名/中文文件名.html`,
        ),
      )
      cy.get('a').should('have.text', 'text')
    })
  })

  cy.get(`.e2e-theme-content #active + ul > li`).each((el, index) => {
    cy.wrap(el).within(() => {
      if (index < 2) {
        cy.get('a').should('have.attr', 'class', 'route-link route-link-active')
      } else {
        cy.get('a').should('have.attr', 'class', 'route-link')
      }
      cy.get('a').should('have.text', 'text')
    })
  })

  const classResults = [
    'route-link custom-class',
    'route-link route-link-active custom-class',
  ]
  cy.get(`.e2e-theme-content #class + ul > li`).each((el, index) => {
    cy.wrap(el).within(() => {
      cy.get('a').should('have.attr', 'class', classResults[index])
      cy.get('a').should('have.text', 'text')
    })
  })

  const attrName = ['title', 'target', 'rel', 'aria-label']
  const attrValue = ['Title', '_blank', 'noopener', 'test']

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
        .each((el) => {
          cy.wrap(el).contains('span', 'text')
        })
    })
  })

  const HASH_AND_QUERY_RESULTS = [
    `${E2E_BASE}#hash`,
    `${E2E_BASE}?query`,
    `${E2E_BASE}?query#hash`,
    `${E2E_BASE}?query=1#hash`,
    `${E2E_BASE}?query=1&query=2#hash`,
    `${E2E_BASE}#hash?query=1&query=2`,
    `#hash`,
    `?query`,
    `?query#hash`,
    `?query=1#hash`,
    `?query=1&query=2#hash`,
    `#hash?query=1&query=2`,
  ]

  cy.get(`.e2e-theme-content #hash-and-query + ul > li`).each((el, index) => {
    cy.wrap(el).within(() => {
      cy.get('a').should('have.attr', 'href', HASH_AND_QUERY_RESULTS[index])
    })
  })
})
