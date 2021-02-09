const testUsername = 'CypressUser'
const testPassword = 'CypressPassword'

// Helper functions
const login = () => {
  // Enter website and login
  cy.visit('http://localhost:3000/')
  cy.get('#username').type(testUsername)
  cy.get('#password').type(testPassword)
  cy.contains('login').click()
}

describe('Login', function () {
  it('exists', function() {
    // Can enter website
    cy.visit('http://localhost:3000/')
    cy.contains('Adminapp for monitoring moods')

    // Login form is shown
    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  it('dissappears after logged in', function () {
    login()

    // After login login form is not shown
    cy.get('body').should('not.contain', 'Login')
    cy.get('body').should('not.contain', 'username:')
    cy.get('body').should('not.contain', 'password:')
    cy.get('body').should('not.contain', 'login')
  })

  it('shows patients page after successful login', function() {
    login()

    // Patients page is shown
    cy.contains('Patients moods listed')
  })
})