/**.
 * Cypress tests for filter checkbox
 *
 * @module cypress/integration/filter_spec
 * @requires cypress
 */

/**.
 * Describe tests for filter checbox to show only app users with caregiver(s)
 *
 * @name Filter
 * @type {object}
 * @memberof module:cypress/integration/filter_spec
 * @param {string} describe - Filter
 * @param {object} tests - Test code
 */
describe('Filter', function () {

  /**.
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/filter_spec
   * @inner
   * @param {object} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.login()
  })

  /**.
   * Log out fast after each test
   *
   * @name afterEach
   * @type {object}
   * @memberof module:cypress/integration/filter_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**.
   * Test that filtering checkbox for showing only app users with caregiver(s) exists
   *
   * @name Filter_checkbox_exists
   * @type {object}
   * @memberof module:cypress/integration/filter_spec
   * @inner
   * @param {string} describe - checkbox exists
   * @param {object} testFunction - Function that runs test
   */
  it('checkbox exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Filter').click()
    cy.contains('Show only app users with caregiver')
  })

  /**.
   * Test that filtering checkbox can be checked and unchecked
   *
   * @name Checkbox_is_checkable
   * @type {object}
   * @memberof module:cypress/integration/filter_spec
   * @inner
   * @param {string} describe - checkbox can be checked and unchecked
   * @param {object} testFunction - Function that runs test
   */
  it('checkbox can be checked and unchecked', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Application users: 110')
    cy.contains('Filter').click()
    cy.get('[type="checkbox"]').check()
    cy.contains('Application users: 7')
    cy.get('[type="checkbox"]').uncheck()
    cy.contains('Application users: 110')

  })

})