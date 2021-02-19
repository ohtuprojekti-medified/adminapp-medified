const testUsername = Cypress.env('USERNAME')
const testPassword = Cypress.env('PASSWORD')

describe('Patients', function () {
  beforeEach(function () {
    //cy.login()
    cy.visit('http://localhost:3000')
    cy.get('#username').type(testUsername)
    cy.get('#password').type(testPassword)
    cy.contains('login').click()
  })

  afterEach(function () {
    cy.logOut()
  })

  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Patients moods listed')
  })
})