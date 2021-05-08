/**.
 * Cypress tests for logging in and out
 *
 * @module cypress/integration/login_spec
 * @requires cypress
 */

/**.
 * Retrieve username from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @param {string} username - Retrieve username from environment variables
 */
const testUsername = Cypress.env('USERNAME')

/**.
 * Retrieve password from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @param {string} username - Retrieve password from environment variables
 */
const testPassword = Cypress.env('PASSWORD')

/**.
 * Logs in with website UI
 *
 * @function
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @param {string} username - Username typed into website
 * @param {string} password - Password typed into website
 */
const login = (username, password) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.contains('login').click()
}

/**.
 * Logs out with website UI
 *
 * @function
 * @constant
 * @memberof module:cypress/integration/login_spec
 */
const logout = () => {
  cy.contains('Log out').click()
}

/**.
 * Describe tests for Login
 *
 * @memberof module:cypress/integration/login_spec
 * @param {string} describe - Login
 * @param {Function} tests - Test code
 */
describe('Login', function () {

  /**.
   * Reconnect website before each test
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {Function} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.visit('http://localhost:3000/')
  })

  /**.
   * Test that website exists
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - exists
   * @param {Function} testFunction - Function that runs test
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

  /**.
   * Test that login disappears after logging in
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - disappears after logged in
   * @param {Function} testFunction - Function that runs test
   */
  it('disappears after logged in', function () {
    login(testUsername, testPassword)

    // After login login form is not shown
    cy.get('body').should('not.contain', 'Login')
    cy.get('body').should('not.contain', 'username:')
    cy.get('body').should('not.contain', 'password:')
    cy.get('body').should('not.contain', 'login')
  })

  /**.
   * Test that webpage shows patients page after successful login
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - shows patients page after successful login
   * @param {Function} testFunction - Function that runs test
   */
  it('shows patients page after successful login', function () {
    login(testUsername, testPassword)

    // Patients page is shown
    cy.contains('Application users:')
  })

  /**.
   * Test that webpage shows logout-button after successfull login
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - shows logout-button after successfull login
   * @param {Function} testFunction - Function that runs test
   */
  it('shows logout-button after successfull login', function () {
    login(testUsername, testPassword)

    cy.contains('Log out')
  })

  /**.
   * Test that webpage does not show logout-button before login
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not show logout-button before login
   * @param {Function} testFunction - Function that runs test
   */
  it('does not show logout-button before login', function () {
    cy.get('body').should('not.contain', 'Log out')
  })

  /**.
   * Test that webpage shows login form after logging out
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - shows login form after logging out
   * @param {Function} testFunction - Function that runs test
   */
  it('shows login form after logging out', function () {
    login(testUsername, testPassword)
    logout()

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  /**.
   * Test that webpage does not show logout-button after logging out
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not show logout-button after logging out
   * @param {Function} testFunction - Function that runs test
   */
  it('does not show logout-button after logging out', function () {
    login(testUsername, testPassword)
    logout()

    cy.get('body').should('not.contain', 'Log out')
  })

  /**.
   * Test that webpage does not login with wrong password
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not login with wrong password
   * @param {Function} testFunction - Function that runs test
   */
  it('does not login with wrong password', function () {
    login(testUsername, 'WrongPassword')

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Application users:')
    cy.get('body').should('not.contain', 'Log out')
  })

  /**.
   * Test that webpage does not login with wrong username
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not login with wrong username
   * @param {Function} testFunction - Function that runs test
   */
  it('does not login with wrong username', function () {
    login('WrongUsername', testPassword)

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Application users:')
    cy.get('body').should('not.contain', 'Log out')
  })

  /**.
   * Test that webpage does not login with wrong username and password
   *
   * @memberof module:cypress/integration/login_spec
   * @inner
   * @param {string} describe - does not login with wrong username and password
   * @param {Function} testFunction - Function that runs test
   */
  it('does not login with wrong username and password', function () {
    login('WrongUsername', 'WrongPassword')

    cy.contains('Login')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
    cy.get('body').should('not.contain', 'Application users:')
    cy.get('body').should('not.contain', 'Log out')
  })
})