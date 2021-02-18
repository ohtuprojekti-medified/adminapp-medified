const testUsername = Cypress.env('USERNAME')
const testPassword = Cypress.env('PASSWORD')

describe('Patients', function () {
  beforeEach(function () {
    //cy.login({ testUsername, testPassword })
    //cy.log(localStorage.getItem('loggedUser'))
    cy.visit('http://localhost:3000/')
  })

  it('exists', function () {
    cy.log(testUsername)
    cy.log(testPassword)
    cy.contains('Adminapp for monitoring moods')
    // cy.contains('Patients moods listed')
  })
})