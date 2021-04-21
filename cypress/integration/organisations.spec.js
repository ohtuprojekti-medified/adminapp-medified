/**.
 * Cypress tests for organisations filter
 *
 * @module cypress/integration/organisations_spec
 * @requires cypress
 */

/**.
 * Retrieve username from enviromment variables for logging in
 *
 * @name testUsername
 * @function
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} username - Retrieve username from environment variables
 */
const testUsername = Cypress.env('USERNAME')

/**.
 * Retrieve password from enviromment variables for logging in
 *
 * @name testPassword
 * @function
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} username - Retrieve password from environment variables
 */
const testPassword = Cypress.env('PASSWORD')

/**.
 * Retrieve admin username from enviromment variables for logging in
 *
 * @name testAdminUsername
 * @function
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} username - Retrieve username from environment variables
 */
const testAdminUsername = Cypress.env('ADMIN_USERNAME')

/**.
 * Retrieve admin password from enviromment variables for logging in
 *
 * @name testAdminPassword
 * @function
 * @constant
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} password - Retrieve password from environment variables
 */
const testAdminPassword = Cypress.env('ADMIN_PASSWORD')

/** Logs in with website UI.
 *
 * @name login
 * @type {object}
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
 * @name Organisations
 * @type {object}
 * @memberof module:cypress/integration/organisations_spec
 * @param {string} describe - Organisations
 * @param {object} tests - Test code
 */
describe('Organisations', function () {

  /**.
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {object} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  /**.
   * Log out fast after each test
   *
   * @name afterEach
   * @type {object}
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
  })

  /**.
   * Test that organisations filter exists
   *
   * @name Organisations_filter_exists
   * @type {object}
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {string} describe - organisations filter exists
   * @param {object} testFunction - Function that runs test
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
   * @name Organisations_filter_not_showing_for_normal_user
   * @type {object}
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {string} describe - organisation filter does not show for normal user
   * @param {object} testFunction - Function that runs test
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