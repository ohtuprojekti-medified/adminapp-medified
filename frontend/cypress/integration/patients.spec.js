const testUsername = Cypress.env('USERNAME')
const testPassword = Cypress.env('PASSWORD')

// Helper functions
const login = (username, password) => {
  cy.visit('http://localhost:3000/')
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.contains('login').click()
  // Replace above with this when it works
  //cy.login({ username, password })
}

describe('Patients', function () {
  beforeEach(function () {
    login(testUsername, testPassword)
  })

  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Patients moods listed')
  })
})