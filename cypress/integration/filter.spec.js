/**.
 * Cypress tests for filter checkbox
 *
 * @module cypress/integration/filter_spec
 * @requires cypress
 */

/**.
 * Describe tests for filter checbox to show only app users with caregiver(s)
 *
 * @memberof module:cypress/integration/filter_spec
 * @param {string} describe - Filter
 * @param {Function} tests - Test code
 */
describe('Filter', function () {

  /**.
   * Log in fast before each test
   *
   * @memberof module:cypress/integration/filter_spec
   * @inner
   * @param {Function} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.login()
  })

  /**.
   * Log out fast after each test
   *
   * @memberof module:cypress/integration/filter_spec
   * @inner
   * @param {Function} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**.
   * Test that filtering checkbox for showing only app users with caregiver(s) exists
   *
   * @memberof module:cypress/integration/filter_spec
   * @inner
   * @param {string} describe - checkbox exists
   * @param {Function} testFunction - Function that runs test
   */
  it('checkbox exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Filter').click()
    cy.contains('Show only app users with caregiver')
  })

  /**.
   * Test that filtering checkbox can be checked and unchecked
   *
   * @memberof module:cypress/integration/filter_spec
   * @inner
   * @param {string} describe - checkbox can be checked and unchecked
   * @param {Function} testFunction - Function that runs test
   */
  it('checkbox can be checked and unchecked', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Application users: 110')
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').check()
    cy.contains('Application users: 7')
    cy.get('[data-testid="filter-checkbox"]').uncheck()
    cy.contains('Application users: 110')
  })
})