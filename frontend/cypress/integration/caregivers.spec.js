/**
 * Cypress tests for logging in and out
 *
 * @module cypress/integration/caregivers_spec
 * @requires cypress
 */

/**
 * Describe tests for caregivers page
 *
 * @name Caregivers
 * @type {object}
 * @memberof module:cypress/integration/caregivers_spec
 * @inner
 * @param {string} describe - Caregivers
 * @param {object} tests - Test code
 */
describe('Caregivers', function () {

  /**
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/caregivers_spec
   * @inner
   * @param {object} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.login()
  })

  /**
   * Log out fast after each test
   *
   * @name afterEach
   * @type {object}
   * @memberof module:cypress/integration/caregivers_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**
   * Test that caregivers page exists
   *
   * @name Caregivers_exists
   * @type {object}
   * @memberof module:cypress/integration/caregivers_spec
   * @inner
   * @param {string} describe - exists
   * @param {object} testFunction - Function that runs test
   */
  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Caregivers')
    cy.contains('Registered caregivers:')
  })
})