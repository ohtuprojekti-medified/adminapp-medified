/**
 * Cypress tests for logging in and out
 *
 * @module cypress/integration/login_spec
 * @requires cypress
 */

/**
 * Retrieve username from enviromment variables for logging in
 *
 * @name testUsername
 * @function
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @inner
 * @param {string} username - Retrieve username from environment variables
 */
const testUsername = Cypress.env('USERNAME')

/**
 * Retrieve password from enviromment variables for logging in
 *
 * @name testPassword
 * @function
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @inner
 * @param {string} username - Retrieve password from environment variables
 */
const testPassword = Cypress.env('PASSWORD')

/**
 * Logs in with website UI
 *
 * @name login
 * @type {object}
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @inner
 * @param {string} username - Username typed into website
 * @param {string} password - Password typed into website
 */
const login = (username, password) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.contains('login').click()
}

/**
 * Logs out with website UI
 *
 * @name logout
 * @type {object}
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @inner
 */
const logout = () => {
  cy.contains('log out').click()
}

/**
 * Describe tests for Login
 *
 * @name Login
 * @type {object}
 * @memberof module:cypress/integration/login_spec
 * @inner
 * @param {string} describe - Login
 * @param {object} tests - Test code
 */
describe('Login', function () {

  /**
   * Reconnect website before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {object} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.visit('http://localhost:3000/')
  })

  /**
   * Test that website exists
   *
   * @name Login_exists
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - exists
   * @param {object} testFunction - Function that runs test
   */
  it('exists', function () {
    // Can enter website
    cy.contains('Adminapp for monitoring moods')

    // Login form is shown
    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  /**
   * Test that login disappears after logging in
   *
   * @name Login_disappears_after_logged_in
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - disappears after logged in
   * @param {object} testFunction - Function that runs test
   */
  it('disappears after logged in', function () {
    login(testUsername, testPassword)

    // After login login form is not shown
    cy.get('body').should('not.contain', 'Login')
    cy.get('body').should('not.contain', 'username:')
    cy.get('body').should('not.contain', 'password:')
    cy.get('body').should('not.contain', 'login')
  })

  /**
   * Test that webpage shows patients page after successful login
   *
   * @name Login_shows_patients_page_after_successful_login
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - shows patients page after successful login
   * @param {object} testFunction - Function that runs test
   */
  it('shows patients page after successful login', function () {
    login(testUsername, testPassword)

    // Patients page is shown
    cy.contains('Application users:')
  })

  /**
   * Test that webpage shows logout-button after successfull login
   *
   * @name Login_shows_logout-button_after_successfull_login
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - shows logout-button after successfull login
   * @param {object} testFunction - Function that runs test
   */
  it('shows logout-button after successfull login', function () {
    login(testUsername, testPassword)

    cy.contains('log out')
  })

  /**
   * Test that webpage does not show logout-button before login
   *
   * @name Login_does_not_show_logout-button_before_login
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not show logout-button before login
   * @param {object} testFunction - Function that runs test
   */
  it('does not show logout-button before login', function () {
    cy.get('body').should('not.contain', 'log out')
  })

  /**
   * Test that webpage shows login form after logging out
   *
   * @name Login_shows_login_form_after_logging_out
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - shows login form after logging out
   * @param {object} testFunction - Function that runs test
   */
  it('shows login form after logging out', function () {
    login(testUsername, testPassword)
    logout()

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  /**
   * Test that webpage does not show logout-button after logging out
   *
   * @name Login_does_not_show_logout-button_after_logging_out
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not show logout-button after logging out
   * @param {object} testFunction - Function that runs test
   */
  it('does not show logout-button after logging out', function () {
    login(testUsername, testPassword)
    logout()

    cy.get('body').should('not.contain', 'log out')
  })

  /**
   * Test that webpage does not login with wrong password
   *
   * @name Login_does_not_login_with_wrong_password
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not login with wrong password
   * @param {object} testFunction - Function that runs test
   */
  it('does not login with wrong password', function () {
    login(testUsername, 'WrongPassword')

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Application users:')
    cy.get('body').should('not.contain', 'log out')
  })

  /**
   * Test that webpage does not login with wrong username
   *
   * @name Login_does_not_login_with_wrong_username
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not login with wrong username
   * @param {object} testFunction - Function that runs test
   */
  it('does not login with wrong username', function () {
    login('WrongUsername', testPassword)

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Application users:')
    cy.get('body').should('not.contain', 'log out')
  })

  /**
   * Test that webpage does not login with wrong username and password
   *
   * @name Login_does_not_login_with_wrong_username_and_password
   * @type {object}
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not login with wrong username and password
   * @param {object} testFunction - Function that runs test
   */
  it('does not login with wrong username and password', function () {
    login('WrongUsername', 'WrongPassword')

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Application users:')
    cy.get('body').should('not.contain', 'log out')
  })
})