const URL_PREFIX = Cypress.env('E2E_BASE').replace(/\/$/, '')

// override the default cy.visit command to prepend base
// @ts-expect-error: could not type this method correctly
Cypress.Commands.overwrite('visit', (originalFn, url, options) =>
  // @ts-expect-error: could not type this method correctly
  originalFn(`${URL_PREFIX}${url}`, options),
)
