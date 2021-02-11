const testUsername = 'CypressUser'
const testPassword = 'CypressPassword'

// Helper functions
const login = () => {
  cy.get('#username').type(testUsername)
  cy.get('#password').type(testPassword)
  cy.contains('login').click()
}
const logout = () => {
  cy.contains('log out').click()
}

describe('Login', function () {
  beforeEach(function() {
    cy.visit('http://localhost:3000/')
  })

  it('exists', function() {
    // Can enter website
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

  it('shows logout-button after successfull login', () => {
    login()

    cy.contains('log out')
  })

  it('does not show logout-button before login', () => {
    cy.get('body').should('not.contain', 'log out')
  })

  it('shows login form after logging out', () => {
    login()
    logout()

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  it('does not show logout-button after logging out', () => {
    login()
    logout()

    cy.get('body').should('not.contain', 'log out')
  })
})