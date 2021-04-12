/**
 * Cypress tests for retention rate
 *
 * @module cypress/integration/retentionRate_spec
 * @requires cypress
 */

/**
 * Describe tests for retention rate page
 *
 * @name RetentionRate
 * @type {object}
 * @memberof module:cypress/integration/retentionRate_spec
 * @inner
 * @param {string} describe - Retention rate
 * @param {object} tests - Test code
 */
describe('Retention rate', function () {

  /**
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
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
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**
   * Test that retention rate page exists
   *
   * @name RetentionRate_exists
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {string} describe - exists
   * @param {object} testFunction - Function that runs test
   */
  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Retention rates')
    cy.contains('Average using period')
    cy.contains('Average period and single periods:')
  })

  /**
   * Test that retention rate page exists after checking only patients with caregiver
   *
   * @name RetentionRate_exists_after_checking_only_patients_with_caregiver
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {string} describe - exists after checking only patients with caregiver
   * @param {object} testFunction - Function that runs test
   */
  it('exists after checking only patients with caregivers', function () {
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').check()
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Retention rates')
    cy.contains('Average using period')
    cy.contains('Average period and single periods:')
  })
})