/**
 * Cypress tests for logging in and out
 *
 * @module cypress/integration/patients_spec
 * @requires cypress
 */

/**
 * Describe tests for patients page
 *
 * @name Patients
 * @type {object}
 * @memberof module:cypress/integration/patients_spec
 * @inner
 * @param {string} describe - Patients
 * @param {object} tests - Test code
 */
describe('Patients', function () {

  /**
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/patients_spec
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
   * @memberof module:cypress/integration/patients_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**
   * Test that patients page exists
   *
   * @name Patients_exists
   * @type {object}
   * @memberof module:cypress/integration/patients_spec
   * @inner
   * @param {string} describe - exists
   * @param {object} testFunction - Function that runs test
   */
  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Application users:')
  })
})