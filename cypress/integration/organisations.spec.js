/**.
 * Cypress tests for organisations filter
 *
 * @module cypress/integration/organisations_spec
 * @requires cypress
 */

/**.
 * Retrieve username from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} username - Retrieve username from environment variables
 */
const testUsername = Cypress.env('USERNAME')

/**.
 * Retrieve password from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} username - Retrieve password from environment variables
 */
const testPassword = Cypress.env('PASSWORD')

/**.
 * Retrieve admin username from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} username - Retrieve username from environment variables
 */
const testAdminUsername = Cypress.env('ADMIN_USERNAME')

/**.
 * Retrieve admin password from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} password - Retrieve password from environment variables
 */
const testAdminPassword = Cypress.env('ADMIN_PASSWORD')

/** Logs in with website UI.
 *
 * @function
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} username - Username typed into website.
 * @param {string} password - Password typed into website.
 */
const login = (username, password) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.wait(500)
  cy.contains('login').click()
  cy.wait(500)
}

/**.
 * Describe tests for organisations filter
 *
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} describe - Organisations
 * @param {Function} tests - Test code
 */
describe('Organisations', function () {

  /**.
   * Log in fast before each test
   *
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {Function} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  /**.
   * Log out fast after each test
   *
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {Function} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
  })

  /**.
   * Test that organisations filter exists
   *
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {string} describe - organisations filter exists
   * @param {Function} testFunction - Function that runs test
   */
  it('organisations filter exists', function () {
    login(testAdminUsername, testAdminPassword)
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Filter').click()
    cy.contains('Select Organisation')
    cy.visit('http://localhost:3000')
    cy.contains('Log out').click()
  })

  /**.
   * Test that organisation filter does not show for normal user
   *
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {string} describe - organisation filter does not show for normal user
   * @param {Function} testFunction - Function that runs test
   */
  it('organisation filter does not show for normal user', function () {
    login(testUsername, testPassword)
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Filter').click()
    cy.get('Select Organisation').should('not.exist')
    cy.visit('http://localhost:3000')
    cy.contains('Log out').click()
  })
})