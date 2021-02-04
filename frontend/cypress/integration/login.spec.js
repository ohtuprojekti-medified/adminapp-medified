const testUsername = 'CypressUser'
const testPassword = 'CypressPassword'

describe('Login', function () {
  it('dissappears after logged in', function () {
    // Can enter website
    cy.visit('http://localhost:3000/')
    cy.contains('Adminapp for monitoring moods')

    // Login form is shown
    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')

    // Can login
    cy.get('#username').type(testUsername)
    cy.get('#password').type(testPassword)
    cy.contains('login').click()

    // After login login form is not shown
    cy.get('body').should('not.contain', 'Login')
    cy.get('body').should('not.contain', 'username:')
    cy.get('body').should('not.contain', 'password:')
    cy.get('body').should('not.contain', 'login')
  })
})