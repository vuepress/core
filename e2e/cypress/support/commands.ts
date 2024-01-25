const URL_PREFIX = Cypress.env('E2E_BASE').replace(/\/$/, '')

// override the default cy.visit command to prepend base
Cypress.Commands.overwrite('visit', (originalFn, ...args) => {
  // cy.visit(url, options)
  if (typeof args[0] === 'string') {
    // @ts-expect-error: could not type this correctly
    return originalFn(`${URL_PREFIX}${args[0]}`, args[1])
  }

  // cy.visit(options)
  return originalFn({
    ...args[0],
    url: `${URL_PREFIX}${args[0].url}`,
  })
})

// add a custom request command to prepend base
Cypress.Commands.add('requestWithBase', (url, options) =>
  cy.request(`${URL_PREFIX}${url}`, options),
)

declare global {
  namespace Cypress {
    interface Chainable {
      requestWithBase: <T = any>(
        url: string,
        options?: Partial<Cypress.RequestOptions>,
      ) => Chainable<Cypress.Response<T>>
    }
  }
}

export {}
