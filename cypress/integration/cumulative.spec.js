/**
 * Cypress tests for cumulative users
 *
 * @module cypress/integration/Cumulative_spec
 * @requires cypress
 */

/**
 * Describe tests for cumulative users page
 *
 * @name Cumulative
 * @type {object}
 * @memberof module:cypress/integration/cumulative_spec
 * @inner
 * @param {string} describe - Cumulative users
 * @param {object} tests - Test code
 */
describe('Cumulative users', function () {

  /**
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/cumulative_spec
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
   * @memberof module:cypress/integration/cumulative_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**
   * Test that cumulative users page exists
   *
   * @name Cumulative_exists
   * @type {object}
   * @memberof module:cypress/integration/cumulative_spec
   * @inner
   * @param {string} describe - exists
   * @param {object} testFunction - Function that runs test
   */
  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('New users, cumulative and active users weekly')
  })

  /**
   * Test that cumulative users page exists after checking only patients with caregiver
   *
   * @name Cumulative_exists_after_checking_only_patients_with_caregiver
   * @type {object}
   * @memberof module:cypress/integration/cumulative_spec
   * @inner
   * @param {string} describe - exists after checking only patients with caregiver
   * @param {object} testFunction - Function that runs test
   */
  it('exists after checking only patients with caregivers', function () {
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').check()
    cy.contains('Adminapp for monitoring moods')
    cy.contains('New users, cumulative and active users weekly')
  })
})