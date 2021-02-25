const testUsername = Cypress.env('USERNAME')
const testPassword = Cypress.env('PASSWORD')

// Helper functions
const login = (username, password) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.contains('login').click()
}
const logout = () => {
  cy.contains('log out').click()
}

describe('Login', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/')
  })

  it('exists', function () {
    // Can enter website
    cy.contains('Adminapp for monitoring moods')

    // Login form is shown
    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  it('dissappears after logged in', function () {
    login(testUsername, testPassword)

    // After login login form is not shown
    cy.get('body').should('not.contain', 'Login')
    cy.get('body').should('not.contain', 'username:')
    cy.get('body').should('not.contain', 'password:')
    cy.get('body').should('not.contain', 'login')
  })

  it('shows patients page after successful login', function () {
    login(testUsername, testPassword)

    // Patients page is shown
    cy.contains('Patients moods listed')
  })

  it('shows logout-button after successfull login', function () {
    login(testUsername, testPassword)

    cy.contains('log out')
  })

  it('does not show logout-button before login', function () {
    cy.get('body').should('not.contain', 'log out')
  })

  it('shows login form after logging out', function () {
    login(testUsername, testPassword)
    logout()

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  it('does not show logout-button after logging out', function () {
    login(testUsername, testPassword)
    logout()

    cy.get('body').should('not.contain', 'log out')
  })

  it('does not login with wrong password', function () {
    login(testUsername, 'WrongPassword')

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Patients moods listed')
    cy.get('body').should('not.contain', 'log out')
  })

  it('does not login with wrong username', function () {
    login('WrongUsername', testPassword)

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Patients moods listed')
    cy.get('body').should('not.contain', 'log out')
  })

  it('does not login with wrong username and password', function () {
    login('WrongUsername', 'WrongPassword')

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Patients moods listed')
    cy.get('body').should('not.contain', 'log out')
  })
})